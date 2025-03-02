import { Component, inject, Signal, VERSION } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ThemeService } from './services/theme.service'
import { SharedImports } from './modules/shared-imports'
import { LucideIconsModule } from './modules/lucide-icons.module'
import { Notification } from './services/notification.service'
import { CapitalizePipe } from './pipes/capitalize.pipe'
import { TranslatePipe } from './pipes/translate.pipe'
import { TranslationService } from './services/translation.service'

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, SharedImports, LucideIconsModule, CapitalizePipe, TranslatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  angularVersion = VERSION.full // angular version
  public themesList: string[] = [] // initialize themes list
  public currentTheme = 'slate' // current theme

  // Services
  private readonly translationService = inject(TranslationService)
  private readonly themeService = inject(ThemeService)
  private readonly toastService = inject(Notification)

  // Signal to update current language
  public currentLang: Signal<string> = this.translationService.currentLang

  ngOnInit() {
    // Update themesList
    this.themesList = this.themeService.themes
    // Get theme from the localstorage or load it by defult
    const savedTheme = localStorage.getItem('theme') || 'slate'
    this.toggleTheme(savedTheme)
  }

  // Changes theme
  // Accepts both string or event 
  toggleTheme(event: Event | string) {
    const selectedTheme = typeof event === 'string'
      ? event
      : (event.target as HTMLSelectElement).value

    this.themeService.toggleTheme(selectedTheme)
    this.currentTheme = selectedTheme
  }

  // Change Language
  async changeLanguage(lang: string) {
    await this.translationService.setLanguage(lang)
  }

  // Event executed on select changes
  onLanguageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement
    if (selectElement) {
      this.changeLanguage(selectElement.value)
    }
  }

  // Success toast
  showSuccess() {
    this.toastService.success('toast.successMessage')
  }

  //Error toast
  showError() {
    this.toastService.error("toast.errorMessage")
  }


}
