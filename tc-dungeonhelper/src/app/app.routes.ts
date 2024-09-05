import { Routes } from '@angular/router';
import { RandomComponent } from './random/random.component';

export const routes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: 'random', component: RandomComponent },
];
