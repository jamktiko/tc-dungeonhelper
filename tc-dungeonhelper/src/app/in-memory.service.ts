import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { RandomEncounters } from './types';

@Injectable({
  providedIn: 'root',
})
export class InMemoryService implements InMemoryDbService {
  createDb() {
    // products-taulukko on valetietokanta, jossa ovat tuotteet
    const randomEncounters: RandomEncounters[] = [
      {
        biome: 'Highway',
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
        id: undefined,
      },
      {
        biome: 'Dungeon',
        enc: [
          {
            id: 9,
            name: 'Spider`s web',
            description:
              'A narrow corridor is filled with a thick layer of spider webs. ',
          },
          {
            id: 10,
            name: 'Rival Dungeon Crawlers',
            description:
              'A rival gang of 2d4 Dungeon Crawlers are heard fighting a group of 2d6 Goblins in an adjacent room',
          },
          {
            id: 11,
            name: 'Skeletons',
            description:
              '2d6 Skeletal sentinels are guarding an artifact placed on a pedestal. Their bones creak with a malevolent rattle. ',
          },
        ],
        id: undefined,
      },
      {
        biome: 'Settlement',
        enc: [
          {
            id: 12,
            name: 'Paranoid Guards',
            description:
              'A patrol of stalwart defenders of the realm are convinced that you are hiding something. Probably several somethings. In fact, they accuse the party of being a spy, a thief, a murdered and a pastry thief all rolled into one.',
          },
        ],
        id: undefined,
      },
      {
        id: undefined,
        biome: 'Wilderness',
        enc: [
          {
            id: 13,
            name: 'Orc Raiders',
            description: 'A raiding team of 2d4 Orcs run through the forest.',
          },
        ],
      },
    ];

    return { randomEncounters };
  }

  genId(encounters: RandomEncounters[]): number {
    return encounters.length > 0
      ? Math.max(...encounters.map((enc) => enc.id)) + 1
      : 11;
  }
}
