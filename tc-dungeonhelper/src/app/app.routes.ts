import { Routes } from '@angular/router';
import { EnctableComponent } from './enctable/enctable.component';
import { RetablesComponent } from './retables/retables.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { AppComponent } from './app.component';
import { MerchantDetailComponent } from './merchant-detail/merchant-detail.component';
import { KaruselliComponent } from './karuselli/karuselli.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  // Public routes
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Protected routes
  { 
    path: 'dashboard', 
    component: KaruselliComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'retables', 
    component: RetablesComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'biome/:biome', 
    component: EnctableComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'merchants', 
    component: MerchantsComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'merchants/:id', 
    component: MerchantDetailComponent,
    canActivate: [authGuard]
  },

  // Catch-all route - should be last
  { path: '**', redirectTo: 'dashboard' }
];