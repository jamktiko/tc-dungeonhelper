import { Routes } from '@angular/router';
import { RandomComponent } from './random/random.component';

import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: 'random', component: RandomComponent },
  { path: 'dashboard', component: DashboardComponent },
];
