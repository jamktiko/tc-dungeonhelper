import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Enc } from '../enc';
import { EserviceService } from '../eservice.service';
import { DicerollService } from '../diceroll.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-highway',
  standalone: true,
  imports: [RouterModule, RouterOutlet, NgFor, CommonModule, MatButtonModule],
  templateUrl: './highway.component.html',
  styleUrls: ['./highway.component.css'],
})
export class HighwayComponent {
  highwayEncs: Enc[] = [];
  rolledEncounter: Enc | null = null; // Store the whole rolled encounter object

  constructor(private eservice: EserviceService, private drs: DicerollService) {
    this.eservice.getHighwayEncounters().subscribe(
      (data) => (this.highwayEncs = data),
      (error) => console.error(error)
    );
  }

  rollTable() {
    const randomEncounter = this.drs.rollForEntity(this.highwayEncs);
    this.rolledEncounter =
      this.highwayEncs.find((enc) => enc.name === randomEncounter) || null; // Store the whole object
  }
}
