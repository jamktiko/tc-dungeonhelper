import { Injectable } from '@angular/core';
import { Merchants } from './types';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.merchantUrl;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred:';
    if (error.status === 200 && error.ok === false) {
      // Handle the case where we got a 200 response but it's not considered OK
      console.log('Response body:', error.error);
      return throwError(() => new Error('Invalid response format'));
    }
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  public getMerchants(): Observable<any> {
    const token = sessionStorage.getItem('accesstoken');
    
    // Log the request details for debugging
    console.log('Making request to:', this.apiUrl);
    console.log('With token:', token ? 'Present' : 'Missing');
    
    return this.http.get<any>(this.apiUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token || '',
        'Accept': 'application/json'
      }),
      // Add observe: 'response' to get the full response
      observe: 'response',
      responseType: 'json'
    }).pipe(
      map(response => {
        console.log('Response headers:', response.headers.keys());
        console.log('Response status:', response.status);
        console.log('Response body:', response.body);
        return response.body;
      }),
      catchError(this.handleError)
    );
  }

  public createMerchant(newMerchant: any): Observable<any> {
    const url = `${this.apiUrl}/create`;
    const token = sessionStorage.getItem('accesstoken');
    return this.http
      .post<any>(url, newMerchant, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-access-token': token || ''
        }),
      })
      .pipe(catchError(this.handleError));
  }

  public deleteMerchant(id: string): Observable<any> {
    const url = `${this.apiUrl}/delete/${id}`;
    const token = sessionStorage.getItem('accesstoken');
    return this.http
      .delete<any>(url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-access-token': token || ''
        }),
      })
      .pipe(catchError(this.handleError));
  }
}
