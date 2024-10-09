import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';

@Component({
  selector: 'app-encounter-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './encounter-modal.component.html',
  styleUrls: ['./encounter-modal.component.css'],
})
export class EncounterModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EncounterModalComponent>,
    private location: Location
  ) {}

  backClicked() {
    this.location.back();
  }
}
