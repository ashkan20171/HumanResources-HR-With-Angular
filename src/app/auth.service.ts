import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root' // این خط باعث می‌شود سرویس به صورت global در دسترس باشد
})
export class AuthService {
  private userNameSubject = new BehaviorSubject<string>('نام کاربر');
  userName$ = this.userNameSubject.asObservable();

  constructor() {}

  // این متد می‌تواند برای تغییر نام کاربر استفاده شود
  setUserName(name: string) {
    this.userNameSubject.next(name);
  }
}
