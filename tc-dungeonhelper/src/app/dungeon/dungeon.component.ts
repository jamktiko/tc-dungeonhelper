import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dungeon',
  standalone: true,
  imports: [RouterModule, RouterOutlet, NgFor, CommonModule],
  templateUrl: './dungeon.component.html',
  styleUrl: './dungeon.component.css',
})
export class DungeonComponent {}
