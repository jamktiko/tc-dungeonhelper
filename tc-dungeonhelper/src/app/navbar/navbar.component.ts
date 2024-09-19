import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RetablesComponent } from '../retables/retables.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RetablesComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
