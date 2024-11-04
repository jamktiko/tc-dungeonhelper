import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EserviceService } from '../eservice.service';
import { Enc, RandomEncounters } from '../types';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EncounterModalComponent } from '../encounter-modal/encounter-modal.component';
import { sample } from 'lodash-es';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { AddModalComponent } from '../add-modal/add-modal.component';

@Component({
  selector: 'app-enctable',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    RouterModule,
    FormsModule,
    MatButton,
    MatButtonModule,
    MatProgressSpinnerModule,
    EncounterModalComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    AddModalComponent,
  ],
  templateUrl: './enctable.component.html',
  styleUrl: './enctable.component.css',
})
export class EnctableComponent implements OnInit {
  randomEncounters: RandomEncounters[] = [];

  w: WritableSignal<number> = signal(0);
  filteredEncounters: RandomEncounters | any;
  dialogConfig = new MatDialogConfig();
  newEncounter: any = {
    name: '',
    description: '',
    description2: '',
    roll: '',
    weight: 1,
    img: '',
    _id: '',
  };

  isEditing: boolean = false;
  showAddEncounterModal: boolean = false; // Boolean to control modal visibility

  constructor(
    private route: ActivatedRoute,
    private eservice: EserviceService,
    public dialog: MatDialog,
    private location: Location,
    private snackBar: MatSnackBar
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
          enc: biomeEncounters.enc.flatMap((enc) => enc),
        };

        this.w.set(this.totalWeight(this.filteredEncounters.enc)); // Lasketaan taulukon kokonaispaino
      } else {
        console.warn(`No encounters found for biome: ${biome}`);
      }
    });
  }

  // 🔣🔣🔣 Painoarvojen laskentaa 🔣🔣🔣
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
  /** 🎲🎲🎲 Arpoo Encounterin 🎲🎲🎲
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

  /**
   * 🔓🔓🔓 Avaa EncounterModal -komponentin valitulla encounterilla. 🔓🔓🔓
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

  public addEncounterModalOpen(): void {
    const dialogRef = this.dialog.open(AddModalComponent, {
      data: this.newEncounter,
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.filteredEncounters.enc.push(result);
        this.w.set(this.totalWeight(this.filteredEncounters.enc)); // Päivitetään kokonaispaino
        this.addEnc(result);
      }
    });
  }

  // 🔒🔒🔒 Modaalin sulku 🔒🔒🔒
  public closeAddEncounterModal() {
    this.showAddEncounterModal = false;
  }

  public increaseWeight(enc: any): void {
    enc.weight += 1;
    this.w.set(this.totalWeight(this.filteredEncounters.enc)); // Päivitetään kokonaispaino
  }

  public decreaseWeight(enc: any): void {
    if (enc.weight > 0) {
      enc.weight -= 1;
      this.w.set(this.totalWeight(this.filteredEncounters.enc)); // Päivitetään kokonaispaino
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

  /** 🔍🔍🔍🔍🔍🔍
   * Hakee encounterit servicesta ja laittaa ne getEncounters -muuttujaan.
   */
  public getEncounters() {
    this.eservice.getEncounters().subscribe((data: any) => {
      this.getEncounters = data;
    });
  }

  /** ➕➕➕ Encounterin lisäys ➕➕➕
   * Ensiksi tarkistaa onko encounterille annettu nimi.
   * Jos on, niin tarkistetaan filteredEncountersin olemassaolo ja ettei se ole null.
   * Jos se on olemassa, niin tarkistetaan seuraavaksi filteredEncounters._id;n olemassa olo ja ettei se ole null.
   * Tarkistaa kohtaamisen ja lisää uuden encounterin
   * @param
   */
  public addEnc(result: any): void {
    if (!result.name) {
      this.snackBar.open('Encounter name is required', 'Close', {
        duration: 3000,
        panelClass: ['mat-snackbar-error'],
      });
    } else {
      if (this.filteredEncounters && this.filteredEncounters._id) {
        this.eservice.addEnc(this.filteredEncounters._id, result).subscribe(
          (response) => {
            //Tässä voi kokeilla hakea kannasta dataa
            this.getEncounters();
            this.filteredEncounters.enc.push(
              response.enc[response.enc.length - 1]
            );
            this.snackBar.open('Encounter added successfully!', 'Close', {
              duration: 3000,
              panelClass: ['mat-snackbar-success'],
            });
          },
          (error) => {
            console.error('Error adding encounter:', error);
            this.snackBar.open(
              'Error adding encounter: ' + error.message,
              'Close',
              {
                duration: 3000,
                panelClass: ['mat-snackbar-error'],
              }
            );
          }
        );
      } else {
        this.snackBar.open('Please select a valid encounter first', 'Close', {
          duration: 3000,
          panelClass: ['mat-snackbar-warning'],
        });
      }
    }
  }
  // Reset the form after adding
  resetForm() {
    this.newEncounter = {
      name: '',
      description: '',
      weight: 1,
      img: '',
    };
  }

  // ✅✅✅ Encounterin tallennus ✅✅✅
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
                // Display a snackbar notification
                this.snackBar.open('Encounter saved successfully!', 'Close', {
                  duration: 3000,
                  panelClass: ['mat-snackbar-success'],
                });
              },
              (error) => {
                console.error('Error saving encounter:', error);
                // Display a snackbar notification with an error message
                this.snackBar.open(
                  'Error saving encounter: ' + error.message,
                  'Close',
                  {
                    duration: 3000,
                    panelClass: ['mat-snackbar-error'],
                  }
                );
              }
            );
        }
      });
    }
  }

  // ❌❌❌ Encounterin poisto ❌❌❌
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

  confirmDelete(biomeId: string, encounterId: string): void {
    if (confirm('Are you sure you want to delete this encounter?')) {
      this.deleteEnc(biomeId, encounterId);
    }
  }

  public goBack(): void {
    this.location.back();
  }
}
