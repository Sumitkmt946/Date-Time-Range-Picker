/**
 * TimePicker component - Custom hour/minute selector
 * Supports both 12h and 24h formats
 */

import React from 'react';
import type { TimeState, TimeFormat, TimePeriod } from '../../types';

interface TimePickerProps {
    value: TimeState;
    format: TimeFormat;
    onHourChange: (hour: number) => void;
    onMinuteChange: (minute: number) => void;
    onPeriodChange?: (period: TimePeriod) => void;
    disabled?: boolean;
}

export const TimePicker: React.FC<TimePickerProps> = ({
    value,
    format,
    onHourChange,
    onMinuteChange,
    onPeriodChange,
    disabled = false,
}) => {
    const maxHour = format === '12h' ? 12 : 23;
    const minHour = format === '12h' ? 1 : 0;

    const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onHourChange(parseInt(e.target.value, 10));
    };

    const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onMinuteChange(parseInt(e.target.value, 10));
    };

    const handlePeriodToggle = () => {
        if (onPeriodChange && value.period) {
            onPeriodChange(value.period === 'AM' ? 'PM' : 'AM');
        }
    };

    // Generate hour options
    const hourOptions = [];
    for (let i = minHour; i <= maxHour; i++) {
        hourOptions.push(i);
    }

    // Generate minute options (0-59)
    const minuteOptions = [];
    for (let i = 0; i < 60; i++) {
        minuteOptions.push(i);
    }

    return (
        <div className="time-picker flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-900 rounded">
            <div className="flex items-center gap-1">
                <label htmlFor="hour-select" className="sr-only">
                    Hour
                </label>
                <select
                    id="hour-select"
                    value={value.hour}
                    onChange={handleHourChange}
                    disabled={disabled}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    aria-label="Select hour"
                >
                    {hourOptions.map((hour) => (
                        <option key={hour} value={hour}>
                            {String(hour).padStart(2, '0')}
                        </option>
                    ))}
                </select>

                <span className="text-xl font-semibold">:</span>

                <label htmlFor="minute-select" className="sr-only">
                    Minute
                </label>
                <select
                    id="minute-select"
                    value={value.minute}
                    onChange={handleMinuteChange}
                    disabled={disabled}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    aria-label="Select minute"
                >
                    {minuteOptions.map((minute) => (
                        <option key={minute} value={minute}>
                            {String(minute).padStart(2, '0')}
                        </option>
                    ))}
                </select>
            </div>

            {format === '12h' && onPeriodChange && (
                <button
                    type="button"
                    onClick={handlePeriodToggle}
                    disabled={disabled}
                    className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={`Change to ${value.period === 'AM' ? 'PM' : 'AM'}`}
                >
                    {value.period}
                </button>
            )}
        </div>
    );
};
