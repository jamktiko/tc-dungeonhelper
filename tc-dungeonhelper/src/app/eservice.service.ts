import { Injectable } from '@angular/core';
import { RandomEncounters } from './types';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EserviceService {
  private apiUrl = 'api/randomEncounters';

  constructor(private http: HttpClient) {}

  private handleError<T>(error: any): Observable<T[]> {
    console.error('An error occurred', error);
    return of([] as T[]); // Return an empty array on error
  }
  getEncounters(): Observable<RandomEncounters[]> {
    return this.http.get<RandomEncounters[]>(this.apiUrl);
  }

  getOneEncouter(): Observable<RandomEncounters[]> {
    return this.http
      .get<RandomEncounters[]>(this.apiUrl)
      .pipe(catchError((error) => this.handleError<RandomEncounters>(error)));
  }

  /**
   * Gets a random encounter table by its id.
   * @param id The id of the encounter table to be retrieved.
   * @returns An observable of the requested encounter table.
   */
  getTable(): Observable<RandomEncounters[]> {
    return this.http.get<RandomEncounters[]>(this.apiUrl).pipe(
      catchError((error) => this.handleError<RandomEncounters>(error)),
      map((encounters) => {
        return encounters.filter((encounter) => encounter.enc);
      })
    );
  }
}
