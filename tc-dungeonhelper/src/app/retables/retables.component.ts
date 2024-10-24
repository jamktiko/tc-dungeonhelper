import { Component, OnInit } from '@angular/core';
import { RandomEncounters } from '../types';
import { EserviceService } from '../eservice.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-retables',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NgFor,
    NgIf,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatTableModule,
  ],
  templateUrl: './retables.component.html',
  styleUrl: './retables.component.css',
})
export class RetablesComponent implements OnInit {
  randomEncounters: RandomEncounters[] = [];
  newTableName: string = ''; // Initialize as an empty string
  editMode: boolean = false;

  constructor(
    private eservice: EserviceService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.eservice.getEncounters().subscribe((re) => {
      this.randomEncounters = re;
      console.log('Encounters fetched:', re);
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  /**
   * Luo uuden taulukon taulukkolistaan, jolle voidaan antaa nimi.
   * Jos syötekenttä on tyhjä, snackbari näyttää virheilmoituksen.
   * Jos syötekenttä ei ole tyhjä, se luo uuden taulukko objektin ja lisää sen taulukkolistaan.
   * Näyttää snackbar ilmoituksen käyttäjälle sekä tyhjentää syötekentän.
   * Jos on virheitä, kirjataan ne konsoliin.
   */
  public addTable(): void {
    console.log('addTable() called');
    console.log('Before detectChanges:', this.newTableName);
    this.cdr.detectChanges();
    console.log('After detectChanges:', this.newTableName);
    if (this.newTableName.trim() === '') {
      console.log('Table name is required');
      this.snackBar.open('Table name is required', 'Close', {
        duration: 3000,
        panelClass: ['mat-snackbar-error'],
      });
      return;
    } else if (
      this.randomEncounters.some(
        (encounter) => encounter.biome === this.newTableName.trim()
      )
    ) {
      console.log('Table name already exists');
      this.snackBar.open('Table name already exists', 'Close', {
        duration: 3000,
        panelClass: ['mat-snackbar-error'],
      });
      return;
    }

    const newTable = {
      biome: this.newTableName,
      img: 'assets/addBiome.png',
      enc: [],
    };

    console.log('Adding new table:', newTable);
    // Show snackbar notification on success
    console.log('Showing snackbar notification');

    this.snackBar.open('Table successfully added!', 'Close', {
      duration: 3000, // 3 seconds
      panelClass: ['mat-snackbar-success'],
    });

    this.eservice.addTable(newTable).subscribe(
      (response) => {
        console.log('New table added:', response);
        this.randomEncounters.push(response);
        this.newTableName = ''; // Clear input field
      },
      (error) => {
        console.error('Error adding table:', error);
      }
    );
  }

  public deleteTable(biomeId: string, index: number, event: MouseEvent): void {
    event.stopPropagation();
    console.log(`Attempting to delete table with ID: ${biomeId}`);

    if (confirm('Are you sure you want to delete this table?')) {
      this.eservice.deleteTable(biomeId).subscribe(
        (response) => {
          this.randomEncounters.splice(index, 1);
          this.snackBar.open('Table successfully deleted!', 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Error deleting table:', error);
        }
      );
    }
  }
}
