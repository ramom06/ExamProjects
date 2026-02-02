import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {routes} from './app/app.routes'
import { provideRouter } from '@angular/router';

bootstrapApplication(App,
  {
    providers: [
      provideProtractorTestingSupport(),
      provideRouter(routes)
    ]
  }
).catch(err => console.error(err));
