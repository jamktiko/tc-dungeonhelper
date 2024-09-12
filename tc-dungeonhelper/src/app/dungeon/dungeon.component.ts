import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Enc } from '../enc';
import { EserviceService } from '../eservice.service';
import { DicerollService } from '../diceroll.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dungeon',
  standalone: true,
  imports: [RouterModule, RouterOutlet, MatButtonModule, CommonModule, NgFor],
  templateUrl: './dungeon.component.html',
  styleUrls: ['./dungeon.component.css'],
})
export class DungeonComponent {
  dungeonEncs: Enc[] = [];
  rolledEncounter: Enc | null = null;

  constructor(private eservice: EserviceService, private drs: DicerollService) {
    this.eservice.getDungeonEncounters().subscribe(
      (data) => (this.dungeonEncs = data),
      (error) => console.error(error)
    );
  }

  rollTable() {
    const randomEncounterName = this.drs.rollForEntity(this.dungeonEncs);
    console.log('Random Encounter Name:', randomEncounterName); // Debugging
    this.rolledEncounter = 
      this.dungeonEncs.find((enc) => enc.name === randomEncounterName) || null;
    console.log('Rolled Encounter:', this.rolledEncounter); // Debugging
  }
}
