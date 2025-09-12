import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent),
  },

  // همهٔ صفحات لاگین‌شده داخل لایهٔ Layout
  {
    path: '',
    canActivateChild: [AuthGuard],
    loadComponent: () =>
      import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // ==== فقط مدیر/HR/حسابداری (کاربر معمولی ممنوع) ====
      {
        path: 'dashboard',
        data: { roles: ['manager','hr','accounting'] },
        canMatch: [RoleGuard],
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
      },

      // ==== چهار دسترسی کاربر معمولی + مدیر/HR ====
      {
        path: 'register-hourse',
        data: { roles: ['user','manager','hr'] },
        canMatch: [RoleGuard],
        loadComponent: () => import('./register-hourse/register-hourse.component').then(m => m.RegisterHourseComponent),
      },
      {
        path: 'leave',
        data: { roles: ['user','manager','hr'] },
        canMatch: [RoleGuard],
        loadComponent: () => import('./leave/leave.component').then(m => m.LeaveComponent),
      },
      {
        path: 'mission',
        data: { roles: ['user','manager','hr'] },
        canMatch: [RoleGuard],
        loadComponent: () => import('./mission/mission.component').then(m => m.MissionComponent),
      },
      {
        path: 'bills',
        data: { roles: ['user','manager','hr','accounting'] },
        canMatch: [RoleGuard],
        loadComponent: () => import('./bills/bills.component').then(m => m.BillsComponent),
      },

      // ==== صفحات مخصوص نقش‌ها (کاربر معمولی ممنوع) ====
      {
        path: 'notifications',
        data: { roles: ['manager','hr','accounting'] },
        canMatch: [RoleGuard],
        loadComponent: () => import('./notifications/notifications.component').then(m => m.NotificationsComponent),
      },
      {
        path: 'leave-calendar',
        data: { roles: ['manager','hr'] },
        canMatch: [RoleGuard],
        loadComponent: () => import('./leave-calendar/leave-calendar.component').then(m => m.LeaveCalendarComponent),
      },
      {
        path: 'work-report',
        data: { roles: ['manager','hr','accounting'] },
        canMatch: [RoleGuard],
        loadComponent: () => import('./work-report/work-report.component').then(m => m.WorkReportComponent),
      },
      {
        path: 'employee-directory',
        data: { roles: ['manager','hr'] },
        canMatch: [RoleGuard],
        loadComponent: () => import('./employee-directory/employee-directory.component').then(m => m.EmployeeDirectoryComponent),
      },
      {
        path: 'documents',
        data: { roles: ['manager','hr'] },
        canMatch: [RoleGuard],
        loadComponent: () => import('./documents/documents.component').then(m => m.DocumentsComponent),
      },
      {
        path: 'help',
        data: { roles: ['manager','hr','accounting'] },
        canMatch: [RoleGuard],
        loadComponent: () => import('./help/help.component').then(m => m.HelpComponent),
      },
      {
        path: 'approvals',
        data: { roles: ['manager'] },
        canMatch: [RoleGuard],
        loadComponent: () => import('./approvals/approvals.component').then(m => m.ApprovalsComponent),
      },
      {
        path: 'payroll',
        data: { roles: ['accounting'] },
        canMatch: [RoleGuard],
        loadComponent: () => import('./payroll/payroll.component').then(m => m.PayrollComponent),
      },
      {
        path: 'settings',
        data: { roles: ['manager','hr','accounting'] },
        canMatch: [RoleGuard],
        loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent),
      },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
