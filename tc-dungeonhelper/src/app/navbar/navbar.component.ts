import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RetablesComponent } from '../retables/retables.component';
import { MerchantsComponent } from '../merchants/merchants.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterOutlet,
    RetablesComponent,
    RouterModule,
    MerchantsComponent,
    MatButtonModule,
    CommonModule,
    MatToolbarModule,
    MatSidenav,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  toggleSidenav(sidenav: any) {
    sidenav.toggle(); // Kutsutaan sidenavin toggle-funktiota
  }

  closeSidenav(sidenav: any) {
    sidenav.close(); // Suljetaan sidenav
  }
}
