import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Enc } from './Enc';

@Injectable({
  providedIn: 'root',
})
export class InMemoryService implements InMemoryDbService {
  createDb() {
    const highwayEncs = [
      {
        id: 1,
        name: 'Bandits',
      },
      {
        id: 2,
        name: 'Niko',
      },
    ];
    return { highwayEncs };
  }

  genId(highwayEncs: Enc[]): number {
    return highwayEncs.length > 0
      ? Math.max(...highwayEncs.map((enc) => enc.id)) + 1
      : 11;
  }
}
