import { Routes } from '@angular/router';

import { HighwayComponent } from './highway/highway.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EditHighwayComponent } from './edit-highway/edit-highway.component';
import { EnctableComponent } from './enctable/enctable.component';
import { RetablesComponent } from './retables/retables.component';
import { EncdetailComponent } from './encdetail/encdetail.component';
import { MerchantsComponent } from './merchants/merchants.component';

export const routes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: 'app', component: DashboardComponent },
  { path: 'retables', component: RetablesComponent },
  { path: 'detail/:id', component: EncdetailComponent },

  { path: 'dashboard', component: DashboardComponent },

  { path: 'biome/:biome', component: EnctableComponent },

  { path: 'edit-highway', component: EditHighwayComponent },
  {path: 'merchants', component: MerchantsComponent},
];
