import { ApplicationConfig, LOCALE_ID, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DatePipe, registerLocaleData } from '@angular/common';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errInterceptor } from './interceptors/err.interceptor';
import { provideNgxMask } from 'ngx-mask';
import localeTr from '@angular/common/locales/tr';

registerLocaleData(localeTr);

export const appConfig: ApplicationConfig = {
  providers: [    
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor, errInterceptor])),
    provideExperimentalZonelessChangeDetection(), //standalone api
    DatePipe,
    provideNgxMask(),
    { provide: LOCALE_ID, useValue: 'tr-TR' }
  ],
};
