import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { MARKED_OPTIONS, provideMarkdown } from 'ngx-markdown';
import { authInterceptor } from './core/interceptors/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideHttpClient(withFetch()),
  provideRouter(routes),
  {
    provide: AsyncPipe,
    useClass: AsyncPipe
  },
  provideClientHydration(),
  provideHttpClient(withInterceptors([authInterceptor])),
  provideMarkdown({ loader: HttpClient })
  ]
};
