import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Enc } from './enc';
import { catchError, Observable, of } from 'rxjs';
=======
import { RandomEncounters } from './types';
import { catchError, map, Observable, of } from 'rxjs';
>>>>>>> d0dee6d28ba9f208186cde6834b31e6c041263e1
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EserviceService {
<<<<<<< HEAD
  private highwayApiUrl = 'api/highwayEncs'; // URL highwayEncs-listalle
  private dungeonApiUrl = 'api/dungeonEncs'; // URL dungeonEncs-listalle
=======
  private apiUrl = 'api/randomEncounters';
>>>>>>> d0dee6d28ba9f208186cde6834b31e6c041263e1

  constructor(private http: HttpClient) {}

  private handleError<T>(error: any): Observable<T[]> {
    console.error('An error occurred', error);
    return of([] as T[]); // Return an empty array on error
  }
  getEncounters(): Observable<RandomEncounters[]> {
    return this.http.get<RandomEncounters[]>(this.apiUrl);
  }

<<<<<<< HEAD
  // Hakee highwayEncs-listan
  getHighwayEncounters(): Observable<Enc[]> {
    return this.http.get<Enc[]>(this.highwayApiUrl).pipe(catchError(this.handleError));
  }

  // Hakee dungeonEncs-listan
  getDungeonEncounters(): Observable<Enc[]> {
    return this.http.get<Enc[]>(this.dungeonApiUrl).pipe(catchError(this.handleError));
=======
  getOneEncouter(): Observable<RandomEncounters[]> {
    return this.http
      .get<RandomEncounters[]>(this.apiUrl)
      .pipe(catchError((error) => this.handleError<RandomEncounters>(error)));
  }

  /**
   * Gets a random encounter table by its id.
   * @param id The id of the encounter table to be retrieved.
   * @returns An observable of the requested encounter table.
   */
  getTable(): Observable<RandomEncounters[]> {
    return this.http.get<RandomEncounters[]>(this.apiUrl).pipe(
      catchError((error) => this.handleError<RandomEncounters>(error)),
      map((encounters) => {
        return encounters.filter((encounter) => encounter.enc);
      })
    );
>>>>>>> d0dee6d28ba9f208186cde6834b31e6c041263e1
  }
}
