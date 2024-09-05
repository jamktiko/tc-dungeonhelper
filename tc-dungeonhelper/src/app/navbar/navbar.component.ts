import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RandomComponent } from '../random/random.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RandomComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
