import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { EnctableComponent } from './enctable/enctable.component';
import { RetablesComponent } from './retables/retables.component';

import { MerchantsComponent } from './merchants/merchants.component';

export const routes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: 'app', component: DashboardComponent },
  { path: 'retables', component: RetablesComponent },

  { path: 'dashboard', component: DashboardComponent },

  { path: 'biome/:biome', component: EnctableComponent },

  { path: 'edit-highway', component: EditHighwayComponent },
  { path: 'merchants', component: MerchantsComponent },
];
