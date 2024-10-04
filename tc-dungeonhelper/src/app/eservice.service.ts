import { Injectable } from '@angular/core';
import { RandomEncounters } from './types';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EserviceService {
  private apiUrl = 'http://localhost:3000/randomEncounters';

  constructor(private http: HttpClient) {}

  // private handleError<T>(error: any): Observable<T[]> {
  //   console.error('An error occurred', error);
  //   return of([] as T[]); // Return an empty array on error
  // }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return error.message || error;
  }
  getEncounters(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getTable(): Observable<RandomEncounters[]> {
    return this.http
      .get<RandomEncounters[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  /**
   * Gets a random encounter table by its id.
   * @param id The id of the encounter table to be retrieved.
   * @returns An observable of the requested encounter table.
   */
  //  getTable(): Observable<RandomEncounters[]> {
  //    return this.http.get<RandomEncounters[]>(this.apiUrl).pipe(
  //      catchError((error) => this.handleError<RandomEncounters>(error)),
  //      map((encounters) => {
  //        return encounters.filter((encounter) => encounter.enc);
  //      })
  //    );
  //  }
}
