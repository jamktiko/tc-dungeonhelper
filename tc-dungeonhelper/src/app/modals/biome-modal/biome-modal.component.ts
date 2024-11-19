import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-biome-modal',
  standalone: true,
  imports: [MatDialogModule, MatCardModule, FormsModule],
  templateUrl: './biome-modal.component.html',
  styleUrl: './biome-modal.component.css',
})
export class BiomeModalComponent implements OnInit {
  newTableName: string = ''; // Initialize as an empty string
  constructor(
    public dialogRef: MatDialogRef<BiomeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    console.log('Modal open');
  }

  onSave(): void {
    this.dialogRef.close(this.newTableName); // Lähetetää data takaisin pääkomponentille
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
