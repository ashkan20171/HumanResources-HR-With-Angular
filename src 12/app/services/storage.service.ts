import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

  set(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }

  get(key: string): string | null {
    return this.isBrowser ? localStorage.getItem(key) : null;
  }

  remove(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  clear(): void {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }
}