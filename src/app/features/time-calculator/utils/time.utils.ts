const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/;

/** Parses `HH:mm` or `HH:mm:ss` into minutes from midnight. */
export function parseTimeToMinutes(value: string | null | undefined): number | null {
  if (!value) {
    return null;
  }

  const match = TIME_PATTERN.exec(value.trim());
  if (!match) {
    return null;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  return hours * 60 + minutes;
}

const MINUTES_PER_DAY = 24 * 60;

/** Formats minutes from midnight as `HH:mm`. Wraps across midnight when needed. */
export function formatMinutesToClock(totalMinutes: number): string {
  const normalized = ((totalMinutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  return `${pad2(hours)}:${pad2(minutes)}`;
}

/**
 * Formats minutes from midnight as `HH:mm` only when the value falls within
 * a single calendar day (`0`–`1439`). Returns null otherwise.
 */
export function formatMinutesToClockStrict(totalMinutes: number): string | null {
  if (!Number.isInteger(totalMinutes) || totalMinutes < 0 || totalMinutes >= MINUTES_PER_DAY) {
    return null;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${pad2(hours)}:${pad2(minutes)}`;
}

/** Formats a duration in minutes as `H:mm` (absolute value). */
export function formatMinutesAsDuration(totalMinutes: number): string {
  const absolute = Math.abs(totalMinutes);
  const hours = Math.floor(absolute / 60);
  const minutes = absolute % 60;
  return `${hours}:${pad2(minutes)}`;
}

/** Formats a duration as `6h45` (absolute value). */
export function formatMinutesAsCompactDuration(totalMinutes: number): string {
  const absolute = Math.abs(totalMinutes);
  const hours = Math.floor(absolute / 60);
  const minutes = absolute % 60;
  return `${hours}h${pad2(minutes)}`;
}

export function isValidTimeString(value: string | null | undefined): boolean {
  return parseTimeToMinutes(value) !== null;
}

function pad2(value: number): string {
  return value.toString().padStart(2, '0');
}
