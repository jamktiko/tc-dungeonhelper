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

  constructor(private eservice: EserviceService, private location: Location) {}

  ngOnInit(): void {
    this.eservice.getEncounters().subscribe((re) => {
      this.randomEncounters = re;
      console.log('Encounters fetched:', re);
    });
  }

  public addTable(): void {
    console.log('addTable() called with newTableName:', this.newTableName);

    if (this.newTableName.trim() === '') {
      console.log('Table name is required');
      return;
    }

    const newTable = {
      biome: this.newTableName,
      img: 'assets/addBiome.png',
      enc: [],
    };

    console.log('Prepared newTable object:', newTable);

    this.eservice.addTable(newTable).subscribe(
      (response) => {
        console.log('New table added successfully:', response);
        this.randomEncounters.push(response);
      },
      (error) => {
        console.error('Error adding table:', error);
      }
    );
  }
}
