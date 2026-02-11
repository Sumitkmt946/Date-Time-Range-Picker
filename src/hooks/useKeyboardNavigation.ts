/**
 * Custom hook for keyboard navigation in the calendar
 * Handles arrow keys, Enter, Space, Tab, Esc, Home, End, PageUp, PageDown
 */

import { useState, useCallback } from 'react';
import { addDays, addMonths } from '../utils/dateUtils';

interface UseKeyboardNavigationProps {
    onDateSelect: (date: Date) => void;
    onClose?: () => void;
}

export function useKeyboardNavigation({
    onDateSelect,
    onClose,
}: UseKeyboardNavigationProps) {
    const [focusedDate, setFocusedDate] = useState<Date | null>(new Date());

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent, currentDate: Date) => {
            let newFocusedDate: Date | null = null;

            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    newFocusedDate = addDays(currentDate, -1);
                    break;

                case 'ArrowRight':
                    event.preventDefault();
                    newFocusedDate = addDays(currentDate, 1);
                    break;

                case 'ArrowUp':
                    event.preventDefault();
                    newFocusedDate = addDays(currentDate, -7);
                    break;

                case 'ArrowDown':
                    event.preventDefault();
                    newFocusedDate = addDays(currentDate, 7);
                    break;

                case 'Home':
                    event.preventDefault();
                    // Go to start of week (Sunday)
                    const dayOfWeek = currentDate.getDay();
                    newFocusedDate = addDays(currentDate, -dayOfWeek);
                    break;

                case 'End':
                    event.preventDefault();
                    // Go to end of week (Saturday)
                    const currentDayOfWeek = currentDate.getDay();
                    newFocusedDate = addDays(currentDate, 6 - currentDayOfWeek);
                    break;

                case 'PageUp':
                    event.preventDefault();
                    // Go to previous month
                    newFocusedDate = addMonths(currentDate, -1);
                    break;

                case 'PageDown':
                    event.preventDefault();
                    // Go to next month
                    newFocusedDate = addMonths(currentDate, 1);
                    break;

                case 'Enter':
                case ' ':
                    event.preventDefault();
                    onDateSelect(currentDate);
                    break;

                case 'Escape':
                    event.preventDefault();
                    if (onClose) {
                        onClose();
                    }
                    break;

                default:
                    return;
            }

            if (newFocusedDate) {
                setFocusedDate(newFocusedDate);
            }
        },
        [onDateSelect, onClose]
    );

    return {
        focusedDate,
        setFocusedDate,
        handleKeyDown,
    };
}
