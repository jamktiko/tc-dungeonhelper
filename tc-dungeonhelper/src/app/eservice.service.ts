import { Injectable } from '@angular/core';
import { Enc } from './enc';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EserviceService {
  private apiUrl = 'api/highwayEncs';
  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<Enc[]> {
    console.error('An error occurred', error);
    return of([]); // Return an empty array on error
  }

  getEncounters(): Observable<Enc[]> {
    return this.http.get<Enc[]>(this.apiUrl).pipe(catchError(this.handleError));
  }
}
