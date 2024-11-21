import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-merchant-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './merchant-modal.component.html',
  styleUrl: './merchant-modal.component.css',
})
export class MerchantModalComponent implements OnInit {
  itemTypes = ['Weapon', 'Armor', 'Magic', 'Consumable'];



  constructor(
    public dialogRef: MatDialogRef<MerchantModalComponent>,
    @Inject(MAT_DIALOG_DATA) public newMerchant: any
  ) {
    if (!this.newMerchant) {
      this.newMerchant = {
        name: '',
        type: ''
      };
    }
  }

  ngOnInit(): void {
    console.log('newMerchant', this.newMerchant);
  }

  onSave(): void {
    if (!this.newMerchant.name || !this.newMerchant.type) {
      return;
    }
    this.dialogRef.close(this.newMerchant); // Lähetetää data takaisin pääkomponentille
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}