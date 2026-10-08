import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { LanguageService } from '../../../../i18n/language.service';
import { LanguageSelectorComponent } from '../../../../shared/components/language-selector/language-selector';
import { ThemeToggleComponent } from '../../../../shared/components/theme-toggle/theme-toggle';
import { WorkTimeAdjustmentPreview } from '../../models/work-time-adjustment.model';
import { WorkScheduleFormValue } from '../../models/work-schedule.model';
import { WorkTimeCalculationService } from '../../services/work-time-calculation.service';
import { WorkScheduleFormComponent } from '../work-schedule-form/work-schedule-form';
import { WorkSummaryComponent } from '../work-summary/work-summary';
import { WorkTimeAdjustmentComponent } from '../work-time-adjustment/work-time-adjustment';
import { WorkdayStatusNotificationComponent } from '../workday-status-notification/workday-status-notification';

const EMPTY_SCHEDULE: WorkScheduleFormValue = {
  start: null,
  lunchOut: null,
  lunchIn: null,
  end: null,
};

@Component({
  selector: 'app-time-calculator-page',
  imports: [
    LanguageSelectorComponent,
    ThemeToggleComponent,
    WorkScheduleFormComponent,
    WorkSummaryComponent,
    WorkdayStatusNotificationComponent,
    WorkTimeAdjustmentComponent,
  ],
  templateUrl: './time-calculator-page.html',
})
export class TimeCalculatorPageComponent {
  private readonly calculationService = inject(WorkTimeCalculationService);
  private readonly languageService = inject(LanguageService);
  private readonly formRef = viewChild(WorkScheduleFormComponent);

  protected readonly t = this.languageService.translations;
  protected readonly schedule = signal<WorkScheduleFormValue>(EMPTY_SCHEDULE);

  protected readonly result = computed(() =>
    this.calculationService.calculate(this.schedule()),
  );

  protected readonly notification = computed(() =>
    this.calculationService.resolveNotification(this.result()),
  );

  protected readonly canAdjust = computed(() => this.result().isComplete);

  protected onScheduleChange(schedule: WorkScheduleFormValue): void {
    this.schedule.set(schedule);
  }

  protected onApplyAdjustment(preview: WorkTimeAdjustmentPreview): void {
    if (!preview.isValid || !preview.suggestedTime) {
      return;
    }

    this.formRef()?.patchField(preview.field, preview.suggestedTime);
  }
}
