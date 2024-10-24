import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RetablesComponent } from '../retables/retables.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
