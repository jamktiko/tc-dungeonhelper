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
import { filter, sample } from 'lodash';

@Component({
  selector: 'app-enctable',
  standalone: true,
  imports: [NgFor, CommonModule, RouterModule],
  templateUrl: './enctable.component.html',
  styleUrl: './enctable.component.css',
})
export class EnctableComponent implements OnInit {
  randomEncounters: RandomEncounters[] = [];

  filteredEncounters: RandomEncounters | any;

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

  /**
   * Fetches the encounter data from the EserviceService and filters it
   * to show only the encounters of the selected biome.
   * The selected biome is passed as a route parameter.
   */
  ngOnInit() {
    const biome = this.route.snapshot.paramMap.get('biome');
    this.eservice.getTable().subscribe((data: RandomEncounters[]) => {
      this.randomEncounters = data;
      // Filter encounters based on the selected biome
      this.filteredEncounters = this.randomEncounters.find(
        (encounter) => encounter.biome === biome
      );
      console.log('Filtered encounters:', this.filteredEncounters);
    });
  }

  /**
   * Arpoo satunnaiskohtaamisen ja palauttaa valitun Encounterin.
   * Käyttää Logashin sample -metodia joka satunnaisesti valitsee alkion taulukosta

   */
  rollTable(): void {
    if (this.filteredEncounters) {
      const encounters = this.filteredEncounters.enc;
      const randomEncounter = sample(encounters);
      console.log(`Encounter ${randomEncounter.id}: ${randomEncounter.name}`);
      console.log(randomEncounter.description);
      this.dialog.open(EncounterModalComponent, {
        data: { encounter: randomEncounter },
      });
    }
  }

  openEncounterModal(encounter: any): void {
    console.log('openEncounterModal()');
    console.log('Selected encounter:', encounter);
    this.dialog.open(EncounterModalComponent, {
      data: { encounter: encounter }, // Pass the selected encounter data
    });
  }

  goBack(): void {
    this.location.back();
  }
}
