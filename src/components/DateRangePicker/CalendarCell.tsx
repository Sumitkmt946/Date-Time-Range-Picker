/**
 * CalendarCell component - Individual date cell in the calendar grid
 * Handles visual states and keyboard/mouse interactions
 */

import React from 'react';
import type { DayCell } from '../../types';

interface CalendarCellProps {
    dayCell: DayCell;
    onClick: (date: Date) => void;
    onKeyDown: (event: React.KeyboardEvent, date: Date) => void;
    isFocused: boolean;
    tabIndex: number;
}

export const CalendarCell: React.FC<CalendarCellProps> = ({
    dayCell,
    onClick,
    onKeyDown,
    isFocused,
    tabIndex,
}) => {
    const { date, isCurrentMonth, isToday, isSelected, isInRange, isDisabled, isBlackout } =
        dayCell;

    const handleClick = () => {
        if (!isDisabled) {
            onClick(date);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        onKeyDown(event, date);
    };

    // Build CSS classes based on state
    const cellClasses = [
        'date-cell',
        'w-10 h-10 flex items-center justify-center rounded transition-colors text-sm',
        !isCurrentMonth && 'text-gray-400',
        isCurrentMonth && !isDisabled && 'text-gray-900 dark:text-gray-100',
        isToday && !isSelected && 'font-bold border-2 border-primary-500',
        isSelected && 'bg-primary-500 text-white font-semibold',
        isInRange && !isSelected && 'bg-range-light',
        isDisabled && 'opacity-50 cursor-not-allowed',
        !isDisabled && !isSelected && 'hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer',
        isBlackout && 'line-through',
        isFocused && 'ring-2 ring-primary-500 ring-offset-2',
    ]
        .filter(Boolean)
        .join(' ');

    // ARIA attributes for accessibility
    const ariaLabel = `${date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })}${isToday ? ', today' : ''}${isSelected ? ', selected' : ''}${isDisabled ? ', unavailable' : ''
        }`;

    return (
        <button
            type="button"
            className={cellClasses}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            disabled={isDisabled}
            tabIndex={tabIndex}
            role="gridcell"
            aria-label={ariaLabel}
            aria-selected={isSelected}
            aria-disabled={isDisabled}
        >
            {date.getDate()}
        </button>
    );
};
