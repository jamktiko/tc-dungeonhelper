import { Routes } from '@angular/router';
import { EnctableComponent } from './enctable/enctable.component';
import { RetablesComponent } from './retables/retables.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { AppComponent } from './app.component';
import { MerchantDetailComponent } from './merchant-detail/merchant-detail.component';
import { KaruselliComponent } from './karuselli/karuselli.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: KaruselliComponent },
  { path: 'retables', component: RetablesComponent },
  { path: 'biome/:biome', component: EnctableComponent },
  { path: 'merchants', component: MerchantsComponent },
  { path: 'merchants/:id', component: MerchantDetailComponent },
  { path: '**', redirectTo: 'dashboard' }
];