import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EserviceService } from '../eservice.service';
import { RandomEncounters, Enc } from '../types';
import { CommonModule, NgFor } from '@angular/common';
import { DicerollService } from '../diceroll.service';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-enctable',
  standalone: true,
  imports: [NgFor, CommonModule, RouterModule],
  templateUrl: './enctable.component.html',
  styleUrl: './enctable.component.css',
})
export class EnctableComponent {
  randomEncounters: RandomEncounters[] = [];
  encs: Enc[] = [];
  filteredEncounters: RandomEncounters | undefined;
  rolledEncounter: Enc | null = null; // Store the whole rolled encounter object

  constructor(
    private route: ActivatedRoute,
    private eservice: EserviceService,
    private drs: DicerollService
  ) {}

  ngOnInit() {
    this.getOneEncouter();
    this.getTable();
    const biome = this.route.snapshot.paramMap.get('biome');
    this.eservice.getTable().subscribe((data: RandomEncounters[]) => {
      this.randomEncounters = data;
      // Filter encounters based on the selected biome
      this.filteredEncounters = this.randomEncounters.find(
        (encounter) => encounter.biome === biome
      );
    });
  }

  rollTable() {
    const randomEncounter = this.drs.rollForEntity(this.encs);
    this.rolledEncounter =
      this.encs.find((enc) => enc.name === randomEncounter) || null; // Store the whole object
  }

  private getOneEncouter(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('getOneEncouter: id', id);
    this.eservice.getOneEncouter(id).subscribe(
      (encounter) => {
        console.log('getOneEncouter: encounter', encounter);
        this.randomEncounters = encounter;
      },
      (error) => console.error('getOneEncouter: error', error)
    );
    console.log('getOneEncouter: this.randomEncounters', this.randomEncounters);
  }

  private getTable(): void {
    this.eservice.getTable().subscribe((data: RandomEncounters[]) => {
      this.randomEncounters = data;
      //console.log('Encounters', data);
      this.encs = [];

      data.forEach((encounter: RandomEncounters) => {
        console.log('Biome:', encounter.biome);
        encounter.enc.forEach((enc) => {
          this.encs.push(enc); // Push each encounter into the encs array
          //console.log('Tätä on data', enc);
        });
      });
    });
  }
}
