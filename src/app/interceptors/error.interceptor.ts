import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { Notification } from '../services/notification.service'
import { catchError, throwError } from 'rxjs'

/**
 * Error Interceptor
 * 
 * This interceptor catches HTTP errors and displays appropiate notifications
 * Customize each case to match the application's needs 
 */

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const toast = inject(Notification)
  return next(req).pipe(
    catchError((error) => {
      if(error instanceof HttpErrorResponse){
        let errorMessage = 'An unexpected error ocurred'
        switch(error.status){
          case 0:
            errorMessage = 'No internet connection!'
            toast.error(errorMessage, 'Network Error')
            break;
          case 400:
            errorMessage = 'Bad Request - Invalid data!'
            toast.error(errorMessage, 'Error')
            break;
          case 401:
            errorMessage = 'Session expired. Please login again.'
            toast.warning(errorMessage, 'Unauthorized')
            break
          case 403:
            errorMessage = 'You do not have permission to access this resource.'
            toast.warning(errorMessage, 'Forbidden')
            break
          case 404:
            errorMessage = 'The requested resource was not found.'
            toast.info(errorMessage, 'Not Found')
            break;
          case 500:
            errorMessage = 'Internal Server Error. Try again later.'
            toast.error(errorMessage, 'Server Error')
            break
        }
      }

        return throwError(()=>error)
    })
  )
}
