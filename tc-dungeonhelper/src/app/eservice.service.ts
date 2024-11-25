import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { RandomEncounters } from './types';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class EserviceService {
  private apiUrl = environment.url;
  private baseUrl = `${this.apiUrl}`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getHeaders(): HttpHeaders {
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      token = sessionStorage.getItem('accesstoken') || '';
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return error.message || error;
  }

  // Hakee kannasta tiedot
  public getEncounters(): Observable<RandomEncounters[]> {
    return this.http
      .get<RandomEncounters[]>(`${this.baseUrl}`, {
        headers: this.getHeaders()
      })
      .pipe(catchError(this.handleError));
  }

  public getTable(): Observable<RandomEncounters[]> {
    return this.http
      .get<RandomEncounters[]>(`${this.baseUrl}`, {
        headers: this.getHeaders()
      })
      .pipe(catchError(this.handleError));
  }

  public deleteEnc(biomeId: string, encounterId: string): Observable<any> {
    const url = `${this.baseUrl}/${biomeId}/deleteEnc/${encounterId}`;
    return this.http
      .delete<any>(url, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  saveEnc(biomeId: string, encId: string, encData: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${biomeId}/saveEnc/${encId}`,
      encData,
      {
        headers: this.getHeaders(),
      }
    ).pipe(catchError(this.handleError));
  }

  public addEnc(biomeId: string, newEncounter: any): Observable<any> {
    const url = `${this.baseUrl}/${biomeId}/addEnc`;
    return this.http
      .put<any>(url, newEncounter, {
        headers: this.getHeaders()
      })
      .pipe(catchError(this.handleError));
  }

  public addTable(newTable: any): Observable<any> {
    const url = `${this.baseUrl}/addTable`;
    return this.http
      .post<any>(url, newTable, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  public deleteTable(biomeId: string): Observable<any> {
    const url = `${this.baseUrl}/${biomeId}/deleteTable`;
    return this.http
      .delete<any>(url, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  public getBiome(biome: string): Observable<RandomEncounters[]> {
    return this.http
      .get<RandomEncounters[]>(`${this.baseUrl}/biome/${biome}`, {
        headers: this.getHeaders()
      })
      .pipe(catchError(this.handleError));
  }
}
