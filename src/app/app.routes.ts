import { Routes } from '@angular/router';
import { authGuardGuard } from './core/guards/auth.guard-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/login/login').then(comp => comp.Login)
  },
  {
    path: '',
    loadChildren: () => import('./modules/home/home.routes').then(m => m.routes),
    canActivate: [authGuardGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.routes').then(m => m.routes),
    canActivate: [authGuardGuard]
  },
];
