// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpErrorInterceptor } from './http-error.interceptor';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([httpErrorInterceptor])
    )
  ]
}).catch(err => console.error(err));