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
      console.log('Response body:', error.error);
      return throwError(() => new Error('Invalid response format'));
    }
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  public getMerchants(): Observable<any> {
    console.log('Making request to:', this.apiUrl);
    
    return this.http.get<any>(this.apiUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response'
    }).pipe(
      map(response => {
        console.log('Full response:', response);
        return response.body;
      }),
      catchError(this.handleError)
    );
  }

  public createMerchant(merchantData: any): Observable<any> {
    console.log('Creating merchant with data:', merchantData);
    
    return this.http.post<any>(`${this.apiUrl}/create`, merchantData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  public deleteMerchant(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)
    );
  }
}
