import { TranslationCatalog } from '../language.model';

export const en: TranslationCatalog = {
  app: {
    title: 'TimeTrack Lite',
    subtitle: 'Calculate your daily work schedule',
  },
  language: {
    label: 'Language',
    ptBR: 'Português (Brasil)',
    en: 'English',
  },
  theme: {
    light: 'Light theme',
    dark: 'Dark theme',
    switchToDark: 'Switch to dark theme',
    switchToLight: 'Switch to light theme',
  },
  form: {
    title: 'Work schedule times',
    start: 'Workday start',
    lunchOut: 'Lunch break start',
    lunchIn: 'Lunch break return',
    end: 'Workday end',
    hint: 'Enter the times to calculate total worked hours and the daily balance.',
    errors: {
      lunchOutBeforeStart: 'Lunch break start must be after workday start.',
      lunchInBeforeLunchOut: 'Lunch break return must be at or after lunch break start.',
      endBeforeLunchIn: 'Workday end must be after lunch break return.',
      negativePeriod: 'The entered times produce an invalid period.',
    },
  },
  summary: {
    title: 'Workday summary',
    totalWorked: 'Total worked',
    dailyGoal: 'Daily goal',
    balance: 'Daily balance',
    remaining: 'Time remaining to goal',
    projectedEnd: 'Projected end time',
    status: 'Status',
    statusMet: 'Goal met',
    statusPending: 'Goal pending',
    statusExceeded: 'Overtime',
    incomplete: 'Fill in all four valid times to see the full summary.',
    notAvailable: '—',
  },
  notification: {
    incomplete: {
      title: 'Incomplete workday',
      message: 'Complete the work schedule to view your results.',
    },
    close: {
      title: 'Almost there',
      message:
        'You are close to completing your workday. You have {remaining} minutes remaining to reach 8 hours.',
    },
    completed: {
      title: 'Workday completed',
      message: 'Workday completed! You have reached your daily target of 8 hours.',
    },
    exceeded: {
      title: 'Workday exceeded',
      message:
        'Daily target reached. You worked {excess} minutes beyond the expected 8 hours.',
    },
    below: {
      title: 'Goal pending',
      message:
        'You have worked {total}. You still need {remaining} to complete your workday.',
    },
  },
  adjustment: {
    title: 'Adjust times to complete 8 hours',
    description:
      'Choose which time you want to adjust. We will calculate the value needed to complete exactly 8 working hours while keeping the other three times unchanged.',
    optionsLabel: 'Field to adjust',
    adjustStart: 'Adjust workday start',
    adjustLunchOut: 'Adjust lunch break start',
    adjustLunchIn: 'Adjust lunch break return',
    adjustEnd: 'Adjust workday end',
    previewTitle: 'Adjustment preview',
    currentTime: 'Current time',
    suggestedTime: 'Suggested time',
    difference: 'Difference',
    totalAfter: 'Total after adjustment',
    goalConfirmation: 'The daily target will be exactly 8 hours.',
    differenceEarlier: '{minutes} minutes earlier',
    differenceLater: '{minutes} minutes later',
    differenceNone: 'No change',
    apply: 'Apply adjustment',
    cancel: 'Cancel',
    unavailable: 'Fill in all four valid times to use smart adjustment.',
    invalidSuggestion:
      'This time cannot be adjusted while keeping the other three entries unchanged. Choose another field or review the entered times.',
    incompleteHint: 'Select a time field to preview the adjustment.',
  },
};
