import { DAILY_GOAL_MINUTES } from './work-schedule.model';

/** Whether the daily goal was reached based on total worked minutes. */
export type WorkStatus = 'pending' | 'met' | 'exceeded';

/**
 * Structured outcome of a workday calculation.
 * Durations are always whole minutes to avoid floating-point drift.
 */
export interface WorkCalculationResult {
  morningMinutes: number | null;
  afternoonMinutes: number | null;
  totalMinutes: number | null;
  dailyGoalMinutes: typeof DAILY_GOAL_MINUTES;
  /** Positive = overtime; negative = shortfall; null when total is unavailable. */
  balanceMinutes: number | null;
  /** Minutes still needed to hit the goal; null when goal is met or exceeded. */
  remainingMinutes: number | null;
  /** Minutes beyond the goal; null when goal is not exceeded. */
  excessMinutes: number | null;
  /** Predicted clock-out (`HH:mm`) when morning + lunch return allow it. */
  projectedEndTime: string | null;
  status: WorkStatus | null;
  /** True when all four times are present and chronologically valid. */
  isComplete: boolean;
}

export function createEmptyCalculationResult(): WorkCalculationResult {
  return {
    morningMinutes: null,
    afternoonMinutes: null,
    totalMinutes: null,
    dailyGoalMinutes: DAILY_GOAL_MINUTES,
    balanceMinutes: null,
    remainingMinutes: null,
    excessMinutes: null,
    projectedEndTime: null,
    status: null,
    isComplete: false,
  };
}
