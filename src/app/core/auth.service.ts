import { Injectable, signal, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly isBrowser: boolean;
  private _isLoggedIn = signal<boolean>(false);

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this._isLoggedIn.set(!!window.localStorage.getItem('user'));
    }
  }

  isLoggedIn() {
    return this._isLoggedIn();
  }

  login(username: string) {
    if (this.isBrowser) {
      window.localStorage.setItem('user', username);
    }
    this._isLoggedIn.set(true);
  }

  logout() {
    if (this.isBrowser) {
      window.localStorage.removeItem('user');
    }
    this._isLoggedIn.set(false);
  }
}
