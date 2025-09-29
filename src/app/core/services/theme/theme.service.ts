import { DOCUMENT, inject, Injectable, OnInit, signal } from '@angular/core';
import { LocalTheme } from '../../../shared/enums/theme.enum';

export type typeTheme = 'light' | 'dark'

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnInit {
  #document = inject(DOCUMENT)
  #currentTheme = signal<typeTheme>('dark')
  
  ngOnInit(): void {
    this.setTheme(this.getStoredTheme())
  }
  
  private getStoredTheme() : typeTheme {
    return (localStorage.getItem(LocalTheme.KEY) ?? 'dark') as typeTheme
  }

  private storeTheme(theme : string) {
    localStorage.setItem(LocalTheme.KEY, theme)
  }
  
  private setTheme(theme: typeTheme) {
    this.#currentTheme.set(theme)

    if (theme === 'dark') {
      this.#document.documentElement.classList.remove('light-mode')
    } else {
      this.#document.documentElement.classList.add('light-mode')
    }

    this.storeTheme(theme)
  }

  public toggleTheme() {
    if (this.#currentTheme() === 'dark') {
      this.setTheme('light')
    } else {
      this.setTheme('dark')
    }
  }
}
