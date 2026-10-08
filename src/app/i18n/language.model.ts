export type AppLanguage = 'pt-BR' | 'en';

export const SUPPORTED_LANGUAGES: readonly AppLanguage[] = ['pt-BR', 'en'] as const;

export const DEFAULT_LANGUAGE: AppLanguage = 'pt-BR';

export interface TranslationCatalog {
  app: {
    title: string;
    subtitle: string;
  };
  language: {
    label: string;
    ptBR: string;
    en: string;
  };
  theme: {
    light: string;
    dark: string;
    switchToDark: string;
    switchToLight: string;
  };
  form: {
    title: string;
    start: string;
    lunchOut: string;
    lunchIn: string;
    end: string;
    hint: string;
    errors: {
      lunchOutBeforeStart: string;
      lunchInBeforeLunchOut: string;
      endBeforeLunchIn: string;
      negativePeriod: string;
    };
  };
  summary: {
    title: string;
    totalWorked: string;
    dailyGoal: string;
    balance: string;
    remaining: string;
    projectedEnd: string;
    status: string;
    statusMet: string;
    statusPending: string;
    statusExceeded: string;
    incomplete: string;
    notAvailable: string;
  };
  notification: {
    incomplete: {
      title: string;
      message: string;
    };
    close: {
      title: string;
      message: string;
    };
    completed: {
      title: string;
      message: string;
    };
    exceeded: {
      title: string;
      message: string;
    };
    below: {
      title: string;
      message: string;
    };
  };
  adjustment: {
    title: string;
    description: string;
    optionsLabel: string;
    adjustStart: string;
    adjustLunchOut: string;
    adjustLunchIn: string;
    adjustEnd: string;
    previewTitle: string;
    currentTime: string;
    suggestedTime: string;
    difference: string;
    totalAfter: string;
    goalConfirmation: string;
    differenceEarlier: string;
    differenceLater: string;
    differenceNone: string;
    apply: string;
    cancel: string;
    unavailable: string;
    invalidSuggestion: string;
    incompleteHint: string;
  };
}
