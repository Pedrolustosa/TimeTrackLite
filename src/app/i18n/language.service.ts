import { computed, Injectable, signal } from '@angular/core';
import {
  AppLanguage,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  TranslationCatalog,
} from './language.model';
import { TRANSLATIONS } from './translations';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly currentLanguage = signal<AppLanguage>(DEFAULT_LANGUAGE);

  readonly language = this.currentLanguage.asReadonly();
  readonly translations = computed<TranslationCatalog>(
    () => TRANSLATIONS[this.currentLanguage()],
  );
  readonly supportedLanguages = SUPPORTED_LANGUAGES;

  constructor() {
    document.documentElement.lang = DEFAULT_LANGUAGE;
  }

  setLanguage(language: AppLanguage): void {
    if (!SUPPORTED_LANGUAGES.includes(language)) {
      return;
    }

    this.currentLanguage.set(language);
    document.documentElement.lang = language;
  }
}
