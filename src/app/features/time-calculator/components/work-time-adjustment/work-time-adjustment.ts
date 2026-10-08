import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { interpolate } from '../../../../i18n/interpolate';
import { LanguageService } from '../../../../i18n/language.service';
import {
  ADJUSTABLE_FIELDS,
  WorkTimeAdjustmentPreview,
} from '../../models/work-time-adjustment.model';
import { WorkScheduleField, WorkScheduleFormValue } from '../../models/work-schedule.model';
import { WorkTimeCalculationService } from '../../services/work-time-calculation.service';
import { formatMinutesAsCompactDuration } from '../../utils/time.utils';

@Component({
  selector: 'app-work-time-adjustment',
  imports: [],
  templateUrl: './work-time-adjustment.html',
})
export class WorkTimeAdjustmentComponent {
  private readonly calculationService = inject(WorkTimeCalculationService);
  private readonly languageService = inject(LanguageService);

  readonly schedule = input.required<WorkScheduleFormValue>();
  readonly enabled = input(false);

  readonly applyAdjustment = output<WorkTimeAdjustmentPreview>();

  protected readonly t = this.languageService.translations;
  protected readonly fields = ADJUSTABLE_FIELDS;
  protected readonly selectedField = signal<WorkScheduleField | null>(null);

  protected readonly preview = computed(() => {
    const field = this.selectedField();
    if (!this.enabled() || !field) {
      return null;
    }
    return this.calculationService.suggestAdjustment(this.schedule(), field);
  });

  constructor() {
    effect(() => {
      if (!this.enabled()) {
        this.selectedField.set(null);
      }
    });
  }

  protected selectField(field: WorkScheduleField): void {
    if (!this.enabled()) {
      return;
    }
    this.selectedField.set(field);
  }

  protected cancel(): void {
    this.selectedField.set(null);
  }

  protected apply(): void {
    const preview = this.preview();
    if (!preview?.isValid || !preview.suggestedTime) {
      return;
    }
    this.applyAdjustment.emit(preview);
    this.selectedField.set(null);
  }

  protected optionLabel(field: WorkScheduleField): string {
    const labels = this.t().adjustment;
    switch (field) {
      case 'start':
        return labels.adjustStart;
      case 'lunchOut':
        return labels.adjustLunchOut;
      case 'lunchIn':
        return labels.adjustLunchIn;
      case 'end':
        return labels.adjustEnd;
    }
  }

  protected differenceLabel(preview: WorkTimeAdjustmentPreview): string {
    const diff = preview.differenceMinutes;
    if (diff === null || diff === 0) {
      return this.t().adjustment.differenceNone;
    }

    const minutes = Math.abs(diff);
    return interpolate(
      diff < 0
        ? this.t().adjustment.differenceEarlier
        : this.t().adjustment.differenceLater,
      { minutes },
    );
  }

  protected totalAfterLabel(preview: WorkTimeAdjustmentPreview): string {
    if (preview.totalAfterMinutes === null) {
      return this.t().summary.notAvailable;
    }
    return formatMinutesAsCompactDuration(preview.totalAfterMinutes);
  }
}
