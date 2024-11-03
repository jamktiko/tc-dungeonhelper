import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // Tuodaan CommonModule
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { KaruselliComponent } from "./karuselli/karuselli.component";

interface CarouselItem {
  image: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule, // Lisätään CommonModule imports-taulukkoon
    NavbarComponent,
    DashboardComponent,
    FooterComponent,
    MatButtonModule,
    MatButton,
    KaruselliComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Dunkkuapuri';

}
