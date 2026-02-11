/**
 * Custom hook for managing time state
 * Handles 12h/24h format conversion and time validation
 */

import { useState, useCallback } from 'react';
import type { TimeState, TimeFormat, TimePeriod } from '../types';

interface UseTimeStateProps {
    initialTime?: TimeState;
    format: TimeFormat;
}

export function useTimeState({ initialTime, format }: UseTimeStateProps) {
    const [timeState, setTimeState] = useState<TimeState>(
        initialTime || {
            hour: format === '12h' ? 12 : 0,
            minute: 0,
            period: format === '12h' ? 'AM' : undefined,
        }
    );

    const setHour = useCallback(
        (hour: number) => {
            const maxHour = format === '12h' ? 12 : 23;
            const minHour = format === '12h' ? 1 : 0;

            if (hour < minHour || hour > maxHour) return;

            setTimeState((prev) => ({ ...prev, hour }));
        },
        [format]
    );

    const setMinute = useCallback((minute: number) => {
        if (minute < 0 || minute > 59) return;
        setTimeState((prev) => ({ ...prev, minute }));
    }, []);

    const setPeriod = useCallback((period: TimePeriod) => {
        setTimeState((prev) => ({ ...prev, period }));
    }, []);

    const to24Hour = useCallback((time: TimeState): number => {
        if (format === '24h') return time.hour;

        let hour = time.hour;
        if (time.period === 'PM' && hour !== 12) {
            hour += 12;
        } else if (time.period === 'AM' && hour === 12) {
            hour = 0;
        }
        return hour;
    }, [format]);

    const combineDateTime = useCallback(
        (date: Date, time: TimeState): Date => {
            const result = new Date(date);
            const hour24 = to24Hour(time);
            result.setHours(hour24, time.minute, 0, 0);
            return result;
        },
        [to24Hour]
    );

    return {
        timeState,
        setHour,
        setMinute,
        setPeriod,
        combineDateTime,
    };
}
