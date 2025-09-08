import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';

declare var moment: any;

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showHeader = false;
  showSidebar = false;
  shamsiDatetime: string = '';
  showLayout: any;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // فقط در مرورگر به localStorage دست بزن
    const isBrowser = isPlatformBrowser(this.platformId);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (isBrowser) {
          const user = localStorage.getItem('user');
          const publicRoutes = ['/login'];

          if (!user && !publicRoutes.includes(event.url)) {
            console.warn('⛔️ کاربر لاگین نکرده، برگشت به login');
            this.router.navigate(['/login']);
          }
        }
      }

      if (event instanceof NavigationEnd) {
        // تنظیم هدر و سایدبار (این یکی برای SSR امن است)
        this.showLayout = !event.url.includes('/login');
      }
    });
  }
}
