import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Enc } from './enc';

@Injectable({
  providedIn: 'root',
})
export class InMemoryService implements InMemoryDbService {
  createDb() {
    const randomEncs = [
      {
        REL: [
          {
            biome: 'highway',
            enc: [
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
            ],
          },
          {
            biome: 'dungeon',
            enc: [
              {
                id: 9,
                name: 'Bandits',
                description:
                  'A group of bandits, armed to the teeth, are lying in wait to harass unsuspecting travelers.',
              },
              {
                id: 10,
                name: 'Merchant',
                description:
                  'A lone merchant, heavily laden with goods, is making their way down the highway. They may offer to trade or sell goods to the party.',
              },
              {
                id: 11,
                name: 'Pilgrims',
                description:
                  'A group of devout pilgrims, traveling to a nearby holy site, are seeking donations or food from the party.',
              },
            ],
          },
          {
            biome: 'settlement',
            enc: [
              {
                id: 12,
                name: 'Abandoned House',
                description:
                  'A rickety cart, abandoned by its owner, contains a few scattered goods and a cryptic note hinting at a local mystery',
              },
            ],
          },
          {
            biome: 'wilderness',
            enc: [
              {
                id: 13,
                name: 'Abandoned Mine',
                description:
                  'A rickety cart, abandoned by its owner, contains a few scattered goods and a cryptic note hinting at a local mystery',
              },
            ],
          },
        ],
      },
    ];

    return { randomEncs };
  }

  genId(encounters: Enc[]): number {
    return encounters.length > 0
      ? Math.max(...encounters.map((enc) => enc.id)) + 1
      : 11;
  }
}
