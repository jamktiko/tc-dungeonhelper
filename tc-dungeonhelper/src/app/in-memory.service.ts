import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Enc } from './enc';

@Injectable({
  providedIn: 'root',
})
export class InMemoryService implements InMemoryDbService {
  createDb() {
    const highwayEncs = [
      {
        id: 1,
        name: 'Highwaymen',
        description:
          ' A group of bandits, armed to the teeth, are lying in wait to ambush unsuspecting travelers.',
      },
      {
        id: 2,
        name: 'Niko',
        description:
          'Niko teleports behind the party and attempts to whip one of the players with an extension cord.',
      },
      {
        id: 3,
        name: 'Travelling Merchant',
        description:
          'A lone merchant, heavily laden with goods, is making their way down the highway. They may offer to trade or sell goods to the party.',
      },
      {
        id: 4,
        name: 'Group of Pilgrims',
        description:
          'A group of devout pilgrims, traveling to a nearby holy site, are seeking donations or food from the party.',
      },
      {
        id: 5,
        name: 'Wanted Poster',
        description:
          'A posted notice on a nearby tree or milestone announces a reward for the capture of a notorious outlaw, who may be hiding in the nearby area. ',
      },
      {
        id: 6,
        name: 'Abandoned Cart',
        description:
          'A rickety cart, abandoned by its owner, contains a few scattered goods and a cryptic note hinting at a local mystery',
      },
      {
        id: 7,
        name: 'Mysterious Stranger',
        description:
          'A hooded figure, dressed in dark clothing, is watching the party from a distance.',
      },
      {
        id: 8,
        name: 'Roadside Shrine',
        description:
          'A small, old shrine dedicated to a deity stands on the side of the road.',
      },
    ];

    const dungeonEncs = [];
    return { highwayEncs };
  }

  genId(highwayEncs: Enc[]): number {
    return highwayEncs.length > 0
      ? Math.max(...highwayEncs.map((enc) => enc.id)) + 1
      : 11;
  }
}
