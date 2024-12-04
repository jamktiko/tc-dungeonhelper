import { Component, HostListener } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RetablesComponent } from '../retables/retables.component';
import { MerchantsComponent } from '../merchants/merchants.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../services/auth.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    CommonModule,
    MatToolbarModule,
    MatSidenav,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const sidenavElement = document.querySelector('mat-sidenav');
    if (sidenavElement && !sidenavElement.contains(event.target as Node)) {
      this.closeSidenav();
    }
  }
  toggleSidenav(sidenav: any): void {
    sidenav.toggle();
  }

  closeSidenav(): void {
    const sidenav = document.querySelector('mat-sidenav');
    if (sidenav) {
      sidenav.dispatchEvent(new Event('click')); // Sulkee valikon
    }
  }

  logout() {
    this.authService.logout();
  }
}
