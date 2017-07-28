import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [

  { path: '', loadChildren:'app/home/home.module#HomeModule' },  
  { path: 'dashboard', loadChildren:'app/dashboard/dashboard.module#DashboardModule' },
  // { path: 'home',  redirectTo: 'home', pathMatch: 'full'  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
