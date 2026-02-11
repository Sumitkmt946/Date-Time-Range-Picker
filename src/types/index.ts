/**
 * Core TypeScript types for Date & Time Range Picker
 * All types use strict mode with no implicit any
 */

/**
 * Represents a date range with optional start and end dates
 */
export interface DateRangeState {
    start: Date | null;
    end: Date | null;
}

/**
 * Partial range where only start date is selected
 */
export interface PartialRange {
    start: Date;
    end: null;
}

/**
 * Complete range with both start and end dates
 */
export interface CompleteRange {
    start: Date;
    end: Date;
}

/**
 * IANA timezone identifier (e.g., 'America/New_York', 'Europe/London')
 */
export type TimeZone = string;

/**
 * Validation error with field and message
 */
export interface ValidationError {
    field: 'start' | 'end' | 'range' | 'duration';
    message: string;
}

/**
 * Constraints for date range selection
 */
export interface DateRangeConstraints {
    /** Minimum selectable date */
    minDate?: Date;
    /** Maximum selectable date */
    maxDate?: Date;
    /** Array of dates that cannot be selected */
    blackoutDates?: Date[];
    /** Maximum duration in milliseconds */
    maxDuration?: number;
}

/**
 * Time format options
 */
export type TimeFormat = '12h' | '24h';

/**
 * Time period for 12-hour format
 */
export type TimePeriod = 'AM' | 'PM';

/**
 * Time state for time picker
 */
export interface TimeState {
    hour: number;
    minute: number;
    period?: TimePeriod; // Only for 12h format
}

/**
 * Combined date and time
 */
export interface DateTimeState {
    date: Date;
    time: TimeState;
}

/**
 * Preset configuration for quick selection
 */
export interface PresetConfig {
    label: string;
    getValue: () => CompleteRange;
}

/**
 * Calendar view state
 */
export interface CalendarViewState {
    year: number;
    month: number; // 0-11 (JavaScript Date month)
}

/**
 * Day cell data for calendar grid
 */
export interface DayCell {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isInRange: boolean;
    isDisabled: boolean;
    isBlackout: boolean;
}

/**
 * Props for DateRangePicker component
 */
export interface DateRangePickerProps {
    /** Current selected range */
    value: DateRangeState;
    /** Callback when range changes */
    onChange: (range: DateRangeState) => void;
    /** Timezone for date calculations */
    timezone?: TimeZone;
    /** Time format (12h or 24h) */
    timeFormat?: TimeFormat;
    /** Constraints for validation */
    constraints?: DateRangeConstraints;
    /** Whether to show time picker */
    showTimePicker?: boolean;
    /** Whether to show preset buttons */
    showPresets?: boolean;
    /** Custom presets */
    presets?: PresetConfig[];
    /** Whether the picker is disabled */
    disabled?: boolean;
    /** Callback for validation errors */
    onError?: (errors: ValidationError[]) => void;
}
