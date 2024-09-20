import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EserviceService } from '../eservice.service';
import { RandomEncounters, Enc } from '../types';
import { CommonModule, NgFor } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-enctable',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './enctable.component.html',
  styleUrl: './enctable.component.css',
})
export class EnctableComponent {
  randomEncounters: RandomEncounters[] = [];
  encs: Enc[] = [];
  filteredEncounters: RandomEncounters | undefined;

  constructor(
    private route: ActivatedRoute,
    private eservice: EserviceService
  ) {}

  ngOnInit() {
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

  //  private getTable(): void {
  //    this.eservice.getTable().subscribe((data: RandomEncounters[]) => {
  //      this.randomEncounters = data;
  //      console.log('Encounters', data);
  //      data.forEach((biome) => {
  //        biome.enc.forEach((enc) => {
  //          this.encs.push(enc);
  //        });
  //        console.log('Encs', this.encs);
  //      });
  //    });
  //  }

  private getTable(): void {
    this.eservice.getTable().subscribe((data: RandomEncounters[]) => {
      this.randomEncounters = data;
      console.log('Encounters', data);
      this.encs = [];
      data.forEach((encounter: RandomEncounters) => {
        console.log('Biome:', encounter.biome);
        encounter.enc.forEach((enc) => {
          this.encs.push(enc); // Push each encounter into the encs array
          console.log('Tätä on data', enc);
        });
      });
    });
  }
}
