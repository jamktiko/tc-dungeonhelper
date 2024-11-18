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
import { RetablesComponent } from '../retables/retables.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DicerollService } from '../diceroll.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

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
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './enctable.component.html',
  styleUrl: './enctable.component.css',
})
export class EnctableComponent implements OnInit {
  availableDice: string[] = [];
  w: WritableSignal<number> = signal(0);
  encounters: RandomEncounters | any;
  dialogConfig = new MatDialogConfig();
  newEncounter: WritableSignal<{
    name: string;
    description: string;
    roll: string;
    weight: number;
  }> = signal({
    name: '',
    description: '',
    roll: '',
    weight: 0,
  });

  isEditing: boolean = false;
  showAddEncounterModal: boolean = false; // Boolean to control modal visibility
  encountersData: any;
  selectedDie: any;

  constructor(
    private route: ActivatedRoute,
    private eservice: EserviceService,
    public dialog: MatDialog,
    private location: Location,
    private snackBar: MatSnackBar,
    private drs: DicerollService
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
        this.encounters = {
          ...biomeEncounters,
          enc: biomeEncounters.enc.flatMap((enc) => enc),
        };

        this.w.set(this.totalWeight(this.encounters.enc)); // Lasketaan taulukon kokonaispaino
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
    if (this.encounters) {
      const encounters = this.encTimesW(this.encounters.enc); //creates a new variable, which gets a array with encounters based on their weight.
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
        this.encounters.enc.push(result);
        this.w.set(this.totalWeight(this.encounters.enc)); // Päivitetään kokonaispaino
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
    this.w.set(this.totalWeight(this.encounters.enc)); // Päivitetään kokonaispaino
  }

  public decreaseWeight(enc: any): void {
    if (enc.weight > 0) {
      enc.weight -= 1;
      this.w.set(this.totalWeight(this.encounters.enc)); // Päivitetään kokonaispaino
    }
  }

  public editEnc(enc: any) {
    console.log('test');
    this.isEditing = !this.isEditing;
  }

  public toggleEditMode() {
    this.isEditing = !this.isEditing;
    this.encounters.enc.forEach((enc: any) => {
      enc.isEditing = this.isEditing;
    });
  }

  /** 🔍🔍🔍🔍🔍🔍
   * Hakee encounterit servicesta ja laittaa ne getEncounters -muuttujaan.
   */
  public getEncounters() {
    this.eservice.getEncounters().subscribe((data: any) => {
      this.encountersData = data;
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
    console.log('addEnc() called with result:', result);
    if (!result.name) {
      console.log('Encounter name is required');
      this.snackBar.open('Encounter name is required', 'Close', {
        duration: 3000,
        panelClass: ['mat-snackbar-error'],
      });
    } else {
      if (this.encounters && this.encounters._id) {
        console.log('Filtered encounters and ID exist');
        this.eservice
          .addEnc(this.encounters._id, {
            ...result,
            die: result.roll,
          })
          .subscribe(
            (response) => {
              console.log('Encounter added:', response);
              console.log('RULLA', result.roll);
              console.log('Uusi enkki', this.availableDice);
              this.getEncounters();
              this.encounters.enc.push(response.enc[response.enc.length - 1]);
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
        console.log('Valid encounter not selected');
        this.snackBar.open('Please select a valid encounter first', 'Close', {
          duration: 3000,
          panelClass: ['mat-snackbar-warning'],
        });
      }
    }
  }
  // Reset the form after adding
  //resetForm() {
  //  this.newEncounter = {
  //    name: '',
  //    description: '',
  //    weight: 1,
  //    img: '',
  //  };
  //}

  // ✅✅✅ Encounterin tallennus ✅✅✅
  saveEnc() {
    console.log('Lomakkeen tiedot:', this.newEncounter);
    this.encounters.enc.forEach((enc: any) => {
      console.log('Encounter to save:', enc);
      // Tallennetaan tiedot
      this.eservice
        .saveEnc(this.encounters._id, enc._id, this.newEncounter)
        .subscribe((response) => {
          console.log('Encounter saved:', response);
          // Display a snackbar notification
          this.snackBar.open('Encounter saved successfully!', 'Close', {
            duration: 3000,
            panelClass: ['mat-snackbar-success'],
          });
        });
    });
  }

  allSave() {
    this.isEditing = false;
    localStorage.setItem('encounters', JSON.stringify(this.encounters));
    this.eservice.allSave(this.encounters._id, this.encounters.enc).subscribe(
      (response) => {
        console.log('All encounters saved:', response);
        // Display a snackbar notification
        this.snackBar.open('All encounters saved successfully!', 'Close', {
          duration: 3000,
          panelClass: ['mat-snackbar-success'],
        });
      },
      (error) => {
        console.error('Error saving all encounters:', error);
        // Display a snackbar notification with an error message
        this.snackBar.open(
          'Error saving all encounters: ' + error.message,
          'Close',
          {
            duration: 3000,
            panelClass: ['mat-snackbar-error'],
          }
        );
      }
    );
  }

  // ���️���️���️ Encounterin muokkaus ���️���️���️

  // ❌❌❌ Encounterin poisto ❌❌❌
  deleteEnc(biomeId: string, encounterId: string): void {
    console.log('deleteEnc() called with:', biomeId, encounterId);
    console.log('Current filteredEncounters:', this.encounters);

    this.eservice.deleteEnc(biomeId, encounterId).subscribe(
      (response) => {
        console.log('Encounter deleted successfully:', response);

        this.encounters.enc = this.encounters.enc.filter(
          (enc: any) => enc._id !== encounterId
        );

        console.log('Updated filteredEncounters:', this.encounters);
      },
      (error) => {
        console.error('Error occurred while deleting encounter:', error);
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

  testButton(): void {
    console.log('Available dices:', this.drs.getAvailableDice());
  }
}
