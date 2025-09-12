import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment, Router } from '@angular/router';

export const RoleGuard: CanMatchFn = (route: Route, _segments: UrlSegment[]) => {
  const router = inject(Router);
  const allowed: string[] = (route.data?.['roles'] as string[]) || [];
  if (!allowed.length) return true; // بدون محدودیت نقش

  const role = (localStorage.getItem('role') || 'user').toLowerCase();
  const ok = allowed.map(r => r.toLowerCase()).includes(role);

  if (!ok) {
    // مسیردهی امن در صورت عدم دسترسی
    if (role === 'user') router.navigate(['/register-hourse']);
    else router.navigate(['/dashboard']);
  }
  return ok;
};
