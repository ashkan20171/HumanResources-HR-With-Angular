import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  get(key: string): string | null {
    try {
      if (this.isBrowser()) {
        return window.localStorage.getItem(key);
      }
    } catch { /* ignore */ }
    return null;
  }

  set(key: string, value: string): void {
    try {
      if (this.isBrowser()) {
        window.localStorage.setItem(key, value);
      }
    } catch { /* ignore */ }
  }

  remove(key: string): void {
    try {
      if (this.isBrowser()) {
        window.localStorage.removeItem(key);
      }
    } catch { /* ignore */ }
  }
}
