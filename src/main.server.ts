import 'zone.js/node';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideServerRendering } from '@angular/platform-server';

export default {
  appId: 'serverApp',
  bootstrap: () =>
    bootstrapApplication(AppComponent, {
      ...appConfig,
      providers: [...appConfig.providers, provideServerRendering()],
    }),
};