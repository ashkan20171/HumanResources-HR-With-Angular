import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment, Router } from '@angular/router';

export const RoleGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);
  const allowed: string[] = (route.data?.['roles'] as string[]) || [];
  if (allowed.length === 0) return true; // no role restriction

  const role = (localStorage.getItem('role') || 'user').toLowerCase();

  if (allowed.map(r => r.toLowerCase()).includes(role)) {
    return true;
  }

  // If role doesn't match, redirect to dashboard
  router.navigate(['/dashboard']);
  return false;
};