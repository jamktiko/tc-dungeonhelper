import { Routes } from '@angular/router';
import { RandomComponent } from './random/random.component';
import { HighwayComponent } from './highway/highway.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EditHighwayComponent } from './edit-highway/edit-highway.component';

export const routes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: 'app', component: DashboardComponent },
  { path: 'random', component: RandomComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'highway', component: HighwayComponent },

  { path: 'edit-highway', component: EditHighwayComponent },
];
