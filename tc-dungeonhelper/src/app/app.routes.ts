import { Routes } from '@angular/router';
<<<<<<< HEAD
import { RandomComponent } from './random/random.component';
import { HighwayComponent } from './highway/highway.component';
=======
>>>>>>> d0dee6d28ba9f208186cde6834b31e6c041263e1

import { DashboardComponent } from './dashboard/dashboard.component';
import { EditHighwayComponent } from './edit-highway/edit-highway.component';
import { EnctableComponent } from './enctable/enctable.component';
import { RetablesComponent } from './retables/retables.component';
import { EncdetailComponent } from './encdetail/encdetail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: 'app', component: DashboardComponent },
  { path: 'retables', component: RetablesComponent },
  { path: 'detail/:id', component: EncdetailComponent },

  { path: 'dashboard', component: DashboardComponent },
<<<<<<< HEAD
  { path: 'highway', component: HighwayComponent },

  { path: 'edit-highway', component: EditHighwayComponent},
=======

  { path: 'biome/:biome', component: EnctableComponent },

  { path: 'edit-highway', component: EditHighwayComponent },
>>>>>>> d0dee6d28ba9f208186cde6834b31e6c041263e1
];
