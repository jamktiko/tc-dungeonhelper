// Funktionaalinen guard, jolla suojataan reitti loggautumattomilta käyttäjiltä
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

/*
authGuard on ns. funktionaalinen guard, joka tuli käyttöön Angularin versiossa 15.
Jos sessionStoragessa on accesstoken, guard palauttaa true, ja reitti
toimii. Jos tokenia ei ole, Guard palauttaa reitin login-näkymään, jonne
mennään välittömästi.
*/
export const authGuard = (next: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  
  if (authService.isLoggedIn()) {
    return true;
  }
  // Ei tokenia jolloin palataan login -sivulle
  return createUrlTreeFromSnapshot(next, ['/', 'login']);
};
