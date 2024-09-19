import { Injectable } from '@angular/core';
import { RandomEncounters } from './types';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EserviceService {
  private apiUrl = 'api/randomEncounters'; // API URL to get the random encounters
  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<RandomEncounters[]> {
    console.error('An error occurred', error);
    return of([]); // Return an empty array on error
  }
  getEncounters(): Observable<RandomEncounters[]> {
    return this.http.get<RandomEncounters[]>(this.apiUrl);
  }

  /**
   * Gets a random encounter table by its id.
   * @param id The id of the encounter table to be retrieved.
   * @returns An observable of the requested encounter table.
   */
  getTable(id: Number): Observable<RandomEncounters[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<RandomEncounters[]>(url)
      .pipe(catchError((error) => this.handleError(error)));
  }
}
