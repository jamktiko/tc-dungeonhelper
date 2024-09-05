import { Injectable } from '@angular/core';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';

@Injectable({
  providedIn: 'root',
})
export class DicerollService {
  constructor() {}

  roll(diceNotation: string): any {
    const dice = new DiceRoll(diceNotation);
    return dice;
  }
}
