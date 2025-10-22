import { Routes } from '@angular/router';
import { needAuthGuard } from './core/guards/auth.guard-guard';
import { noAuthGuard } from './core/guards/no-auth-guard';
import { HomeLayout } from './shared/layouts/home-layout/home-layout';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/login/login').then(comp => comp.Login),
    canActivate: [noAuthGuard]
  },
  {
    path: '',
    component: HomeLayout,
    loadChildren: () => import('./modules/home/home.routes').then(m => m.routes),
    canActivateChild: [needAuthGuard]
  }
];
