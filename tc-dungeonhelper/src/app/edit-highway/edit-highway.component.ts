import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Enc } from '../types';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-edit-highway',
  standalone: true,
  imports: [RouterModule, RouterOutlet, FormsModule, CommonModule], // Include CommonModule
  templateUrl: './edit-highway.component.html',
  styleUrls: ['./edit-highway.component.css'],
})
export class EditHighwayComponent implements OnInit {
  highwayEncs: Enc[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<Enc[]>('/api/highwayEncs').subscribe((data) => {
      this.highwayEncs = data;
    });
  }

  saveEdits(): void {
    // Use a bulk PUT request if you have a backend that supports it,
    // or make separate PUT requests for each encounter
    this.highwayEncs.forEach((encounter) => {
      this.http
        .put(`/api/highwayEncs/${encounter.id}`, encounter)
        .subscribe(() => {
          // Successful update
          this.router.navigate(['/highway']); // Navigate back to the highway page
        });
    });
  }
}
