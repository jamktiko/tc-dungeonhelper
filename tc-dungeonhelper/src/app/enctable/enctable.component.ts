import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EserviceService } from '../eservice.service';
import { RandomEncounters, Enc } from '../types';
import { CommonModule, NgFor } from '@angular/common';

import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-enctable',
  standalone: true,
  imports: [NgFor, CommonModule, RouterModule],
  templateUrl: './enctable.component.html',
  styleUrl: './enctable.component.css',
})
export class EnctableComponent implements OnInit, OnDestroy {
  randomEncounters: RandomEncounters[] = [];
  encs: Enc[] = [];
  filteredEncounters: RandomEncounters | undefined;
  rolledEncounter: Enc | null = null; // Store the whole rolled encounter object
  location: any;
  allEncounters: any[] = [];
  //subIds = this.randomEncounters[0].enc.map((encounter) => encounter.id);
  private subscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private eservice: EserviceService
  ) {}

  ngOnInit() {
    //  this.getTable();
    const biome = this.route.snapshot.paramMap.get('biome');
    this.eservice.getTable().subscribe((data: RandomEncounters[]) => {
      this.randomEncounters = data;
      // Filter encounters based on the selected biome
      this.filteredEncounters = this.randomEncounters.find(
        (encounter) => encounter.biome === biome
      );
    });
  }

  goBack(): void {
    this.location.back();
  }

  /**
   * Rolls a random encounter table. Subscribes to the encounter service
   * and generates a random number between 0 and the length of the encounters
   * array. If the encounter with the rolled id exists, it is stored in the
   * rolledEncounter property.
   */

  /**
   * Subscribes to the encounter service and assigns the result to
   * randomEncounters. Then it iterates over the result and pushes each
   * encounter into the encs array.
   */
  getTable(): void {
    this.subscription = this.eservice.getTable().subscribe({
      next: (data: RandomEncounters[]) => {
        this.randomEncounters = data;

        data.forEach((encounter: RandomEncounters) => {
          encounter.enc.forEach((enc) => {
            this.allEncounters.push({
              biome: encounter.biome,
              ...enc,
            });
          });
        });

        console.log('Total encounters:', this.allEncounters.length);
        console.log('Id', this.allEncounters);
      },
      error: (err) => console.error('Error fetching encounters:', err),
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
