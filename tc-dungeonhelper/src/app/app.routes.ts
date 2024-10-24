import { Routes } from '@angular/router';

import { EnctableComponent } from './enctable/enctable.component';
import { RetablesComponent } from './retables/retables.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'retables', component: RetablesComponent },

  { path: 'biome/:biome', component: EnctableComponent },

  { path: 'merchants', component: MerchantsComponent },
  { path: 'dashboard', component: DashboardComponent}
];
