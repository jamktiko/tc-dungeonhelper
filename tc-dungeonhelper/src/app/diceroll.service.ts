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

  rollForEntity(encounter: Enc): string {
    const randomNumber = Math.floor(Math.random() * 8);
    const randomResult = encounter.name[randomNumber];

    //const randomNumber = Math.floor(Math.random() * 6);
    //const randomEntity = encounter.entities[randomNumber].entity;
    return randomResult;
  }
}
