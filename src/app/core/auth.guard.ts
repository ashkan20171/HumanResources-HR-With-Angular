import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, UrlSegment } from '@angular/router';
import { AuthService } from './auth.service';

function checkAuth(): true | ReturnType<Router['createUrlTree']> {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  return router.createUrlTree(['/login']);
}

export const authCanActivate: CanActivateFn = () => {
  return checkAuth();
};

export const authCanMatch: CanMatchFn = (route, segments: UrlSegment[]) => {
  return checkAuth();
};
