import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Enc } from '../types';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-edit-highway',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule, MatButton],
  templateUrl: './edit-highway.component.html',
  styleUrls: ['./edit-highway.component.css'],
})
export class EditHighwayComponent implements OnInit {
  highwayEncs: Enc[] = [];
  showDetails: boolean[] = [];

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.http.get<Enc[]>('/api/highwayEncs').subscribe((data) => {
      this.highwayEncs = data;
      this.showDetails = new Array(this.highwayEncs.length).fill(false);
    });
  }

  saveEdits(): void {
    this.highwayEncs.forEach(encounter => {
      this.http.post(`/api/highwayEncs/${encounter.id}`, encounter).subscribe(
        () => {
          console.log(`Saved encounter with id ${encounter.id}`);
        },
        error => {
          console.error('Error saving encounter:', error);
        }
      );
    });
    this.router.navigate(['/highway']);
  }

  addEncounter(): void {
    const newId = this.highwayEncs.length > 0 ? Math.max(...this.highwayEncs.map(e => e.id)) + 1 : 1;
    const newEncounter: Enc = { id: newId, name: '', description: '' };
    this.highwayEncs.push(newEncounter);
    this.showDetails.push(true);  // Automatically show the details for the new encounter
  }

  
  deleteEncounter(index: number, event: Event): void {
    if(window.confirm('u sure')){
    event.stopPropagation();
  

    console.log('Delete button clicked. Removing encounter at index:', index);
  

    this.highwayEncs.splice(index, 1);
    this.showDetails.splice(index, 1);
  
    this.cdr.detectChanges();

    console.log('Updated encounters:', this.highwayEncs);
  };}
  
  toggleDetails(index: number): void {
    this.showDetails[index] = !this.showDetails[index];
    this.cdr.detectChanges();
  }
  trackByFn(index: number, item: Enc): number {
    return item.id;
  }

}
