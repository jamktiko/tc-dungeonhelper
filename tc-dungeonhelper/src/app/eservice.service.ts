import { Injectable } from '@angular/core';
import { Enc } from './types';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EserviceService {
  private apiUrl = 'api/highWayEncs';

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<Enc[]> {
    console.error('An error occurred', error);
    return of([]); // Return an empty array on error
  }
  getEncounters(): Observable<Enc[]> {
    return this.http.get<Enc[]>(this.apiUrl);
  }

  /**
   * Gets a random encounter table by its id.
   * @param id The id of the encounter table to be retrieved.
   * @returns An observable of the requested encounter table.
   */
  // getTable(id: Number): Observable<Enc[]> {
  //   const url = `${this.hiWayUrl}/${id}`;
  //   return this.http
  //     .get<Enc[]>(url)
  //     .pipe(catchError((error) => this.handleError(error)));
  // }
}
