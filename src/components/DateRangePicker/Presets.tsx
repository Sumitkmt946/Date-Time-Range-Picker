/**
 * Preset buttons for quick date range selection
 * Follows rounding rules (start of day, end of day)
 */

import React from 'react';
import type { PresetConfig, CompleteRange } from '../../types';
import { startOfDay, endOfDay, subtractDays, startOfMonth, endOfMonth } from '../../utils/dateUtils';

interface PresetsProps {
    onSelect: (range: CompleteRange) => void;
    customPresets?: PresetConfig[];
}

// Default presets
const DEFAULT_PRESETS: PresetConfig[] = [
    {
        label: 'Today',
        getValue: () => {
            const now = new Date();
            return {
                start: startOfDay(now),
                end: endOfDay(now),
            };
        },
    },
    {
        label: 'Last 24 Hours',
        getValue: () => {
            const now = new Date();
            return {
                start: subtractDays(now, 1),
                end: now,
            };
        },
    },
    {
        label: 'Last 7 Days',
        getValue: () => {
            const now = new Date();
            return {
                start: startOfDay(subtractDays(now, 7)),
                end: now,
            };
        },
    },
    {
        label: 'This Month',
        getValue: () => {
            const now = new Date();
            return {
                start: startOfMonth(now),
                end: endOfMonth(now),
            };
        },
    },
];

export const Presets: React.FC<PresetsProps> = ({ onSelect, customPresets }) => {
    const presets = customPresets || DEFAULT_PRESETS;

    return (
        <div className="presets flex flex-wrap gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
            {presets.map((preset) => (
                <button
                    key={preset.label}
                    type="button"
                    onClick={() => onSelect(preset.getValue())}
                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded transition-colors"
                >
                    {preset.label}
                </button>
            ))}
        </div>
    );
};
