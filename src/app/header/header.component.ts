import { Component, OnInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  username: string | null = '';
  isLight = false;
  notifCount = 3; // نمونه: بعداً از API پر می‌شود

  timeStr = '';
  dateStr = '';
  private clockHandle: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('user');
    const saved = localStorage.getItem('theme');
    this.isLight = saved === 'light';
    this.applyTheme();
    this.startClock();
  }

  ngOnDestroy(): void {
    if (this.clockHandle) {
      clearInterval(this.clockHandle);
      this.clockHandle = null;
    }
  }

  toggleTheme(): void {
    this.isLight = !this.isLight;
    localStorage.setItem('theme', this.isLight ? 'light' : 'dark');
    this.applyTheme();
  }

  private applyTheme(): void {
    const root = this.document.documentElement;
    if (this.isLight) {
      this.renderer.addClass(root, 'light');
    } else {
      this.renderer.removeClass(root, 'light');
    }
  }

  private startClock(): void {
    const lang = (localStorage.getItem('lang') || 'fa-IR');
    const timeFmt = new Intl.DateTimeFormat(lang, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const dateFmt = new Intl.DateTimeFormat(lang, { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' });

    const tick = () => {
      const now = new Date();
      this.timeStr = timeFmt.format(now);
      this.dateStr = dateFmt.format(now);
    };
    tick();
    this.clockHandle = setInterval(tick, 1000);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}