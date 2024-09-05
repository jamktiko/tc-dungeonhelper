import { Routes } from '@angular/router';
import { RandomComponent } from './random/random.component';
import { HighwayComponent } from './highway/highway.component';
import { DungeonComponent } from './dungeon/dungeon.component';
import { SettlementComponent } from './settlement/settlement.component';
import { WildernessComponent } from './wilderness/wilderness.component';

import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: 'random', component: RandomComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'highway', component: HighwayComponent },
  { path: 'dungeon', component: DungeonComponent },
  { path: 'settlement', component: SettlementComponent },
  { path: 'wilderness', component: WildernessComponent },
];
