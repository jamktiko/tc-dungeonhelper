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

@Component({
  selector: 'app-enctable',
  standalone: true,
  imports: [NgFor, CommonModule, RouterModule],
  templateUrl: './enctable.component.html',
  styleUrl: './enctable.component.css',
})
export class EnctableComponent implements OnInit {
  randomEncounters: RandomEncounters[] = [];
  w: number = 0;
  filteredEncounters: RandomEncounters | any;

  location: any;

  constructor(
    private route: ActivatedRoute,
    private eservice: EserviceService,
    private drs: DicerollService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  /**
   * Fetchaa satunnaiskohtaamistiedot Eservicestä ja suodattaa ne
   * näyttäen biomikohtaisesti encounterit
   * Valittu biome siirretään "route" parametriksi
   */
  ngOnInit() {
    const biome = this.route.snapshot.paramMap.get('biome');
    this.eservice.getTable().subscribe((data: RandomEncounters[]) => {
      this.randomEncounters = data;
      // Filter encounters based on the selected biome
      this.filteredEncounters = this.randomEncounters.find(
        (encounter) => encounter.biome === biome
      );
      console.log(this.filteredEncounters?.enc);
      this.w = this.totalWeight(this.filteredEncounters?.enc);
      this.logW();
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

  logW() {
    console.log(this.w);
    console.log(this.percentCalc(8, this.w));
  }

  /**
   * Arpoo satunnaiskohtaamisen ja palauttaa valitun Encounterin.
   * Käyttää Logashin sample -metodia joka satunnaisesti valitsee alkion taulukosta

   */
  public rollTable(): void {
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

  public goBack(): void {
    this.location.back();
  }
}
