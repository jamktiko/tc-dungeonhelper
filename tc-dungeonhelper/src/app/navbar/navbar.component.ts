import { Component, HostListener, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RetablesComponent } from '../retables/retables.component';
import { MerchantsComponent } from '../merchants/merchants.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
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
    MatMenuModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
onSidenavOpened() {
throw new Error('Method not implemented.');
}
  sidenav: any;
  constructor() {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;

    const clickedInside =
      targetElement.closest('mat-sidenav') || targetElement.closest('.menu-button') || targetElement.closest('a[mat-list-item]');

    if (this.sidenav.opened && !clickedInside) {
      event.preventDefault();
      event.stopPropagation();
      this.sidenav.close();
    }
  }
  closeSidenav(): void {
    this.sidenav.close();
  }
  toggleSidenav(): void {
    this.sidenav.toggle();
  }


}
