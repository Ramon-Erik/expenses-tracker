import { Routes } from '@angular/router';
import { needAuthGuard } from './core/guards/auth.guard-guard';
import { noAuthGuard } from './core/guards/no-auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/login/login').then(comp => comp.Login),
    canActivate: [noAuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./modules/home/home.routes').then(m => m.routes),
    canActivate: [needAuthGuard]
  }
];
