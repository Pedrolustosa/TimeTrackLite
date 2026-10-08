import { Injectable, signal } from '@angular/core';
import { AppTheme, DEFAULT_THEME } from './theme.model';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly currentTheme = signal<AppTheme>(DEFAULT_THEME);

  readonly theme = this.currentTheme.asReadonly();

  constructor() {
    this.applyTheme(DEFAULT_THEME);
  }

  setTheme(theme: AppTheme): void {
    if (theme !== 'light' && theme !== 'dark') {
      return;
    }
    this.currentTheme.set(theme);
    this.applyTheme(theme);
  }

  toggleTheme(): void {
    this.setTheme(this.currentTheme() === 'light' ? 'dark' : 'light');
  }

  private applyTheme(theme: AppTheme): void {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
  }
}
