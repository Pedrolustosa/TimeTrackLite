import { Component, computed, inject } from '@angular/core';
import { ThemeService } from '../../../core/theme/theme.service';
import { LanguageService } from '../../../i18n/language.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.html',
})
export class ThemeToggleComponent {
  private readonly themeService = inject(ThemeService);
  private readonly languageService = inject(LanguageService);

  protected readonly theme = this.themeService.theme;
  protected readonly t = this.languageService.translations;

  protected readonly actionLabel = computed(() =>
    this.theme() === 'light'
      ? this.t().theme.switchToDark
      : this.t().theme.switchToLight,
  );

  protected readonly currentThemeLabel = computed(() =>
    this.theme() === 'light' ? this.t().theme.light : this.t().theme.dark,
  );

  protected toggle(): void {
    this.themeService.toggleTheme();
  }
}
