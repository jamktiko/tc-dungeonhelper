import { Injectable } from '@angular/core';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import { Enc, RandomEncounters } from './types';
import e from 'express';

@Injectable({
  providedIn: 'root',
})
export class DicerollService {
  randomEncounters: RandomEncounters[] = [];
  encs: Enc[] = [];
  roll20 = new DiceRoll('1d20');
  constructor() {}

  // Updated to return Enc object
  rollForEntity(encounters: Enc[]): Enc {
    if (encounters.length === 0) {
      console.log(encounters);
      console.error('Encounter list is empty, cannot roll.');
    }

    const randomNumber = Math.floor(Math.random() * encounters.length); // Select random encounter index
    const randomEncounter = encounters[randomNumber]; // Get the full encounter object

    if (!randomEncounter) {
      console.error('Encounter is undefined at index:', randomNumber);
    }

    console.log('Selected encounter:', randomEncounter); // Log the full encounter object
    return randomEncounter; // Return the full encounter object
  }
}
