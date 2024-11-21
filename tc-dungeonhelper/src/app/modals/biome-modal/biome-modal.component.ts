import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-biome-modal',
  standalone: true,
  imports: [
    MatOptionModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './biome-modal.component.html',
  styleUrl: './biome-modal.component.css',
})
export class BiomeModalComponent {
  newTableName: string = ''; // Initialize as an empty string
  constructor(
    public dialogRef: MatDialogRef<BiomeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSave(): void {
    this.dialogRef.close(this.newTableName); // Lähetetää data takaisin pääkomponentille
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
