import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideToastr } from 'ngx-toastr'
import { routes } from './app.routes'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { errorInterceptor } from './interceptors/error.interceptor'
import { GlobalErrorHandler } from './interceptors/global-errors.interceptor'
import { provideAnimations } from '@angular/platform-browser/animations'

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideToastr(),
    provideAnimations(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
    

    ]
}
