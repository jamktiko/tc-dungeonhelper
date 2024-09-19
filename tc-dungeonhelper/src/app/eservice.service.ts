import { Injectable } from '@angular/core';
import { RandomEncounters } from './types';
import { catchError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EserviceService {
  private apiUrl = 'api/randomEncounters'; // API URL to get the random encounters
  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<RandomEncounters> {
    console.error('An error occurred', error);
    return error; // Return an empty array on error
  }

  getEncounters(): Observable<RandomEncounters[]> {
    return this.http.get<RandomEncounters[]>(this.apiUrl);
  }
}
