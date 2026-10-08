import { Component, computed, inject, input } from '@angular/core';
import { interpolate } from '../../../../i18n/interpolate';
import { LanguageService } from '../../../../i18n/language.service';
import { WorkdayNotificationState } from '../../models/workday-notification.model';
import { formatMinutesAsCompactDuration } from '../../utils/time.utils';

@Component({
  selector: 'app-workday-status-notification',
  imports: [],
  templateUrl: './workday-status-notification.html',
})
export class WorkdayStatusNotificationComponent {
  private readonly languageService = inject(LanguageService);

  readonly notification = input.required<WorkdayNotificationState>();

  protected readonly t = this.languageService.translations;

  protected readonly title = computed(() => {
    const kind = this.notification().kind;
    return this.t().notification[kind].title;
  });

  protected readonly message = computed(() => {
    const state = this.notification();
    const catalog = this.t().notification[state.kind];

    switch (state.kind) {
      case 'close':
        return interpolate(catalog.message, {
          remaining: state.remainingMinutes ?? 0,
        });
      case 'exceeded':
        return interpolate(catalog.message, {
          excess: state.excessMinutes ?? 0,
        });
      case 'below':
        return interpolate(catalog.message, {
          total: formatMinutesAsCompactDuration(state.totalMinutes ?? 0),
          remaining: formatMinutesAsCompactDuration(state.remainingMinutes ?? 0),
        });
      default:
        return catalog.message;
    }
  });

  protected readonly toneClass = computed(() => {
    switch (this.notification().kind) {
      case 'completed':
        return 'ui-notice-success';
      case 'close':
        return 'ui-notice-warning';
      case 'exceeded':
        return 'ui-notice-danger';
      case 'below':
        return 'ui-notice-info';
      default:
        return 'ui-notice-neutral';
    }
  });
}
