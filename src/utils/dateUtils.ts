/**
 * Custom date manipulation utilities
 * No external libraries - all logic built from scratch
 */

/**
 * Get the number of days in a given month
 * Handles leap years correctly
 */
export function getDaysInMonth(year: number, month: number): number {
    // month is 0-indexed (0 = January, 11 = December)
    return new Date(year, month + 1, 0).getDate();
}

/**
 * Get the first day of the month (0 = Sunday, 6 = Saturday)
 */
export function getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
}

/**
 * Check if two dates are the same day (ignoring time)
 */
export function isSameDay(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

/**
 * Check if a date is between start and end (inclusive)
 */
export function isDateInRange(date: Date, start: Date, end: Date): boolean {
    const dateTime = date.getTime();
    const startTime = start.getTime();
    const endTime = end.getTime();
    return dateTime >= startTime && dateTime <= endTime;
}

/**
 * Add days to a date (returns new Date instance)
 */
export function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * Subtract days from a date (returns new Date instance)
 */
export function subtractDays(date: Date, days: number): Date {
    return addDays(date, -days);
}

/**
 * Get start of day (midnight)
 */
export function startOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
}

/**
 * Get end of day (23:59:59.999)
 */
export function endOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
}

/**
 * Get start of month
 */
export function startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
}

/**
 * Get end of month
 */
export function endOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

/**
 * Add months to a date
 */
export function addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}

/**
 * Check if a year is a leap year
 */
export function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Check if date is today
 */
export function isToday(date: Date): boolean {
    return isSameDay(date, new Date());
}

/**
 * Compare two dates (returns -1, 0, or 1)
 */
export function compareDate(date1: Date, date2: Date): number {
    const time1 = date1.getTime();
    const time2 = date2.getTime();
    if (time1 < time2) return -1;
    if (time1 > time2) return 1;
    return 0;
}

/**
 * Check if date1 is before date2
 */
export function isBefore(date1: Date, date2: Date): boolean {
    return date1.getTime() < date2.getTime();
}

/**
 * Check if date1 is after date2
 */
export function isAfter(date1: Date, date2: Date): boolean {
    return date1.getTime() > date2.getTime();
}

/**
 * Get duration between two dates in milliseconds
 */
export function getDuration(start: Date, end: Date): number {
    return Math.abs(end.getTime() - start.getTime());
}

/**
 * Format date as YYYY-MM-DD
 */
export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Format time as HH:MM
 */
export function formatTime(date: Date, format: '12h' | '24h' = '24h'): string {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    if (format === '12h') {
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${period}`;
    }

    return `${String(hours).padStart(2, '0')}:${minutes}`;
}

/**
 * Clone a date object
 */
export function cloneDate(date: Date): Date {
    return new Date(date.getTime());
}

/**
 * Set time on a date (returns new Date instance)
 */
export function setTime(date: Date, hours: number, minutes: number): Date {
    const result = cloneDate(date);
    result.setHours(hours, minutes, 0, 0);
    return result;
}

/**
 * Get week number of the year
 */
export function getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
