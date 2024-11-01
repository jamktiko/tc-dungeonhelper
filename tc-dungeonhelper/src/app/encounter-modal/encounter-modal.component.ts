import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DiceRollSer}
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';

@Component({
  selector: 'app-encounter-modal',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './encounter-modal.component.html',
  styleUrls: ['./encounter-modal.component.css'],
})
export class EncounterModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EncounterModalComponent>,
    private location: Location
  ) {}

    // 🎲🎲🎲 arpoo encounterin, esim. maantierosvojen lukumäärän 🎲🎲🎲
    public rollEncounter() {
      if 
    }

  closeClicked() {
    this.dialogRef.close(console.log('Sulki'));
  }
}
