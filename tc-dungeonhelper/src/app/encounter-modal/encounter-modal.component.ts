import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-encounter-modal',
  template: `
    <h1 mat-dialog-title>Rolled Encounter</h1>
    <div mat-dialog-content>
      <p>{{ data.result }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="close()">Close</button>
    </div>
  `,
})
export class EncounterModalComponent {
  constructor(
    public dialogRef: MatDialogRef<EncounterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { result: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
