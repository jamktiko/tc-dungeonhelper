import { Injectable } from '@angular/core';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';

@Injectable({
  providedIn: 'root',
})
export class DicerollService {
  roll(diceNotation: string): any {
    const dice = new DiceRoll(diceNotation);
    return dice.total;
  }

  getAvailableDice(): string[] {
    return ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100']
      .map((die) => {
        return [
          `1${die}`,
          `2${die}`,
          `3${die}`,
          `4${die}`,
          `5${die}`,
          `6${die}`,
          `7${die}`,
          `8${die}`,
          `9${die}`,
          `10${die}`,
        ];
      })
      .flat();
  }
}
