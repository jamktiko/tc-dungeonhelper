import { Injectable } from '@angular/core';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import { RandomEncounters } from './types';

@Injectable({
  providedIn: 'root',
})
export class DicerollService {
  randomEncounters: RandomEncounters[] = [];
  encs: Enc[] = [];
  roll20 = new DiceRoll('1d20');
  constructor() {}

  // Updated to return Enc object
  rollForEntity(encounters: RandomEncounters[]): RandomEncounters | null {
    if (encounters.length === 0) {
      console.log(encounters);
      console.error('Encounter list is empty, cannot roll.');
      return null; // Return null if no encounters are available
    }

    const randomNumber = Math.floor(Math.random() * encounters.length); // Select random encounter index
    const randomEncounter = encounters[randomNumber]; // Get the full encounter object

    if (!randomEncounter) {
      console.error('Encounter is undefined at index:', randomNumber);
      return null; // Return null if the encounter is undefined
    }

    console.log('Selected encounter:', randomEncounter); // Log the full encounter object
    return randomEncounter; // Return the full encounter object
  }
}
