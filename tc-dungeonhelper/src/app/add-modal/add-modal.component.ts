import { Component, Inject, OnInit } from '@angular/core';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
    MatPaginatorModule,
    MatInput,
    MatSelectModule,
  ],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.css',
})
export class AddModalComponent implements OnInit {
  newEncounterForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  availableDice: string[] = [];
  selectedDie: string | undefined;
  isDisabled = true; // or false

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
  ngOnInit(): void {
    console.log(this.newEncounterForm);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.newEncounter); // Lähetetään data takaisin pääkomponentille
  }
}
