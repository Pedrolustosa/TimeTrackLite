import { TranslationCatalog } from '../language.model';

export const ptBR: TranslationCatalog = {
  app: {
    title: 'TimeTrack Lite',
    subtitle: 'Calcule sua jornada diária de trabalho',
  },
  language: {
    label: 'Idioma',
    ptBR: 'Português (Brasil)',
    en: 'English',
  },
  theme: {
    light: 'Tema claro',
    dark: 'Tema escuro',
    switchToDark: 'Alternar para tema escuro',
    switchToLight: 'Alternar para tema claro',
  },
  form: {
    title: 'Horários da jornada',
    start: 'Início da jornada',
    lunchOut: 'Saída para almoço',
    lunchIn: 'Retorno do almoço',
    end: 'Saída final',
    hint: 'Informe os horários para calcular o total trabalhado e o saldo do dia.',
    errors: {
      lunchOutBeforeStart: 'A saída para almoço deve ser posterior ao início da jornada.',
      lunchInBeforeLunchOut: 'O retorno do almoço deve ser igual ou posterior à saída para almoço.',
      endBeforeLunchIn: 'A saída final deve ser posterior ao retorno do almoço.',
      negativePeriod: 'Os horários informados geram um período inválido.',
    },
  },
  summary: {
    title: 'Resumo da jornada',
    totalWorked: 'Total trabalhado',
    dailyGoal: 'Meta diária',
    balance: 'Saldo do dia',
    remaining: 'Tempo restante para a meta',
    projectedEnd: 'Horário previsto para finalizar',
    status: 'Situação',
    statusMet: 'Meta atingida',
    statusPending: 'Meta pendente',
    statusExceeded: 'Tempo excedente',
    incomplete: 'Preencha os quatro horários válidos para ver o resumo completo.',
    notAvailable: '—',
  },
  notification: {
    incomplete: {
      title: 'Jornada incompleta',
      message: 'Preencha os horários da jornada para consultar seu resultado.',
    },
    close: {
      title: 'Quase lá',
      message:
        'Você está próximo de completar sua jornada. Faltam {remaining} minutos para atingir as 8 horas.',
    },
    completed: {
      title: 'Jornada concluída',
      message: 'Jornada concluída! Você completou suas 8 horas diárias.',
    },
    exceeded: {
      title: 'Jornada excedida',
      message:
        'Meta diária atingida. Você trabalhou {excess} minutos além das 8 horas previstas.',
    },
    below: {
      title: 'Meta pendente',
      message:
        'Você trabalhou {total}. Ainda faltam {remaining} para completar sua jornada.',
    },
  },
  adjustment: {
    title: 'Ajustar horários para completar 8 horas',
    description:
      'Escolha qual horário deseja ajustar. Calcularemos o valor necessário para completar exatamente 8 horas de trabalho, mantendo os outros três horários.',
    optionsLabel: 'Campo a ajustar',
    adjustStart: 'Ajustar o início da jornada',
    adjustLunchOut: 'Ajustar a saída para almoço',
    adjustLunchIn: 'Ajustar o retorno do almoço',
    adjustEnd: 'Ajustar a saída final',
    previewTitle: 'Prévia do ajuste',
    currentTime: 'Horário atual',
    suggestedTime: 'Horário sugerido',
    difference: 'Diferença',
    totalAfter: 'Total após o ajuste',
    goalConfirmation: 'A meta diária será exatamente 8 horas.',
    differenceEarlier: '{minutes} minutos mais cedo',
    differenceLater: '{minutes} minutos mais tarde',
    differenceNone: 'Sem alteração',
    apply: 'Aplicar ajuste',
    cancel: 'Cancelar',
    unavailable: 'Preencha os quatro horários válidos para usar o ajuste inteligente.',
    invalidSuggestion:
      'Não foi possível ajustar esse horário mantendo os outros três registros. Selecione outro campo ou revise os horários informados.',
    incompleteHint: 'Selecione um horário para ver a prévia do ajuste.',
  },
};
