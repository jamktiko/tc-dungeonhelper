// Funktionaalinen guard, jolla suojataan reitti loggautumattomilta käyttäjiltä
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
/*
authGuard on ns. funktionaalinen guard, joka tuli käyttöön Angularin versiossa 15.
Jos sessionStoragessa on accesstoken, guard palauttaa true, ja reitti
toimii. Jos tokenia ei ole, Guard palauttaa reitin login-näkymään, jonne
mennään välittömästi.
*/
export const authGuard = (next: ActivatedRouteSnapshot) => {
  if (sessionStorage.getItem('accesstoken')) {
    return true;
  }
  // Ei tokenia jolloin palataan login -sivulle
  return createUrlTreeFromSnapshot(next, ['/', 'login']);
};
