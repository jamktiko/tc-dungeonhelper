import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DicerollService } from '../../services/diceroll.service';
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
    MatButtonModule,
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
  isDisabled = true; // or false

  displayDie(die: any): string {
    return die;
  }

  newEncounter = {
    name: '',
    description: '',
    roll: '',
    weight: 1,
    img: '',
    _id: '',
  };

  constructor(
    public dialogRef: MatDialogRef<AddModalComponent>,
    private drs: DicerollService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.availableDice = this.drs.getAvailableDice();
  }
  ngOnInit(): void {
    console.log('Modal open');
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onRollChange(event: any) {
    console.log('Roll changed:', event);
  }

  onSave(): void {
    this.dialogRef.close(this.newEncounter); // Lähetetään data takaisin pääkomponentille
  }
}
