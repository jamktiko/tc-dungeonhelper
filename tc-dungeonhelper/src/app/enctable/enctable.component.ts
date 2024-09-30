import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EserviceService } from '../eservice.service';
import { RandomEncounters } from '../types';
import { CommonModule, NgFor } from '@angular/common';
import { DicerollService } from '../diceroll.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { EncounterModalComponent } from '../encounter-modal/encounter-modal.component';

@Component({
  selector: 'app-enctable',
  standalone: true,
  imports: [NgFor, CommonModule, RouterModule],
  templateUrl: './enctable.component.html',
  styleUrl: './enctable.component.css',
})
export class EnctableComponent implements OnInit, OnDestroy {
  randomEncounters: RandomEncounters[] = [];

  showResult = false;
  filteredEncounters: RandomEncounters | undefined;
  rolledEncounter: RandomEncounters | null = null; // Store the whole rolled encounter object
  location: any;
  allEncounters: any[] = [];
  //subIds = this.randomEncounters[0].enc.map((encounter) => encounter.id);
  private subscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private eservice: EserviceService,
    private drs: DicerollService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
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

  openEncounterModal(encounter: any): void {
    this.dialog.open(EncounterModalComponent, {
      data: { encounter: encounter.enc }, // Pass the selected encounter data
    });
  }

  goBack(): void {
    this.location.back();
  }

  rollTable(encounter: RandomEncounters): void {
    const randomNumber = Math.floor(Math.random() * encounter.enc.length);
    const randomEntity =
      encounter.enc[randomNumber].name +
      ': ' +
      encounter.enc[randomNumber].description;
    console.log(randomNumber);
    console.log(encounter.enc[randomNumber].name);
    encounter.result = randomEntity; // Store the result in the encounter object
    this.cdr.detectChanges(); // Update the view
    this.showResult = true;

    this.dialog.open(EncounterModalComponent, {
      data: { result: encounter.result },
    });
  }

  /**
   * Subscribes to the encounter service and assigns the result to
   * randomEncounters. Then it iterates over the result and pushes each
   * encounter into the encs array.
   */
  private getTable(): void {
    this.subscription = this.eservice.getTable().subscribe({
      next: (data: RandomEncounters[]) => {
        this.randomEncounters = data;
        this.allEncounters = [];

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
