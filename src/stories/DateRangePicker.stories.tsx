/**
 * Storybook stories for DateRangePicker component
 * Demonstrates all features and edge cases
 */

import type { Meta, StoryObj } from '@storybook/react';
import { DateRangePicker } from '../components/DateRangePicker';
import { useState } from 'react';
import type { DateRangeState } from '../types';

const meta: Meta<typeof DateRangePicker> = {
    title: 'Components/DateRangePicker',
    component: DateRangePicker,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

// Wrapper component to handle state
function DateRangePickerWrapper(props: any) {
    const [value, setValue] = useState<DateRangeState>({ start: null, end: null });
    return <DateRangePicker {...props} value={value} onChange={setValue} />;
}

export const Default: Story = {
    render: () => <DateRangePickerWrapper />,
};

export const WithConstraints: Story = {
    render: () => {
        const today = new Date();
        const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
        const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);

        return (
            <DateRangePickerWrapper
                constraints={{
                    minDate,
                    maxDate,
                }}
            />
        );
    },
};

export const WithBlackoutDates: Story = {
    render: () => {
        const today = new Date();
        const blackoutDates = [
            new Date(today.getFullYear(), today.getMonth(), 15),
            new Date(today.getFullYear(), today.getMonth(), 20),
            new Date(today.getFullYear(), today.getMonth(), 25),
        ];

        return (
            <DateRangePickerWrapper
                constraints={{
                    blackoutDates,
                }}
            />
        );
    },
};

export const WithMaxDuration: Story = {
    render: () => {
        const maxDuration = 7 * 24 * 60 * 60 * 1000; // 7 days

        return (
            <DateRangePickerWrapper
                constraints={{
                    maxDuration,
                }}
            />
        );
    },
};

export const WithTimePicker: Story = {
    render: () => <DateRangePickerWrapper showTimePicker timeFormat="12h" />,
};

export const WithTimePicker24h: Story = {
    render: () => <DateRangePickerWrapper showTimePicker timeFormat="24h" />,
};

export const WithoutPresets: Story = {
    render: () => <DateRangePickerWrapper showPresets={false} />,
};

export const Disabled: Story = {
    render: () => <DateRangePickerWrapper disabled />,
};

export const DSTEdgeCase: Story = {
    render: () => {
        // March 10, 2024 - DST starts in US
        const [value, setValue] = useState<DateRangeState>({
            start: new Date(2024, 2, 9), // March 9
            end: new Date(2024, 2, 11), // March 11
        });

        return (
            <DateRangePicker
                value={value}
                onChange={setValue}
                showTimePicker
                timezone="America/New_York"
            />
        );
    },
};

export const ErrorState: Story = {
    render: () => {
        const today = new Date();
        const minDate = new Date(today.getFullYear(), today.getMonth(), 10);
        const [value, setValue] = useState<DateRangeState>({
            start: new Date(today.getFullYear(), today.getMonth(), 5), // Before minDate
            end: null,
        });

        return (
            <DateRangePicker
                value={value}
                onChange={setValue}
                constraints={{
                    minDate,
                }}
            />
        );
    },
};

export const KeyboardOnly: Story = {
    render: () => <DateRangePickerWrapper />,
    parameters: {
        docs: {
            description: {
                story: 'Try navigating with keyboard only: Arrow keys to move, Enter/Space to select, Tab to navigate between elements, Esc to close.',
            },
        },
    },
};
