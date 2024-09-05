import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Enc } from '../Enc';
import { }

@Component({
  selector: 'app-highway',
  standalone: true,
  imports: [RouterModule, RouterOutlet, NgFor],
  templateUrl: './highway.component.html',
  styleUrl: './highway.component.css',
})
export class HighwayComponent {}
