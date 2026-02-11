/**
 * Calendar component - Monthly calendar grid with navigation
 * Handles date selection and keyboard navigation
 */

import React, { useState } from 'react';
import type { DateRangeState, DateRangeConstraints } from '../../types';
import { useCalendarGrid } from '../../hooks/useCalendarGrid';
import { CalendarCell } from './CalendarCell';
import { addMonths } from '../../utils/dateUtils';

interface CalendarProps {
    selectedRange: DateRangeState;
    onDateSelect: (date: Date) => void;
    constraints: DateRangeConstraints;
    onKeyboardNavigate: (event: React.KeyboardEvent, currentDate: Date) => void;
    focusedDate: Date | null;
}

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const Calendar: React.FC<CalendarProps> = ({
    selectedRange,
    onDateSelect,
    constraints,
    onKeyboardNavigate,
    focusedDate,
}) => {
    const today = new Date();
    const [viewDate, setViewDate] = useState<Date>(selectedRange.start || today);

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const grid = useCalendarGrid({
        year,
        month,
        selectedRange,
        constraints,
    });

    const handlePreviousMonth = () => {
        setViewDate(addMonths(viewDate, -1));
    };

    const handleNextMonth = () => {
        setViewDate(addMonths(viewDate, 1));
    };

    const handleToday = () => {
        setViewDate(new Date());
    };

    return (
        <div className="calendar-container p-4 bg-white dark:bg-gray-800 rounded-picker shadow-lg">
            {/* Header with navigation */}
            <div className="calendar-header flex items-center justify-between mb-4">
                <button
                    type="button"
                    onClick={handlePreviousMonth}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    aria-label="Previous month"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>

                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">
                        {MONTH_NAMES[month]} {year}
                    </h2>
                    <button
                        type="button"
                        onClick={handleToday}
                        className="px-3 py-1 text-sm bg-primary-100 hover:bg-primary-200 dark:bg-primary-900 dark:hover:bg-primary-800 rounded transition-colors"
                        aria-label="Go to today"
                    >
                        Today
                    </button>
                </div>

                <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    aria-label="Next month"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>

            {/* Weekday labels */}
            <div
                className="weekday-labels grid grid-cols-7 gap-1 mb-2"
                role="row"
            >
                {WEEKDAY_LABELS.map((label) => (
                    <div
                        key={label}
                        className="text-center text-xs font-medium text-gray-600 dark:text-gray-400 py-2"
                        role="columnheader"
                    >
                        {label}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div
                className="calendar-grid"
                role="grid"
                aria-label={`Calendar for ${MONTH_NAMES[month]} ${year}`}
            >
                {grid.map((week, weekIndex) => (
                    <div
                        key={weekIndex}
                        className="grid grid-cols-7 gap-1"
                        role="row"
                    >
                        {week.map((dayCell, dayIndex) => {
                            const isFocused =
                                focusedDate !== null &&
                                dayCell.date.getTime() === focusedDate.getTime();
                            const tabIndex = isFocused ? 0 : -1;

                            return (
                                <CalendarCell
                                    key={`${weekIndex}-${dayIndex}`}
                                    dayCell={dayCell}
                                    onClick={onDateSelect}
                                    onKeyDown={onKeyboardNavigate}
                                    isFocused={isFocused}
                                    tabIndex={tabIndex}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};
