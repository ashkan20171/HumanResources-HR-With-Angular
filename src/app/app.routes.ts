import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent),
  },

  // All authenticated pages are hosted inside the Layout (header + sidebar)
  {
    path: '',
    canActivateChild: [AuthGuard],
    loadComponent: () =>
      import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

{
  path: 'employee-directory',
  loadComponent: () => import('./employee-directory/employee-directory.component').then(m => m.EmployeeDirectoryComponent),
},
{
  path: 'documents',
  loadComponent: () => import('./documents/documents.component').then(m => m.DocumentsComponent),
},
{
  path: 'help',
  loadComponent: () => import('./help/help.component').then(m => m.HelpComponent),
},

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'mission',
        loadComponent: () =>
          import('./mission/mission.component').then(m => m.MissionComponent),
      },
      {
        path: 'leave',
        loadComponent: () =>
          import('./leave/leave.component').then(m => m.LeaveComponent),
      },
      {
        path: 'register-hourse',
        loadComponent: () =>
          import('./register-hourse/register-hourse.component').then(m => m.RegisterHourseComponent),
      },
      {
        path: 'bills',
        loadComponent: () =>
          import('./bills/bills.component').then(m => m.BillsComponent),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./notifications/notifications.component').then(m => m.NotificationsComponent),
      },
      {
        path: 'leave-calendar',
        loadComponent: () =>
          import('./leave-calendar/leave-calendar.component').then(m => m.LeaveCalendarComponent),
      },
      {
        path: 'work-report',
        loadComponent: () =>
          import('./work-report/work-report.component').then(m => m.WorkReportComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./settings/settings.component').then(m => m.SettingsComponent),
      },
    ],
  },

  { path: '**', redirectTo: 'login' },
];