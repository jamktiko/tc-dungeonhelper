import { Injectable } from '@angular/core';
import { Enc, REL } from './enc';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EserviceService {
  private apiUrl = 'api/randomEncs'; // API URL to get the random encounters
  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<REL> {
    console.error('An error occurred', error);
    return error; // Return an empty array on error
  }

  getEncounters(): Observable<REL> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((data) => {
        // Here we extract the 'hEnc' array from within the nested structure
        return data[0].REL[0];
      }),
      catchError(this.handleError)
    );
  }
}

//  getEncounters(): Observable<Enc[]> {
//    return this.http.get<Enc[]>(this.apiUrl).pipe(catchError(this.handleError));
//  }
//
