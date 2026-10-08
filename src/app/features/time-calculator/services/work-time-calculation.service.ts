import { Injectable } from '@angular/core';
import {
  createEmptyCalculationResult,
  WorkCalculationResult,
  WorkStatus,
} from '../models/work-calculation.model';
import { WorkTimeAdjustmentPreview } from '../models/work-time-adjustment.model';
import {
  createIncompleteNotification,
  NEAR_GOAL_THRESHOLD_MINUTES,
  WorkdayNotificationState,
} from '../models/workday-notification.model';
import {
  DAILY_GOAL_MINUTES,
  WorkScheduleField,
  WorkScheduleFormValue,
} from '../models/work-schedule.model';
import {
  formatMinutesToClock,
  formatMinutesToClockStrict,
  parseTimeToMinutes,
} from '../utils/time.utils';

interface ParsedSchedule {
  start: number;
  lunchOut: number;
  lunchIn: number;
  end: number;
}

@Injectable({ providedIn: 'root' })
export class WorkTimeCalculationService {
  /**
   * Computes morning/afternoon segments, totals, balance and projected end
   * using whole minutes. Does not depend on UI language or formatting.
   */
  calculate(schedule: WorkScheduleFormValue): WorkCalculationResult {
    const result = createEmptyCalculationResult();

    const start = parseTimeToMinutes(schedule.start);
    const lunchOut = parseTimeToMinutes(schedule.lunchOut);
    const lunchIn = parseTimeToMinutes(schedule.lunchIn);
    const end = parseTimeToMinutes(schedule.end);

    if (!this.isChronologicallyValid(start, lunchOut, lunchIn, end)) {
      return result;
    }

    if (start !== null && lunchOut !== null) {
      result.morningMinutes = lunchOut - start;
    }

    if (lunchIn !== null && end !== null) {
      result.afternoonMinutes = end - lunchIn;
    }

    if (result.morningMinutes !== null && result.afternoonMinutes !== null) {
      result.totalMinutes = result.morningMinutes + result.afternoonMinutes;
      result.balanceMinutes = result.totalMinutes - DAILY_GOAL_MINUTES;
      result.status = this.resolveStatus(result.balanceMinutes);
      result.remainingMinutes =
        result.balanceMinutes < 0 ? Math.abs(result.balanceMinutes) : null;
      result.excessMinutes =
        result.balanceMinutes > 0 ? result.balanceMinutes : null;
      result.isComplete = true;
    }

    result.projectedEndTime = this.resolveProjectedEnd(
      result.morningMinutes,
      lunchIn,
    );

    return result;
  }

  /** Maps a calculation result to the visual notification state. */
  resolveNotification(result: WorkCalculationResult): WorkdayNotificationState {
    if (!result.isComplete || result.totalMinutes === null) {
      return createIncompleteNotification();
    }

    const totalMinutes = result.totalMinutes;
    const remainingMinutes = result.remainingMinutes;
    const excessMinutes = result.excessMinutes;

    if (totalMinutes === DAILY_GOAL_MINUTES) {
      return {
        kind: 'completed',
        totalMinutes,
        remainingMinutes: null,
        excessMinutes: null,
      };
    }

    if (totalMinutes > DAILY_GOAL_MINUTES) {
      return {
        kind: 'exceeded',
        totalMinutes,
        remainingMinutes: null,
        excessMinutes: excessMinutes ?? totalMinutes - DAILY_GOAL_MINUTES,
      };
    }

    const remaining = remainingMinutes ?? DAILY_GOAL_MINUTES - totalMinutes;

    if (remaining <= NEAR_GOAL_THRESHOLD_MINUTES) {
      return {
        kind: 'close',
        totalMinutes,
        remainingMinutes: remaining,
        excessMinutes: null,
      };
    }

    return {
      kind: 'below',
      totalMinutes,
      remainingMinutes: remaining,
      excessMinutes: null,
    };
  }

