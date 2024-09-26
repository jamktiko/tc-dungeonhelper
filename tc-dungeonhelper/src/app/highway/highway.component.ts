import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Enc, RandomEncounters } from '../types';
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
  rolledEncounter: Enc | null = null;

  constructor(private eservice: EserviceService, private drs: DicerollService) {
    this.eservice.getEncounters().subscribe(
      (data: RandomEncounters[]) => {
        console.log('Data received from Eservice:', data); // Log full data response
  
        const highwayBiome = data.find((encounter) => encounter.biome === 'Highway');
        if (highwayBiome) {
          console.log('Highway biome found:', highwayBiome); // Log highway biome encounters
          this.highwayEncs = highwayBiome.enc;
          console.log('Highway encounters:', this.highwayEncs); // Log list of highway encounters
        } else {
          console.warn('No Highway biome found.');
        }
      },
      (error) => console.error('Error fetching encounters:', error)
    );
  }

  rollTable() {
    const randomEncounter: Enc | null = this.drs.rollForEntity(this.highwayEncs); // Get the full encounter object
  
    if (randomEncounter) {
      this.rolledEncounter = randomEncounter;  // Store the entire encounter
      console.log('Rolled encounter successfully stored:', this.rolledEncounter);
    } else {
      this.rolledEncounter = null; // Handle the case when no valid encounter is rolled
      console.warn('No valid encounter was rolled.');
    }
}}
