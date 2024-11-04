import { Routes } from '@angular/router';

import { EnctableComponent } from './enctable/enctable.component';
import { RetablesComponent } from './retables/retables.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AppComponent } from './app.component';
import { MerchantDetailComponent } from './merchant-detail/merchant-detail.component';
import { KaruselliComponent } from './karuselli/karuselli.component';

export const routes: Routes = [
  { path: 'retables', component: RetablesComponent },

  { path: 'biome/:biome', component: EnctableComponent },
  { path: 'merchant/', component: InventoryComponent },
  { path: 'merchants/:id', component: MerchantDetailComponent },
  { path: '', component: KaruselliComponent},
  { path: 'merchants', component: MerchantsComponent },
  { path: 'dashboard', component: DashboardComponent },
];
