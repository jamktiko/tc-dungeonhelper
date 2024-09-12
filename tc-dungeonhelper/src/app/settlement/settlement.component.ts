import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-my-component',
  standalone: true,
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.css'],
  imports: [MatButtonModule] // Lisää MatButtonModule tänne
})
export class SettlementComponent {

}
