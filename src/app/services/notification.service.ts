import { inject, Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class Notification {

  private readonly toastr = inject(ToastrService)
  private readonly injector = inject(Injector)

  /**
   * Shows a translated toast notification.
   * @param messageKey Translation key for the message.
   * @param titleKey Translation key for the title (optional).
   * @param type Notification type ('success', 'error', 'info', 'warning').
   * @param time Animation time (default: 600ms).
   * @param timeOut Duration before auto-hide (default: 1500ms).
   */
  private showToast(messageKey: string, titleKey: string = '', type: 'success' | 'error' | 'info' | 'warning', time: number = 600, timeOut: number = 1500) {
    const translation = this.injector.get(TranslationService)
    const translateFn = translation.translate()
    const message = translateFn(messageKey)
    const title = titleKey ? translateFn(titleKey) : ''

    // Global config for toasts
    this.toastr[type](message, title, {
      positionClass: 'toast-top-left',
      timeOut: timeOut,
      closeButton: true,
      progressBar: true,
      easing: 'ease-in-out',
      easeTime: time,
    })
  }

  success(messageKey: string, titleKey: string = 'toast.successTitle', time: number = 600, timeOut: number = 1500) {
    this.showToast(messageKey, titleKey, 'success', time, timeOut)
  }

  error(messageKey: string, titleKey: string = 'toast.errorTitle', time: number = 600, timeOut: number = 1500) {
    this.showToast(messageKey, titleKey, 'error', time, timeOut)
  }

  warning(messageKey: string, titleKey: string = 'toast.warningTitle', time: number = 600, timeOut: number = 1500) {
    this.showToast(messageKey, titleKey, 'warning', time, timeOut)
  }

  info(messageKey: string, titleKey: string = 'toast.infoTitle', time: number = 600, timeOut: number = 1500) {
    this.showToast(messageKey, titleKey, 'info', time, timeOut)
  }
}
