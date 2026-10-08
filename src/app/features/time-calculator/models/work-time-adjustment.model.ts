import { WorkScheduleField } from './work-schedule.model';

/** Preview of adjusting one schedule field so the day totals exactly 480 minutes. */
export interface WorkTimeAdjustmentPreview {
  field: WorkScheduleField;
  currentTime: string;
  suggestedTime: string | null;
  /** Suggested minus current, in minutes (positive = later). */
  differenceMinutes: number | null;
  totalAfterMinutes: number | null;
  isValid: boolean;
  meetsGoal: boolean;
}

export const ADJUSTABLE_FIELDS: readonly WorkScheduleField[] = [
  'start',
  'lunchOut',
  'lunchIn',
  'end',
] as const;
