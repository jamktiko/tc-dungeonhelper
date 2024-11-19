import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DicerollService } from '../../diceroll.service';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RandomEncounters } from '../../types';

@Component({
  selector: 'app-encounter-modal',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatGridListModule,
    MatOptionModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatSlideToggleModule,
  ],
  templateUrl: './encounter-modal.component.html',
  styleUrls: ['./encounter-modal.component.css'],
})
export class EncounterModalComponent implements OnInit {
  rollResult: number | null = null;
  numberOfCharacters: number | null = null;
  filteredEncounters: RandomEncounters | any;
  selectedDie: string;
  availableDice: string[];

  // Default to D6 or any preferred default
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EncounterModalComponent>,
    private drs: DicerollService
  ) {
    this.filteredEncounters = this.data.encounter;
    this.selectedDie = this.data.encounter.roll;
    this.availableDice = this.drs.getAvailableDice();
  }
  ngOnInit() {
    this.onRoll();
  }

  // 🎲🎲🎲 arpoo encounterin, esim. maantierosvojen lukumäärän 🎲🎲🎲
  public rollEncounter() {
    if (this.data.encounter.roll) {
      this.data.encounter.roll = this.drs.roll(this.data.encounter.roll);
    }
  }

  public rollCharacters() {
    this.numberOfCharacters = this.drs.roll('2d4');
  }

  public onRoll() {
    // Iffitys tähän, jotta ei tule erroria jos roll arvo on tyhjä
    if (this.selectedDie) {
      const result = this.drs.roll(this.selectedDie);
      console.log(`Rolled ${this.selectedDie}: ${result}`);
      this.data.result = result;
    }
  }

  closeClicked() {
    this.dialogRef.close(console.log('Sulki'));
  }
}
