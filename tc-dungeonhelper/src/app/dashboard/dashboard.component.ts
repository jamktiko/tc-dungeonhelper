import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RetablesComponent } from '../retables/retables.component';
import {MatGridListModule} from '@angular/material/grid-list';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatGridListModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
