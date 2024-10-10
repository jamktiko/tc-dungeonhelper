import { Routes } from '@angular/router';

import { EnctableComponent } from './enctable/enctable.component';
import { RetablesComponent } from './retables/retables.component';

import { MerchantsComponent } from './merchants/merchants.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: 'app', component: AppComponent },
  { path: 'retables', component: RetablesComponent },

  { path: 'biome/:biome', component: EnctableComponent },

  { path: 'merchants', component: MerchantsComponent },
];
