import { Injectable } from '@angular/core';
import { Merchants } from './types';
import { catchError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

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
    const token = sessionStorage.getItem('accesstoken');
    return this.http.get<any>(this.apiUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token || ''
      }),
    }).pipe(catchError(this.handleError));
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
