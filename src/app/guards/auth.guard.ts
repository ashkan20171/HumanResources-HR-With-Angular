import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean | UrlTree {
    return this.checkLogin();
  }

  canActivateChild(): boolean | UrlTree {
    return this.checkLogin();
  }

  private checkLogin(): boolean | UrlTree {
    // روی سرور (SSR): localStorage نداریم → اجازه‌ی رندر بده؛
    // بعد از Hydration در کلاینت مسیر واقعی چک می‌شود.
    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }

    try {
      const user = localStorage.getItem('user');
      if (user) return true;                   // لاگین شده
    } catch {
      // اگر دسترسی به localStorage خطا داد، به لاگین هدایت می‌کنیم
    }

    // لاگین نیست → به صفحه لاگین هدایت شود
    return this.router.parseUrl('/login');
  }
}
