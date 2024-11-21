import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { RandomEncounters } from '../types';
import { EserviceService } from './eservice.service';

@Injectable({
  providedIn: 'root'
})
export class EncounterStorageService {

  private readonly ENCOUNTERS_CACHE_KEY = 'encounters_cache';
  private readonly CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

  constructor(private eservice: EserviceService) {}

  private updateCache(data: RandomEncounters[]): void {
    console.log('💾 Updating localStorage cache');
    const cacheData = {
      timestamp: Date.now(),
      data: data
    };
    localStorage.setItem(this.ENCOUNTERS_CACHE_KEY, JSON.stringify(cacheData));
  }

  private getCache(): { data: RandomEncounters[], timestamp: number } | null {
    const cached = localStorage.getItem(this.ENCOUNTERS_CACHE_KEY);
    if (cached) {
      console.log('🔍 Found data in localStorage');
      const parsedCache = JSON.parse(cached);
      console.log('⏰ Cache timestamp:', new Date(parsedCache.timestamp).toLocaleString());
      console.log('⌛ Cache age:', (Date.now() - parsedCache.timestamp) / 1000, 'seconds');
      return parsedCache;
    }
    console.log('❌ No cache found in localStorage');
    return null;
  }

  private isCacheValid(timestamp: number): boolean {
    const age = Date.now() - timestamp;
    const isValid = age < this.CACHE_DURATION;
    console.log('🔒 Cache valid?', isValid, '(Age:', age / 1000, 'seconds)');
    return isValid;
  }

  getEncounters(): Observable<RandomEncounters[]> {
    const cached = this.getCache();
    
    if (cached && this.isCacheValid(cached.timestamp)) {
      console.log('✨ Serving data from cache');
      // Return cached data and refresh in background
      this.eservice.getEncounters().pipe(
        tap(freshData => this.updateCache(freshData))
      ).subscribe();
      
      return of(cached.data);
    }

    console.log('🌐 Fetching fresh data from server');
    // No cache or expired, get fresh data
    return this.eservice.getEncounters().pipe(
      tap(data => {
        console.log('📥 Caching new data from server');
        this.updateCache(data);
      })
    );
  }

  saveEncounter(biomeId: string, encId: string, encData: any): Observable<any> {
    return this.eservice.saveEnc(biomeId, encId, {
      ...encData,
      id: parseInt(encId) // Convert string ID to number for Enc interface
    }).pipe(
      tap(response => this.updateCache(response))
    );
  }

  addEncounter(biomeId: string, newEncounter: any): Observable<any> {
    return this.eservice.addEnc(biomeId, {
      ...newEncounter,
      id: Date.now() // Generate a new numeric ID
    }).pipe(
      tap(response => this.updateCache(response))
    );
  }

  deleteEncounter(biomeId: string, encounterId: string): Observable<any> {
    return this.eservice.deleteEnc(biomeId, encounterId).pipe(
      tap((response: any) => {
        // Update the cache with the new data from the server
        if (response && response.updatedBiome) {
          const cached = this.getCache();
          if (cached) {
            const updatedData = cached.data.map(biome => {
              if (biome._id === biomeId) {
                return response.updatedBiome;
              }
              return biome;
            });
            this.updateCache(updatedData);
          }
        }
      })
    );
  }

  clearCache(): void {
    localStorage.removeItem(this.ENCOUNTERS_CACHE_KEY);
  }
}
