import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  //  {
  //   // path: '',children:[    ]
  // },
  // { path: 'home', loadChildren:'app/home/home.module#HomeModule' },  
  //  { path: 'dashboard', redirectTo: 'dashboard', pathMatch: 'full' },
  // { path: 'home',  redirectTo: 'home', pathMatch: 'full'  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
