import { ErrorHandler, Injectable, Injector} from '@angular/core'
import { Notification } from '../services/notification.service'

/**
 * Global Error Handler
 * 
 * Catches unhandled errors across the entire application and displays a toast.
 * Customize this behavior to fit your needs.
 */

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {} 

  handleError(error: unknown): void {
    const toast = this.injector.get(Notification)
    toast.error('An unexpected error ocurred:\n'+error,'Error')

    // You can add here logging or monitoring integration if needed

  }
}
