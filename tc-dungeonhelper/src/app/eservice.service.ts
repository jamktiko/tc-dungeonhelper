import { Injectable } from '@angular/core';
import { Enc } from './enc';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EserviceService {
  private highwayApiUrl = 'api/highwayEncs'; // URL highwayEncs-listalle
  private dungeonApiUrl = 'api/dungeonEncs'; // URL dungeonEncs-listalle

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<Enc[]> {
    console.error('An error occurred', error);
    return of([]); // Return an empty array on error
  }

  // Hakee highwayEncs-listan
  getHighwayEncounters(): Observable<Enc[]> {
    return this.http.get<Enc[]>(this.highwayApiUrl).pipe(catchError(this.handleError));
  }

  // Hakee dungeonEncs-listan
  getDungeonEncounters(): Observable<Enc[]> {
    return this.http.get<Enc[]>(this.dungeonApiUrl).pipe(catchError(this.handleError));
  }
}
