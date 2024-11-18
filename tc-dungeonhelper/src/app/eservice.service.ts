import { Injectable } from '@angular/core';
import { RandomEncounters } from './types';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

const headers = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EserviceService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}

  // private handleError<T>(error: any): Observable<T[]> {
  //   console.error('An error occurred', error);
  //   return of([] as T[]); // Return an empty array on error
  // }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return error.message || error;
  }

  // Hakee kannasta tiedot
  public getEncounters(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(catchError(this.handleError));
  }

  public getTable(): Observable<RandomEncounters[]> {
    return this.http
      .get<RandomEncounters[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  public deleteEnc(biomeId: string, encounterId: string): Observable<any> {
    const url = `${this.apiUrl}/${biomeId}/deleteEnc/${encounterId}`;
    return this.http
      .delete<any>(url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  allSave(biomeId: string, encounters: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/${biomeId}/saveAll`, { encounters });
  }

  saveEnc(biomeId: string, encId: string, encData: any): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/saveEnc/${biomeId}/${encId}`,
      encData
    );
  }

  public addEnc(biomeId: string, newEncounter: any): Observable<any> {
    const url = `${this.apiUrl}/${biomeId}/addEnc`;
    return this.http
      .put<any>(url, newEncounter, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }
  public addTable(newTable: any): Observable<any> {
    const url = `${this.apiUrl}/addTable`;
    return this.http
      .post<any>(url, newTable, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  public deleteTable(biomeId: string): Observable<any> {
    const url = `${this.apiUrl}/${biomeId}/deleteTable`; // biome is passed as the 'id'
    return this.http
      .delete<any>(url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }
}
