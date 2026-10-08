import { Component, inject } from '@angular/core';
import { AppLanguage } from '../../../i18n/language.model';
import { LanguageService } from '../../../i18n/language.service';

@Component({
  selector: 'app-language-selector',
  imports: [],
  templateUrl: './language-selector.html',
})
export class LanguageSelectorComponent {
  private readonly languageService = inject(LanguageService);

  protected readonly language = this.languageService.language;
  protected readonly t = this.languageService.translations;
  protected readonly options = this.languageService.supportedLanguages;

  protected onLanguageChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.languageService.setLanguage(select.value as AppLanguage);
  }

  protected labelFor(language: AppLanguage): string {
    return language === 'pt-BR' ? this.t().language.ptBR : this.t().language.en;
  }
}
