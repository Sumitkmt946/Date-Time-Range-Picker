/**
 * Timezone selector component
 * Allows switching between common timezones
 */

import React from 'react';
import type { TimeZone } from '../../types';
import { COMMON_TIMEZONES, getTimezoneOffsetString } from '../../utils/timezoneUtils';

interface TimezoneSelectorProps {
    value: TimeZone;
    onChange: (timezone: TimeZone) => void;
    disabled?: boolean;
}

export const TimezoneSelector: React.FC<TimezoneSelectorProps> = ({
    value,
    onChange,
    disabled = false,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    const currentOffset = getTimezoneOffsetString(new Date(), value);

    return (
        <div className="timezone-selector p-4 border-t border-gray-200 dark:border-gray-700">
            <label htmlFor="timezone-select" className="block text-sm font-medium mb-2">
                Timezone
            </label>
            <div className="flex items-center gap-2">
                <select
                    id="timezone-select"
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    aria-label="Select timezone"
                >
                    {COMMON_TIMEZONES.map((tz) => (
                        <option key={tz.value} value={tz.value}>
                            {tz.label}
                        </option>
                    ))}
                </select>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                    {currentOffset}
                </span>
            </div>
        </div>
    );
};
