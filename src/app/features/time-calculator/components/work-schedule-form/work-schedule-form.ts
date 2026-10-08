import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LanguageService } from '../../../../i18n/language.service';
import {
  WorkScheduleField,
  WorkScheduleFormValue,
} from '../../models/work-schedule.model';
import {
  WorkScheduleValidationErrorKey,
  workScheduleOrderValidator,
} from '../../validators/work-schedule.validators';

@Component({
  selector: 'app-work-schedule-form',
  imports: [ReactiveFormsModule],
  templateUrl: './work-schedule-form.html',
})
export class WorkScheduleFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly languageService = inject(LanguageService);

  readonly scheduleChange = output<WorkScheduleFormValue>();

  protected readonly t = this.languageService.translations;

  protected readonly form = this.formBuilder.nonNullable.group(
    {
      start: ['', Validators.required],
      lunchOut: ['', Validators.required],
      lunchIn: ['', Validators.required],
      end: ['', Validators.required],
    },
    { validators: [workScheduleOrderValidator()] },
  );

  protected readonly fields: ReadonlyArray<{
    name: WorkScheduleField;
    labelKey: WorkScheduleField;
  }> = [
    { name: 'start', labelKey: 'start' },
    { name: 'lunchOut', labelKey: 'lunchOut' },
    { name: 'lunchIn', labelKey: 'lunchIn' },
    { name: 'end', labelKey: 'end' },
  ];

  ngOnInit(): void {
    this.emitState();

    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.emitState());
  }

  /** Applies a confirmed smart-adjustment value to a single field. */
  patchField(field: WorkScheduleField, value: string): void {
    this.form.controls[field].setValue(value);
    this.form.controls[field].markAsDirty();
    this.form.controls[field].markAsTouched();
  }

  protected fieldLabel(field: WorkScheduleField): string {
    return this.t().form[field];
  }

  protected hasOrderError(): boolean {
    return !!this.form.errors && this.form.dirty;
  }

  protected orderErrors(): WorkScheduleValidationErrorKey[] {
    const errors = this.form.errors;
    if (!errors) {
      return [];
    }

    const keys: WorkScheduleValidationErrorKey[] = [];
    if (errors['lunchOutBeforeStart']) {
      keys.push('lunchOutBeforeStart');
    }
    if (errors['lunchInBeforeLunchOut']) {
      keys.push('lunchInBeforeLunchOut');
    }
    if (errors['endBeforeLunchIn']) {
      keys.push('endBeforeLunchIn');
    }
    if (keys.length === 0 && errors['negativePeriod']) {
      keys.push('negativePeriod');
    }
    return keys;
  }

  protected errorMessage(key: WorkScheduleValidationErrorKey): string {
    return this.t().form.errors[key];
  }

  private emitState(): void {
    const raw = this.form.getRawValue();
    this.scheduleChange.emit({
      start: raw.start || null,
      lunchOut: raw.lunchOut || null,
      lunchIn: raw.lunchIn || null,
      end: raw.end || null,
    });
  }
}
