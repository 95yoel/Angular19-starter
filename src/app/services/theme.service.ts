import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public themes = [
    'slate','grey','zinc','neutral','stone','red','orange',
  ]

  private currentTheme:string = 'slate'

  constructor() { 
    this.loadTheme()
  }

  private setTheme(theme: string) {
    if (this.themes.includes(theme)) {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
      this.currentTheme = theme
    }
  }

  getTheme():string{
    return this.currentTheme
  }

  toggleTheme(selectedTheme:string){
    this.setTheme(selectedTheme)
  }

  private loadTheme(){
    const savedTheme = localStorage.getItem('theme')
    if(savedTheme && this.themes.includes(savedTheme)){
      this.setTheme(savedTheme)
    }
  }

}
