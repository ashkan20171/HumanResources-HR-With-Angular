import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    // اگر مسیر فعلی login است → اجازه بده بالا بیاد بدون هیچ شرطی
    if (state.url === '/login') {
      return true;
    }
    return this.checkLogin(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    // اگر مسیر فعلی login است → اجازه بده بالا بیاد
    if (state.url === '/login') {
      return true;
    }
    return this.checkLogin(state.url);
  }

  private checkLogin(url: string): boolean | UrlTree {
    const userStr = sessionStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    if (user && user.username) {
      // اگر کاربر لاگین کرده و دوباره به login رفت → بفرستش داشبورد
      if (url === '/login') {
        return this.router.parseUrl('/dashboard');
      }
      return true;
    }

    // اگر کاربر لاگین نکرده → بفرستش login
    if (url !== '/login') {
      alert('شما لاگین نکردید!');
    }
    return this.router.parseUrl('/login');
  }
}
