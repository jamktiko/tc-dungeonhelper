import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { EserviceService } from '../eservice.service';

import { REL } from '../enc';

@Component({
  selector: 'app-highway',
  standalone: true,
  imports: [RouterModule, RouterOutlet, NgFor, CommonModule],
  templateUrl: './highway.component.html',
  styleUrls: ['./highway.component.css'],
})
<<<<<<< HEAD
export class HighwayComponent implements OnInit {
  rE: REL[] = [];

  // rolledEncounter: any | null = null;
  // currentEncounterType: string = 'highway'; // Default encounter type

  constructor(
    private eservice: EserviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const pageId = Number(params.get('pageId'));
      this.eservice.getEncounters().subscribe((rel) => {
        console.log('Received data:', rel);

        this.rE = rel.find((rel) => rel.id === pageId);

        console.log('rE', this.rE);
        console.log('rel.biome:', rel.biome);
        console.log('pageId:', pageId);
      });
    });

    // Function to roll a random encounter from the current encounter type

    ///    const randomEncounter = this.drs.rollForEntity(encountersList);
    ///    this.rolledEncounter =
    ///      encountersList.find((enc) => enc.name === randomEncounter) || null;
    ///  }
    ///
    ///  // Method to switch the current encounter type
    ///  setEncounterType(type: string) {
    ///    this.currentEncounterType = type;
    ///    this.rolledEncounter = null; // Reset rolled encounter when changing type
    ///  }
    ///
=======
export class HighwayComponent {
  randomEncs: Enc[] = [];
  rolledEncounter: Enc | null = null; // Store the whole rolled encounter object

  constructor(private eservice: EserviceService, private drs: DicerollService) {
    this.eservice.getEncounters().subscribe(
      (data) => (this.randomEncs = data),
      (error) => console.error(error)
    );
  }

  rollTable() {
    const randomEncounter = this.drs.rollForEntity(this.randomEncs);
    this.rolledEncounter =
      this.randomEncs.find((enc) => enc.name === randomEncounter) || null; // Store the whole object
>>>>>>> 9c71196 (siirto in-memory dataan)
  }
}
