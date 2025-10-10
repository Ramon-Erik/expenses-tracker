import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/login/login').then(comp => comp.Login)
  },
  {
    path: '',
    loadChildren: () => import('./modules/home/home.routes').then(m => m.routes)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.routes').then(m => m.routes)
  },
];