  /**
   * Suggests a new value for `field` so the workday totals exactly 480 minutes,
   * keeping the other three times unchanged.
   */
  suggestAdjustment(
    schedule: WorkScheduleFormValue,
    field: WorkScheduleField,
  ): WorkTimeAdjustmentPreview | null {
    const parsed = this.parseCompleteSchedule(schedule);
    if (!parsed) {
      return null;
    }

    const currentTime = schedule[field];
    if (!currentTime) {
      return null;
    }

    const suggestedMinutes = this.computeSuggestedMinutes(parsed, field);
    const suggestedTime = formatMinutesToClockStrict(suggestedMinutes);

    if (suggestedTime === null) {
      return {
        field,
        currentTime,
        suggestedTime: null,
        differenceMinutes: null,
        totalAfterMinutes: null,
        isValid: false,
        meetsGoal: false,
      };
    }

    const adjusted: ParsedSchedule = { ...parsed, [field]: suggestedMinutes };
    const isChronological = this.isChronologicallyValid(
      adjusted.start,
      adjusted.lunchOut,
      adjusted.lunchIn,
      adjusted.end,
    );
    const totalAfter =
      adjusted.lunchOut -
      adjusted.start +
      (adjusted.end - adjusted.lunchIn);
    const meetsGoal = totalAfter === DAILY_GOAL_MINUTES;
    const currentMinutes = parsed[field];

    return {
      field,
      currentTime,
      suggestedTime,
      differenceMinutes: suggestedMinutes - currentMinutes,
      totalAfterMinutes: totalAfter,
      isValid: isChronological && meetsGoal,
      meetsGoal,
    };
  }

  private computeSuggestedMinutes(
    schedule: ParsedSchedule,
    field: WorkScheduleField,
  ): number {
    const { start: E, lunchOut: A, lunchIn: R, end: S } = schedule;
    const M = DAILY_GOAL_MINUTES;

    switch (field) {
      case 'start':
        return A + S - R - M;
      case 'lunchOut':
        return M + E + R - S;
      case 'lunchIn':
        return A - E + S - M;
      case 'end':
        return M - A + E + R;
    }
  }

  private parseCompleteSchedule(
    schedule: WorkScheduleFormValue,
  ): ParsedSchedule | null {
    const start = parseTimeToMinutes(schedule.start);
    const lunchOut = parseTimeToMinutes(schedule.lunchOut);
    const lunchIn = parseTimeToMinutes(schedule.lunchIn);
    const end = parseTimeToMinutes(schedule.end);

    if (
      start === null ||
      lunchOut === null ||
      lunchIn === null ||
      end === null
    ) {
      return null;
    }

    if (!this.isChronologicallyValid(start, lunchOut, lunchIn, end)) {
      return null;
    }

    return { start, lunchOut, lunchIn, end };
  }

  private resolveStatus(balanceMinutes: number): WorkStatus {
    if (balanceMinutes > 0) {
      return 'exceeded';
    }
    if (balanceMinutes < 0) {
      return 'pending';
    }
    return 'met';
  }

  /**
   * Projected clock-out requires morning segment + lunch return.
   * Unavailable when morning already meets/exceeds the daily goal.
   */
  private resolveProjectedEnd(
    morningMinutes: number | null,
    lunchIn: number | null,
  ): string | null {
    if (morningMinutes === null || lunchIn === null) {
      return null;
    }

    const remainingAfterMorning = DAILY_GOAL_MINUTES - morningMinutes;
    if (remainingAfterMorning < 0) {
      return null;
    }

    return formatMinutesToClock(lunchIn + remainingAfterMorning);
  }

  private isChronologicallyValid(
    start: number | null,
    lunchOut: number | null,
    lunchIn: number | null,
    end: number | null,
  ): boolean {
    if (start !== null && lunchOut !== null && lunchOut <= start) {
      return false;
    }
    if (lunchOut !== null && lunchIn !== null && lunchIn < lunchOut) {
      return false;
    }
    if (lunchIn !== null && end !== null && end <= lunchIn) {
      return false;
    }
    return true;
  }
}
