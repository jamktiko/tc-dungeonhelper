import { Component, OnInit } from '@angular/core';
import { RandomEncounters } from '../types';
import { EserviceService } from '../eservice.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private location: Location,
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

  public addTable(): void {
    console.log('addTable() called');
    if (this.newTableName.trim() === '') {
      console.log('Table name is required');
      this.snackBar.open('Table name is required', 'Close', {
        duration: 3000,
        panelClass: ['mat-snackbar-error'],
      });
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
