import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Enc } from './types';

@Injectable({
  providedIn: 'root',
})
export class InMemoryService implements InMemoryDbService {
  createDb() {
    // products-taulukko on valetietokanta, jossa ovat tuotteet
    const highwayEncs: Enc[] = [
      {
        id: 1,
        name: 'Highwaymen',
        description:
          'A group of bandits, armed to the teeth, are lying in wait to harass unsuspecting travelers.',
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
          'A posted notice on a nearby tree or milestone announces a reward for the capture of a notorious outlaw, who may be hiding in the nearby area.',
      },
      {
        id: 6,
        name: 'Cave Rat',
        description: 'A stinking cave rat chitters in the shadows.',
      },
      {
        id: 7,
        name: 'Forest Bug',
        description: 'A stinky bug',
      },
      {
        id: 8,
        name: 'Peasant',
        description: 'A peasant',
      },
    ];

    return { highwayEncs };
  }

  //
  //  genId(encounters: REL[]): number {
  //    return encounters.length > 0
  //      ? Math.max(...encounters.map((enc) => .id)) + 1
  //      : 11;
  //  }
  //}
}
