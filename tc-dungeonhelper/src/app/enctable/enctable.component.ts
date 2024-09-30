import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EserviceService } from '../eservice.service';
import { RandomEncounters, Enc } from '../types';
import { CommonModule, NgFor } from '@angular/common';
import { DicerollService } from '../diceroll.service';
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
export class EnctableComponent implements OnInit {
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
    private eservice: EserviceService,
    private drs: DicerollService
  ) {}

  ngOnInit() {
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

  rollTable() {
    const randomEncounter: Enc | null = this.drs.rollForEntity(this.encs);
    if (randomEncounter) {
      this.rolledEncounter = randomEncounter; // Store the whole encounter object directly
      console.log(
        'Rolled encounter successfully stored:',
        this.rolledEncounter
      );
    } else {
      this.rolledEncounter = null; // Handle the case when no valid encounter is rolled
      console.warn('No valid encounter was rolled.');
    }
  }
}
