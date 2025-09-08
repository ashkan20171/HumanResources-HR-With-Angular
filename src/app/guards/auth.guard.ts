import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) {}

  canActivate(): boolean {
    return this.checkLogin();
  }

  canActivateChild(): boolean {
    return this.checkLogin();
  }

  private checkLogin(): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      return true;
    } else {
      alert('شما لاگین نکردید!');
      this.router.navigate(['/login']);
      return false;
    }
  }
}