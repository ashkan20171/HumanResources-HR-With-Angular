import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';

declare var moment: any;

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  showHeader = false;
  showSidebar = false;
  shamsiDatetime: string = '';
  showLayout: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // ⛔ قفل کردن مسیرها بدون لاگین
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const user = localStorage.getItem('user');
        const publicRoutes = ['/login'];

        if (!user && !publicRoutes.includes(event.url)) {
          console.warn('⛔️ کاربر لاگین نکرده، برگشت به login');
          this.router.navigate(['/login']);
        }
      }

      if (event instanceof NavigationEnd) {
        // تنظیم هدر و سایدبار
        this.showLayout = !event.url.includes('/login');
      }
    });
  }
}
