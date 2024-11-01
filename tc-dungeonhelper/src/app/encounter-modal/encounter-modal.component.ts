import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DicerollService } from '../diceroll.service';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatOptionModule } from '@angular/material/core';

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
  ],
  templateUrl: './encounter-modal.component.html',
  styleUrls: ['./encounter-modal.component.css'],
})
export class EncounterModalComponent {
  rollResult: number | null = null;
  numberOfCharacters: number | null = null;

  availableDice: string[] = [
    '1d4',
    '2d4',
    '1d6',
    '2d6',
    '3d6',
    '1d8',
    '2d8',
    '3d8',
    '1d10',
    '2d10',
    '3d10',
    '1d12',
    '2d12',
    '3d12',
    '1d20',
    '2d20',
    '3d20',
  ];
  selectedDie: string = '1d6'; // Default to D6 or any preferred default
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EncounterModalComponent>,
    private location: Location,
    private drs: DicerollService
  ) {}

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
    const result = this.drs.roll(this.selectedDie); // Call your dice roll service
    console.log(`Rolled ${this.selectedDie}: ${result}`);
    alert(`You rolled ${this.selectedDie} and got: ${result}`);
  }

  closeClicked() {
    this.dialogRef.close(console.log('Sulki'));
  }
}
