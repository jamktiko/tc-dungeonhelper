import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EserviceService } from '../eservice.service';
import { Enc, RandomEncounters } from '../types';
import { CommonModule, NgFor } from '@angular/common';
import { DicerollService } from '../diceroll.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EncounterModalComponent } from '../encounter-modal/encounter-modal.component';
import { filter, sample } from 'lodash';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-enctable',
  standalone: true,
  imports: [NgFor, CommonModule, RouterModule, FormsModule],
  templateUrl: './enctable.component.html',
  styleUrl: './enctable.component.css',
})
export class EnctableComponent implements OnInit {
  randomEncounters: RandomEncounters[] = [];
  w: number = 0;
  filteredEncounters: RandomEncounters | any;
  name = '';
  description = '';
  id = '';
  isEditing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eservice: EserviceService,
    private drs: DicerollService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private location: Location
  ) {}

  /**
   * Fetchaa satunnaiskohtaamistiedot Eservicest채 ja suodattaa ne
   *
   *
   * Fetches the encounter data from the EserviceService and filters it
   * to show only the encounters of the selected biome.
   * The selected biome is passed as a route parameter.
   */
  ngOnInit() {
    // Haetaan biome data routella
    const biome = this.route.snapshot.paramMap.get('biome');

    this.eservice.getTable().subscribe((data: RandomEncounters[]) => {
      console.log('Raw MongoDB data:', data);

      // Etsitään biomekohtaiset encounterit
      const biomeEncounters = data.find(
        (encounter) => encounter.biome === biome
      );

      if (biomeEncounters) {
        // Flatten eli liiskataan nestattu 'enc' taulukko
        this.filteredEncounters = {
          ...biomeEncounters,
          enc: biomeEncounters.enc.flatMap((enc) => enc), // Flatten nested arrays
        };

        console.log('Flattened Encounters:', this.filteredEncounters);
        this.w = this.totalWeight(this.filteredEncounters.enc); // Calculate total weight for flattened array
      } else {
        console.warn(`No encounters found for biome: ${biome}`);
      }
    });
  }
  totalWeight(x: Enc[] | undefined) {
    if (x == undefined) {
      return 0;
    }
    let total = 0;
    for (let y of x) {
      total += y.weight;
    }
    return total;
  }
  percentCalc(x: number, y: number) {
    return ((x / y) * 100).toFixed(2);
  }
  encTimesW(x: Enc[]) {
    //goes through given Enc[] and makes a new array with each encounter object weight property.
    let wX = [];
    for (let i of x) {
      for (let j = 0; j < i.weight; j++) {
        wX.push(i);
      }
    }
    return wX;
  }
  /**
   * Arpoo satunnaiskohtaamisen ja palauttaa valitun Encounterin.
   * K채ytt채채 Logashin sample -metodia joka satunnaisesti valitsee alkion taulukosta

   */
  public rollTable(): void {
    if (this.filteredEncounters) {
      const encounters = this.encTimesW(this.filteredEncounters.enc); //creates a new variable, which gets a array with encounters based on their weight.
      const randomEncounter = sample(encounters);
      console.log(encounters);
      if (randomEncounter == undefined) {
        return;
      }
      console.log(`Encounter ${randomEncounter.id}: ${randomEncounter.name}`);
      console.log(randomEncounter.description);
      this.dialog.open(EncounterModalComponent, {
        data: { encounter: randomEncounter },
      });
    }
  }

  /**
   * Avaa EncounterModal -komponentin valitulla encounterilla.
   * Eli kun sivulla on lista esim. "Highwaymen" ja painat siitä, se valitsee kyseisen esimerkin
   * ja avaa siitä modaalin
   * @param encounter valittu encounter data
   */
  public openEncounterModal(encounter: any): void {
    console.log('openEncounterModal()');
    console.log('Selected encounter:', encounter);
    this.dialog.open(EncounterModalComponent, {
      data: { encounter: encounter }, // Pass the selected encounter data
    });
  }

  public increaseWeight(enc: any): void {
    enc.weight += 1;
    this.w = this.totalWeight(this.filteredEncounters.enc); // Päivitetään kokonaispaino
    this.cdr.detectChanges();
  }

  public decreaseWeight(enc: any): void {
    if (enc.weight > 0) {
      enc.weight -= 1;
      this.w = this.totalWeight(this.filteredEncounters.enc); // Päivitetään kokonaispaino
      this.cdr.detectChanges();
    }
  }

  public editEnc(enc: any) {
    console.log('test');
    this.isEditing = !this.isEditing;
    this.id = enc._id;
    this.name = enc.name;
    this.description = enc.description;
  }

  public goBack(): void {
    this.location.back();
  }
}
