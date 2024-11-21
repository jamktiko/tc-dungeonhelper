import { Injectable } from '@angular/core';
import { Merchants } from '../types';
import { catchError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  private apiUrl = environment.merchantUrl;
  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return error.message || error;
  }

  public getMerchants(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(catchError(this.handleError));
  }

  public createMerchant(newMerchant: any): Observable<any> {
    const url = `${this.apiUrl}/create`;
    return this.http
      .post<any>(url, newMerchant, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  public deleteMerchant(id: string): Observable<any> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http
      .delete<any>(url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }
}
