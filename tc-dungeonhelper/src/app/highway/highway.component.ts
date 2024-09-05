import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Enc } from '../enc';
import { EserviceService } from '../eservice.service';

@Component({
  selector: 'app-highway',
  standalone: true,
  imports: [RouterModule, RouterOutlet, NgFor, CommonModule],
  templateUrl: './highway.component.html',
  styleUrl: './highway.component.css',
})
export class HighwayComponent {
  highwayEncs: Enc[] = [];

  constructor(private eservice: EserviceService) {
    this.eservice.getEncounters().subscribe(
      (data) => (this.highwayEncs = data),
      (error) => console.error(error)
    );
  }
}
