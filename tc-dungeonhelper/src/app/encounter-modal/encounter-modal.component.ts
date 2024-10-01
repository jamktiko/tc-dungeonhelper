import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
} from '@angular/material/dialog';

@Component({
  selector: 'app-encounter-modal',
  standalone: true,
  imports: [],
  templateUrl: './encounter-modal.component.html',
  styleUrl: './encounter-modal.component.css',
})
export class EncounterModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
