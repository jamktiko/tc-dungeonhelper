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
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EncounterModalComponent } from '../encounter-modal/encounter-modal.component';

import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { sample } from 'lodash-es';
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
  newEncounter: any = {
    name: '',
    description: '',
    weight: 1,
    img: '',
    _id: '',
  };
  isEditing: boolean = false;
  showAddEncounterModal: boolean = false; // Boolean to control modal visibility

  constructor(
    private route: ActivatedRoute,
    private eservice: EserviceService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private location: Location
  ) {}

  backClicked() {
    this.location.back();
  }

  /**
   * Fetchaa satunnaiskohtaamistiedot Eservicestä ja suodattaa ne
   *
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
        // FlatMap eli liiskataan nestattu 'enc' taulukko
        this.filteredEncounters = {
          ...biomeEncounters,
          enc: biomeEncounters.enc.flatMap((enc) => enc), // Flatten nested arrays
        };

        this.w = this.totalWeight(this.filteredEncounters.enc); // Calculate total weight for flattened array
      } else {
        console.warn(`No encounters found for biome: ${biome}`);
      }
    });
  }
  public totalWeight(x: Enc[] | undefined) {
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
   * Käytää Loashin sample -metodia joka satunnaisesti valitsee alkion taulukosta

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

  public openAddEncounterModal() {
    this.showAddEncounterModal = true;
  }

  public goBack(): void {
    this.location.back();
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

  // Method to close the modal
  public closeAddEncounterModal() {
    this.showAddEncounterModal = false;
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
  }

  public toggleEditMode() {
    this.isEditing = !this.isEditing;
    this.filteredEncounters.enc.forEach((enc: any) => {
      enc.isEditing = this.isEditing;
    });
  }

  public getEncounters() {
    this.eservice.getEncounters().subscribe((data: any) => {
      this.getEncounters = data;
    });
  }

  /**
   * Adds a new encounter to the selected biome.
   * @param newEncounter The new encounter to add.
   */
  public addEnc(): void {
    if (this.filteredEncounters && this.filteredEncounters._id) {
      this.eservice
        .addEnc(this.filteredEncounters._id, this.newEncounter)
        .subscribe(
          (response) => {
            this.filteredEncounters.enc.push(
              response.enc[response.enc.length - 1]
            );
            this.resetForm();
            this.closeAddEncounterModal();
          },
          (error) => console.error('Error adding encounter:', error)
        );
    } else {
      console.warn(
        'No valid encounter to add. Please select a valid encounter first.'
      );
    }
  }
  /******  7c5fd62e-ddbd-4b7d-a780-3699d09101ff  *******/
  // Reset the form after adding
  resetForm() {
    this.newEncounter = {
      name: '',
      description: '',
      weight: 1,
      img: '',
    };
  }

  saveEnc() {
    // Check if filteredEncounters is valid and there are any edited encounters
    if (this.filteredEncounters && this.filteredEncounters.enc) {
      this.filteredEncounters.enc.forEach((enc: any) => {
        if (enc.isEditing) {
          // Call the service to save the encounter
          this.eservice
            .saveEnc(this.filteredEncounters._id, enc._id, enc)
            .subscribe(
              (response) => {
                console.log('Encounter updated:', response);
                enc.isEditing = false; // Exit editing mode for this encounter
              },
              (error) => {
                console.error('Error saving encounter:', error);
              }
            );
        }
      });
    }
  }

  // Delete the encounter
  deleteEnc(biomeId: string, encounterId: string): void {
    console.log('Filtered Encounters:', this.filteredEncounters);
    console.log(`Deleting encounter ${encounterId} from biome ${biomeId}`);
    this.eservice.deleteEnc(biomeId, encounterId).subscribe(
      (response) => {
        console.log('Encounter deleted:', response);

        this.filteredEncounters.enc = this.filteredEncounters.enc.filter(
          (enc: any) => enc._id !== encounterId
        );
      },
      (error) => {
        console.error('Error deleting encounter:', error);
      }
    );
  }
}
