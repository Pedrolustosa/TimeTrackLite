import { AppLanguage, TranslationCatalog } from '../language.model';
import { en } from './en';
import { ptBR } from './pt-BR';

export const TRANSLATIONS: Record<AppLanguage, TranslationCatalog> = {
  'pt-BR': ptBR,
  en,
};
