import { Routes } from '@angular/router';
import { authCanActivate, authCanMatch } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    canMatch: [authCanMatch],
    canActivate: [authCanActivate],
    loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard)
  },
  { path: '**', redirectTo: 'login' }
];
