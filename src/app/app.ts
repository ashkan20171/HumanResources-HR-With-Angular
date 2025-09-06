import { Component, signal, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isLoginPage = signal<boolean>(false);
  private router = inject(Router);

  constructor() {
    // initial value
    this.isLoginPage.set(this.router.url.startsWith('/login') || this.router.url === '/');
    // update on navigation
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.isLoginPage.set(e.urlAfterRedirects.startsWith('/login'));
      }
    });
  }
}
