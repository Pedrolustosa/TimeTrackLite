/** Visual notification states derived from the calculated workday total. */
export type WorkdayNotificationKind =
  | 'incomplete'
  | 'below'
  | 'close'
  | 'completed'
  | 'exceeded';

/** Threshold (minutes) under which a shortfall is treated as "close to goal". */
export const NEAR_GOAL_THRESHOLD_MINUTES = 30;

export interface WorkdayNotificationState {
  kind: WorkdayNotificationKind;
  totalMinutes: number | null;
  remainingMinutes: number | null;
  excessMinutes: number | null;
}

export function createIncompleteNotification(): WorkdayNotificationState {
  return {
    kind: 'incomplete',
    totalMinutes: null,
    remainingMinutes: null,
    excessMinutes: null,
  };
}
