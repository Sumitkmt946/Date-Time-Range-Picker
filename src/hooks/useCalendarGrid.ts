import { useMemo } from 'react';
import type { DayCell, DateRangeState, DateRangeConstraints } from '../types';
import {
    getDaysInMonth,
    getFirstDayOfMonth,
    isSameDay,
    isToday,
    isDateInRange,
} from '../utils/dateUtils';
import { isDateSelectable } from '../utils/validationUtils';

interface UseCalendarGridProps {
    year: number;
    month: number;
    selectedRange: DateRangeState;
    constraints: DateRangeConstraints;
}

export function useCalendarGrid({
    year,
    month,
    selectedRange,
    constraints,
}: UseCalendarGridProps): DayCell[][] {
    return useMemo(() => {
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfWeek = getFirstDayOfMonth(year, month);

        const grid: DayCell[][] = [];
        let currentWeek: DayCell[] = [];

        const prevMonth = month === 0 ? 11 : month - 1;
        const prevMonthYear = month === 0 ? year - 1 : year;
        const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            const date = new Date(prevMonthYear, prevMonth, day);
            currentWeek.push(createDayCell(date, false, selectedRange, constraints));
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            currentWeek.push(createDayCell(date, true, selectedRange, constraints));

            if (currentWeek.length === 7) {
                grid.push(currentWeek);
                currentWeek = [];
            }
        }

        if (currentWeek.length > 0) {
            const nextMonth = month === 11 ? 0 : month + 1;
            const nextMonthYear = month === 11 ? year + 1 : year;
            let day = 1;

            while (currentWeek.length < 7) {
                const date = new Date(nextMonthYear, nextMonth, day);
                currentWeek.push(createDayCell(date, false, selectedRange, constraints));
                day++;
            }

            grid.push(currentWeek);
        }

        return grid;
    }, [year, month, selectedRange, constraints]);
}

function createDayCell(
    date: Date,
    isCurrentMonth: boolean,
    selectedRange: DateRangeState,
    constraints: DateRangeConstraints
): DayCell {
    const { start, end } = selectedRange;

    const isSelected = Boolean(
        (start && isSameDay(date, start)) || (end && isSameDay(date, end))
    );

    const isInRange =
        start && end && !isSameDay(start, end)
            ? isDateInRange(date, start, end) && !isSelected
            : false;

    const isDisabled = !isDateSelectable(date, constraints);

    const isBlackout =
        constraints.blackoutDates?.some((blackoutDate) => isSameDay(date, blackoutDate)) ?? false;

    return {
        date,
        isCurrentMonth,
        isToday: isToday(date),
        isSelected,
        isInRange,
        isDisabled,
        isBlackout,
    };
}
