/**
 * Timezone handling utilities using Intl.DateTimeFormat
 * DST-safe timezone conversions
 */

import type { TimeZone } from '../types';

/**
 * Convert a date to a specific timezone
 * Preserves the instant in time (doesn't shift the actual moment)
 */
export function convertToTimezone(date: Date, timezone: TimeZone): Date {
    // Get the date string in the target timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    const parts = formatter.formatToParts(date);
    const partsMap: Record<string, string> = {};

    for (const part of parts) {
        if (part.type !== 'literal') {
            partsMap[part.type] = part.value;
        }
    }

    // Create new date in the target timezone
    return new Date(
        `${partsMap['year']}-${partsMap['month']}-${partsMap['day']}T${partsMap['hour']}:${partsMap['minute']}:${partsMap['second']}`
    );
}

/**
 * Check if a date is in Daylight Saving Time for a given timezone
 */
export function isDST(date: Date, timezone: TimeZone): boolean {
    const jan = new Date(date.getFullYear(), 0, 1);
    const jul = new Date(date.getFullYear(), 6, 1);

    const janOffset = getTimezoneOffset(jan, timezone);
    const julOffset = getTimezoneOffset(jul, timezone);
    const currentOffset = getTimezoneOffset(date, timezone);

    // DST is in effect if current offset is different from standard time offset
    const stdOffset = Math.max(janOffset, julOffset);
    return currentOffset < stdOffset;
}

/**
 * Get timezone offset in minutes for a specific date and timezone
 */
export function getTimezoneOffset(date: Date, timezone: TimeZone): number {
    // Create formatter for the timezone
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));

    // Calculate offset in minutes
    return (utcDate.getTime() - tzDate.getTime()) / (1000 * 60);
}

/**
 * Preserve the instant when converting between timezones
 * This ensures the actual moment in time doesn't shift
 */
export function preserveInstant(date: Date, fromTz: TimeZone, toTz: TimeZone): Date {
    // Get the offset difference
    const fromOffset = getTimezoneOffset(date, fromTz);
    const toOffset = getTimezoneOffset(date, toTz);
    const offsetDiff = toOffset - fromOffset;

    // Adjust the date by the offset difference
    const result = new Date(date.getTime());
    result.setMinutes(result.getMinutes() + offsetDiff);

    return result;
}

/**
 * Get timezone abbreviation (e.g., 'EST', 'PDT')
 */
export function getTimezoneAbbreviation(date: Date, timezone: TimeZone): string {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        timeZoneName: 'short',
    });

    const parts = formatter.formatToParts(date);
    const timeZonePart = parts.find((part) => part.type === 'timeZoneName');

    return timeZonePart?.value ?? '';
}

/**
 * Get timezone offset string (e.g., '+05:30', '-08:00')
 */
export function getTimezoneOffsetString(date: Date, timezone: TimeZone): string {
    const offset = getTimezoneOffset(date, timezone);
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset <= 0 ? '+' : '-';

    return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

/**
 * Common timezone list for selector
 */
export const COMMON_TIMEZONES: Array<{ label: string; value: TimeZone }> = [
    { label: 'UTC', value: 'UTC' },
    { label: 'Eastern Time (US)', value: 'America/New_York' },
    { label: 'Central Time (US)', value: 'America/Chicago' },
    { label: 'Mountain Time (US)', value: 'America/Denver' },
    { label: 'Pacific Time (US)', value: 'America/Los_Angeles' },
    { label: 'Alaska Time', value: 'America/Anchorage' },
    { label: 'Hawaii Time', value: 'Pacific/Honolulu' },
    { label: 'London', value: 'Europe/London' },
    { label: 'Paris', value: 'Europe/Paris' },
    { label: 'Berlin', value: 'Europe/Berlin' },
    { label: 'Moscow', value: 'Europe/Moscow' },
    { label: 'Dubai', value: 'Asia/Dubai' },
    { label: 'Mumbai', value: 'Asia/Kolkata' },
    { label: 'Singapore', value: 'Asia/Singapore' },
    { label: 'Tokyo', value: 'Asia/Tokyo' },
    { label: 'Sydney', value: 'Australia/Sydney' },
    { label: 'Auckland', value: 'Pacific/Auckland' },
];

/**
 * Get user's current timezone
 */
export function getUserTimezone(): TimeZone {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Check if a timezone is valid
 */
export function isValidTimezone(timezone: string): boolean {
    try {
        Intl.DateTimeFormat('en-US', { timeZone: timezone });
        return true;
    } catch {
        return false;
    }
}
