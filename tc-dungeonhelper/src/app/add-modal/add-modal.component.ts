import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { MatCardImage } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DicerollService } from '../diceroll.service';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-add-modal',
  standalone: true,
  providers: [DicerollService],

  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatGridListModule,
    MatCardImage,
    MatCardModule,
    MatSlideToggleModule,
    MatRadioModule,
    CommonModule,
    MatOptionModule,
  ],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.css',
})
export class AddModalComponent {
  availableDice: string[] = [];
  newEncounter = {
    name: '',
    description: '',
    roll: '',
    weight: 1,
    img: '',
    _id: '',
  };
  form: any;

  constructor(
    public dialogRef: MatDialogRef<AddModalComponent>,
    private drs: DicerollService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.availableDice = this.drs.getAvailableDice();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.newEncounter); // Lähetetään data takaisin pääkomponentille
  }
}
