import { Injectable } from '@angular/core';
import { Enc } from './Enc';
import { ENCS } from './mock-henc';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EserviceService {
  private apiUrl = 'api/highwayEncs';
  constructor() {}
}
