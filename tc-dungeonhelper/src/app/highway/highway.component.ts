import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EserviceService } from '../eservice.service';

import { RandomEncounters } from '../types';

@Component({
  selector: 'app-highway',
  standalone: true,
  imports: [RouterModule, RouterOutlet, NgFor, CommonModule, NgIf],
  templateUrl: './highway.component.html',
  styleUrls: ['./highway.component.css'],
})
export class HighwayComponent implements OnInit {
  randomEncounters: RandomEncounters[] = [];

  // rolledEncounter: any | null = null;
  // currentEncounterType: string = 'highway'; // Default encounter type

  constructor(private eservice: EserviceService) {}

  /**
   * OnInit lifecycle hook. Subscribes to the encounter service, logging
   * the result to the console. The result is an array of REL objects,
   * where each object has a biome and an array of encounter objects.
   */
  ngOnInit(): void {
    this.eservice.getEncounters().subscribe((randomEncounters) => {
      this.randomEncounters = randomEncounters;
      console.log('täsä ollaan', randomEncounters);
      console.log(randomEncounters[0].enc);
      console.log(randomEncounters[0].biome);
    });
  }
}
