/** Daily work goal expressed in whole minutes (8 hours). */
export const DAILY_GOAL_MINUTES = 480;

/** User-entered clock times in `HH:mm` (from `<input type="time">`). */
export interface WorkSchedule {
  start: string;
  lunchOut: string;
  lunchIn: string;
  end: string;
}

export type WorkScheduleField = keyof WorkSchedule;

export type WorkScheduleFormValue = {
  [K in WorkScheduleField]: string | null;
};
