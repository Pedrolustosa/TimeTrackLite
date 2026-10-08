import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { parseTimeToMinutes } from '../utils/time.utils';

export type WorkScheduleValidationErrorKey =
  | 'lunchOutBeforeStart'
  | 'lunchInBeforeLunchOut'
  | 'endBeforeLunchIn'
  | 'negativePeriod';

/**
 * Form-group validator that enforces chronological order among filled times.
 * Empty fields are ignored so partial schedules remain usable for projections.
 */
export function workScheduleOrderValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const start = parseTimeToMinutes(control.get('start')?.value);
    const lunchOut = parseTimeToMinutes(control.get('lunchOut')?.value);
    const lunchIn = parseTimeToMinutes(control.get('lunchIn')?.value);
    const end = parseTimeToMinutes(control.get('end')?.value);

    const errors: Partial<Record<WorkScheduleValidationErrorKey, true>> = {};

    if (start !== null && lunchOut !== null && lunchOut <= start) {
      errors.lunchOutBeforeStart = true;
      errors.negativePeriod = true;
    }

    if (lunchOut !== null && lunchIn !== null && lunchIn < lunchOut) {
      errors.lunchInBeforeLunchOut = true;
    }

    if (lunchIn !== null && end !== null && end <= lunchIn) {
      errors.endBeforeLunchIn = true;
      errors.negativePeriod = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };
}
