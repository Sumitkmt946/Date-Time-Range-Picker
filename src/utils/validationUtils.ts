/**
 * Validation utilities for date range constraints
 * Returns clear error messages, never silently corrects
 */

import type { DateRangeConstraints, ValidationError } from '../types';
import { isSameDay, isBefore, isAfter, getDuration } from './dateUtils';

/**
 * Validate if a date meets the minimum date constraint
 */
export function validateMinDate(date: Date, minDate: Date | undefined): ValidationError | null {
    if (!minDate) return null;

    if (isBefore(date, minDate)) {
        return {
            field: 'start',
            message: `Date cannot be before ${minDate.toLocaleDateString()}`,
        };
    }

    return null;
}

/**
 * Validate if a date meets the maximum date constraint
 */
export function validateMaxDate(date: Date, maxDate: Date | undefined): ValidationError | null {
    if (!maxDate) return null;

    if (isAfter(date, maxDate)) {
        return {
            field: 'end',
            message: `Date cannot be after ${maxDate.toLocaleDateString()}`,
        };
    }

    return null;
}

/**
 * Validate if a date is in the blackout dates list
 */
export function validateBlackoutDates(
    date: Date,
    blackoutDates: Date[] | undefined
): ValidationError | null {
    if (!blackoutDates || blackoutDates.length === 0) return null;

    const isBlackout = blackoutDates.some((blackoutDate) => isSameDay(date, blackoutDate));

    if (isBlackout) {
        return {
            field: 'start',
            message: `${date.toLocaleDateString()} is not available for selection`,
        };
    }

    return null;
}

/**
 * Validate if the duration between start and end meets the max duration constraint
 */
export function validateMaxDuration(
    start: Date,
    end: Date,
    maxDuration: number | undefined
): ValidationError | null {
    if (!maxDuration) return null;

    const duration = getDuration(start, end);

    if (duration > maxDuration) {
        const maxDays = Math.floor(maxDuration / (1000 * 60 * 60 * 24));
        return {
            field: 'duration',
            message: `Range duration cannot exceed ${maxDays} days`,
        };
    }

    return null;
}

/**
 * Validate a complete date range against all constraints
 */
export function validateDateRange(
    start: Date | null,
    end: Date | null,
    constraints: DateRangeConstraints
): ValidationError[] {
    const errors: ValidationError[] = [];

    // Validate start date
    if (start) {
        const minDateError = validateMinDate(start, constraints.minDate);
        if (minDateError) errors.push(minDateError);

        const maxDateError = validateMaxDate(start, constraints.maxDate);
        if (maxDateError) errors.push(maxDateError);

        const blackoutError = validateBlackoutDates(start, constraints.blackoutDates);
        if (blackoutError) errors.push(blackoutError);
    }

    // Validate end date
    if (end) {
        const minDateError = validateMinDate(end, constraints.minDate);
        if (minDateError) {
            errors.push({
                field: 'end',
                message: minDateError.message,
            });
        }

        const maxDateError = validateMaxDate(end, constraints.maxDate);
        if (maxDateError) errors.push(maxDateError);

        const blackoutError = validateBlackoutDates(end, constraints.blackoutDates);
        if (blackoutError) {
            errors.push({
                field: 'end',
                message: blackoutError.message,
            });
        }
    }

    // Validate range
    if (start && end) {
        // Ensure start is before end
        if (isAfter(start, end)) {
            errors.push({
                field: 'range',
                message: 'Start date must be before end date',
            });
        }

        // Validate duration
        const durationError = validateMaxDuration(start, end, constraints.maxDuration);
        if (durationError) errors.push(durationError);
    }

    return errors;
}

/**
 * Check if a date is selectable given the constraints
 */
export function isDateSelectable(date: Date, constraints: DateRangeConstraints): boolean {
    const minDateError = validateMinDate(date, constraints.minDate);
    const maxDateError = validateMaxDate(date, constraints.maxDate);
    const blackoutError = validateBlackoutDates(date, constraints.blackoutDates);

    return !minDateError && !maxDateError && !blackoutError;
}

/**
 * Get all dates in a range that are blackout dates
 */
export function getBlackoutDatesInRange(
    start: Date,
    end: Date,
    blackoutDates: Date[] | undefined
): Date[] {
    if (!blackoutDates || blackoutDates.length === 0) return [];

    return blackoutDates.filter((blackoutDate) => {
        const time = blackoutDate.getTime();
        return time >= start.getTime() && time <= end.getTime();
    });
}
