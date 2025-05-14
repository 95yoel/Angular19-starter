import { Pipe, PipeTransform } from '@angular/core'
import { Utils } from '../services/utils.service'

/**
 * Capitalize Pipe
 * 
 * Capitalize a string by capitalizing the first letter.
 * Uses the capitalize method from Utils service
 */

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
    return Utils.capitalize(value)
  }

}
