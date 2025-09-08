import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { JalaliDateAdapter } from './shared/jalali-date.adapter';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),

    // ⬇️ افزودن شمسی‌ساز تاریخ
    { provide: MAT_DATE_LOCALE, useValue: 'fa-IR' },
    { provide: DateAdapter, useClass: JalaliDateAdapter },
  ]
};
