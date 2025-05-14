import { inject, Pipe, PipeTransform, Signal } from '@angular/core'
import { TranslationService } from '../services/translation.service'

/**
 * Translate Pipe
 * Translate a given key using the Translation Service
 * `pure:false` ensures updates only when language changes
 */

@Pipe({
  name: 'translate',
  pure:false
})
export class TranslatePipe implements PipeTransform {

  private translationService = inject(TranslationService)
  private translationSignal: Signal<(key: string) => string> = this.translationService.translate

  transform(value: string): string {
    return this.translationSignal()(value)
  }

}
