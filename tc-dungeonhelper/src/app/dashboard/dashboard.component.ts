import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

import { RetablesComponent } from '../retables/retables.component';
import { RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, RouterModule, RetablesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
