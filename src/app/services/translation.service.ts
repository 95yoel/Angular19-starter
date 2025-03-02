import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Notification } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  public currentLang = signal<string>(localStorage.getItem('lang') || 'en')
  private readonly toast = inject(Notification, { optional: true });

  private translations = signal<Record<string, string>>({})

  private http = inject(HttpClient)


  constructor(){
    this.loadTranslations(this.currentLang())
  }

  getLanguage(): string {
    return this.currentLang()
  }

  async setLanguage(lang: string): Promise<void> {
    if (this.currentLang() !== lang) {
      localStorage.setItem('lang', lang)
      this.currentLang.set(lang)
      await this.loadTranslations(lang)
    }
  }

  private async loadTranslations(lang: string): Promise<void> {
    try {
      const data = await firstValueFrom(this.http.get<Record<string, string>>(`/assets/i18n/${lang}.json`))
      this.translations.set(data)
    } catch (error) {
      if (this.toast) {
        this.toast.error('Language not found', 'Error')
      }
    }
  }

  translate = computed(() => {
    return (key: string) => this.translations()[key] || key
  })
}
