import { Injectable } from '@angular/core';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import { Enc } from './enc';

@Injectable({
  providedIn: 'root',
})
export class DicerollService {
  roll20 = new DiceRoll('1d20');
  constructor() {}

  roll(diceNotation: string): any {
    const dice = new DiceRoll(diceNotation);
    return dice;
  }

  rollForEntity(encounters: Enc[]): string {
    const randomNumber = Math.floor(Math.random() * encounters.length); // Select random encounter index
    const randomEncounter = encounters[randomNumber]; // Get the random encounter object
    console.log(randomEncounter.name); // Log the full encounter name
    return randomEncounter.name; // Return the full name
  }
}
