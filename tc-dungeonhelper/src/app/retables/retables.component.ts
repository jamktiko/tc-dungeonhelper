import { Component, OnInit } from '@angular/core';
import { RandomEncounters } from '../types';
import { EserviceService } from '../eservice.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';

@Component({
  selector: 'app-retables',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NgFor,
    NgIf,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './retables.component.html',
  styleUrl: './retables.component.css',
})
export class RetablesComponent implements OnInit {
  randomEncounters: RandomEncounters[] = [];

  // rolledEncounter: any | null = null;
  // currentEncounterType: string = 'highway'; // Default encounter type

  constructor(private eservice: EserviceService, private location: Location) {}

  backClicked() {
    this.location.back();
  }

  /**
   * OnInit lifecycle hook. Subscribes to the encounter service, logging
   * the result to the console. The result is an array of REL objects,
   * where each object has a biome and an array of encounter objects.
   */
  ngOnInit(): void {
    this.eservice.getEncounters().subscribe((re) => {
      this.randomEncounters = re;
      console.log('täsä ollaan', re);
      console.log(re[re.length - 1].biome);
    });
  }
}
