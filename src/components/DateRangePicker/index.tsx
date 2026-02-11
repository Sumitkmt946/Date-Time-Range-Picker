/**
 * Main DateRangePicker component
 * Orchestrates all sub-components and manages state
 */

import React, { useState, useEffect } from 'react';
import type { DateRangePickerProps, DateRangeState, ValidationError, CompleteRange } from '../../types';
import { Calendar } from './Calendar';
import { TimePicker } from './TimePicker';
import { Presets } from './Presets';
import { TimezoneSelector } from './TimezoneSelector';
import { ErrorDisplay } from './ErrorDisplay';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { useTimeState } from '../../hooks/useTimeState';
import { validateDateRange } from '../../utils/validationUtils';
import { getUserTimezone } from '../../utils/timezoneUtils';

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
    value,
    onChange,
    timezone = getUserTimezone(),
    timeFormat = '24h',
    constraints = {},
    showTimePicker = false,
    showPresets = true,
    presets,
    disabled = false,
    onError,
}) => {
    const [selectedRange, setSelectedRange] = useState<DateRangeState>(value);
    const [currentTimezone, setCurrentTimezone] = useState(timezone);
    const [errors, setErrors] = useState<ValidationError[]>([]);

    const { focusedDate, handleKeyDown } = useKeyboardNavigation({
        onDateSelect: handleDateSelect,
    });

    const startTimeState = useTimeState({
        format: timeFormat,
    });

    const endTimeState = useTimeState({
        format: timeFormat,
    });

    // Update date range when start time changes
    useEffect(() => {
        if (selectedRange.start && showTimePicker) {
            const { hour, minute } = startTimeState.timeState;
            const newStart = new Date(selectedRange.start);

            // Only update if time actually changed
            if (newStart.getHours() !== hour || newStart.getMinutes() !== minute) {
                newStart.setHours(hour, minute, 0, 0);
                const newRange = { ...selectedRange, start: newStart };
                onChange(newRange);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startTimeState.timeState.hour, startTimeState.timeState.minute, showTimePicker]);

    // Update date range when end time changes
    useEffect(() => {
        if (selectedRange.end && showTimePicker) {
            const { hour, minute } = endTimeState.timeState;
            const newEnd = new Date(selectedRange.end);

            // Only update if time actually changed
            if (newEnd.getHours() !== hour || newEnd.getMinutes() !== minute) {
                newEnd.setHours(hour, minute, 0, 0);
                const newRange = { ...selectedRange, end: newEnd };
                onChange(newRange);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endTimeState.timeState.hour, endTimeState.timeState.minute, showTimePicker]);

    // Validate range whenever it changes
    useEffect(() => {
        const validationErrors = validateDateRange(
            selectedRange.start,
            selectedRange.end,
            constraints
        );
        setErrors(validationErrors);

        if (onError) {
            onError(validationErrors);
        }
    }, [selectedRange, constraints, onError]);

    // Sync with external value changes
    useEffect(() => {
        setSelectedRange(value);
    }, [value]);

    function handleDateSelect(date: Date) {
        if (disabled) return;

        let newRange: DateRangeState;

        if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
            // Start new selection
            newRange = { start: date, end: null };
        } else {
            // Complete the range
            if (date < selectedRange.start) {
                newRange = { start: date, end: selectedRange.start };
            } else {
                newRange = { start: selectedRange.start, end: date };
            }
        }

        setSelectedRange(newRange);
        onChange(newRange);
    }

    function handlePresetSelect(range: CompleteRange) {
        if (disabled) return;

        const newRange: DateRangeState = {
            start: range.start,
            end: range.end,
        };

        setSelectedRange(newRange);
        onChange(newRange);
    }

    function handleTimezoneChange(newTimezone: string) {
        setCurrentTimezone(newTimezone);
    }

    return (
        <div
            className={`date-range-picker w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
            role="application"
            aria-label="Date and time range picker"
        >
            {errors.length > 0 && <ErrorDisplay errors={errors} />}

            <Calendar
                selectedRange={selectedRange}
                onDateSelect={handleDateSelect}
                constraints={constraints}
                onKeyboardNavigate={handleKeyDown}
                focusedDate={focusedDate}
            />

            {showTimePicker && selectedRange.start && (
                <div className="time-pickers p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Start Time</label>
                        <TimePicker
                            value={startTimeState.timeState}
                            format={timeFormat}
                            onHourChange={startTimeState.setHour}
                            onMinuteChange={startTimeState.setMinute}
                            onPeriodChange={startTimeState.setPeriod}
                            disabled={disabled}
                        />
                    </div>

                    {selectedRange.end && (
                        <div>
                            <label className="block text-sm font-medium mb-2">End Time</label>
                            <TimePicker
                                value={endTimeState.timeState}
                                format={timeFormat}
                                onHourChange={endTimeState.setHour}
                                onMinuteChange={endTimeState.setMinute}
                                onPeriodChange={endTimeState.setPeriod}
                                disabled={disabled}
                            />
                        </div>
                    )}
                </div>
            )}

            {showPresets && (
                <Presets onSelect={handlePresetSelect} customPresets={presets} />
            )}

            <TimezoneSelector
                value={currentTimezone}
                onChange={handleTimezoneChange}
                disabled={disabled}
            />
        </div>
    );
};

export default DateRangePicker;
