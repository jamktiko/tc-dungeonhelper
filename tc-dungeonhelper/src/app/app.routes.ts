import { Routes } from '@angular/router';

import { EnctableComponent } from './enctable/enctable.component';
import { RetablesComponent } from './retables/retables.component';

import { MerchantsComponent } from './merchants/merchants.component';

import { AppComponent } from './app.component';
import { MerchantDetailComponent } from './merchant-detail/merchant-detail.component';
import { KaruselliComponent } from './karuselli/karuselli.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }, // redirect to `first-component`:

  { path: 'retables', component: RetablesComponent },

  { path: 'biome/:biome', component: EnctableComponent },

  { path: 'merchants/:id', component: MerchantDetailComponent },
  { path: 'dashboard', component: KaruselliComponent },
  { path: 'merchants', component: MerchantsComponent },
];
