import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'register-hourse',
        loadComponent: () =>
          import('./register-hourse/register-hourse.component').then((m) => m.RegisterHourseComponent),
      },
      {
        path: 'leave',
        loadComponent: () =>
          import('./leave/leave.component').then((m) => m.LeaveComponent),
      },
      {
        path: 'mission',
        loadComponent: () =>
          import('./mission/mission.component').then((m) => m.MissionComponent),
      },
      {
        path: 'bills',
        loadComponent: () =>
          import('./bills/bills.component').then((m) => m.BillsComponent),
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];