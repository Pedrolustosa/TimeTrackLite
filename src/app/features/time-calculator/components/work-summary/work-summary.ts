import { Component, computed, inject, input } from '@angular/core';
import { LanguageService } from '../../../../i18n/language.service';
import { WorkCalculationResult, WorkStatus } from '../../models/work-calculation.model';
import { formatMinutesAsDuration } from '../../utils/time.utils';

@Component({
  selector: 'app-work-summary',
  imports: [],
  templateUrl: './work-summary.html',
})
export class WorkSummaryComponent {
  private readonly languageService = inject(LanguageService);

  readonly result = input.required<WorkCalculationResult>();

  protected readonly t = this.languageService.translations;

  protected readonly statusLabel = computed(() => {
    const status = this.result().status;
    if (!status) {
      return this.t().summary.notAvailable;
    }
    return this.statusText(status);
  });

  protected readonly statusClass = computed(() => {
    switch (this.result().status) {
      case 'met':
        return 'ui-chip-success';
      case 'exceeded':
        return 'ui-chip-warning';
      case 'pending':
        return 'ui-chip-info';
      default:
        return 'ui-chip-neutral';
    }
  });

  protected formatDuration(minutes: number | null): string {
    if (minutes === null) {
      return this.t().summary.notAvailable;
    }
    return formatMinutesAsDuration(minutes);
  }

  protected formatBalance(minutes: number | null): string {
    if (minutes === null) {
      return this.t().summary.notAvailable;
    }
    const sign = minutes > 0 ? '+' : minutes < 0 ? '-' : '';
    return `${sign}${formatMinutesAsDuration(minutes)}`;
  }

  protected formatClock(value: string | null): string {
    return value ?? this.t().summary.notAvailable;
  }

  private statusText(status: WorkStatus): string {
    const labels = this.t().summary;
    switch (status) {
      case 'met':
        return labels.statusMet;
      case 'pending':
        return labels.statusPending;
      case 'exceeded':
        return labels.statusExceeded;
    }
  }
}
