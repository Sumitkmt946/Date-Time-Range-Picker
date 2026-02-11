import { create } from '@storybook/theming';

export default create({
    base: 'light',
    brandTitle: 'Date Range Picker',
    brandUrl: 'https://github.com/Sumitkmt946/Date-Time-Range-Picker',
    brandTarget: '_self',

    // UI colors
    appBg: '#ffffff',
    appContentBg: '#ffffff',
    appBorderColor: '#e5e7eb',
    appBorderRadius: 8,

    // Typography
    fontBase: '"Inter", system-ui, -apple-system, sans-serif',
    fontCode: 'monospace',

    // Text colors
    textColor: '#1f2937',
    textInverseColor: '#ffffff',

    // Toolbar default and active colors
    barTextColor: '#6b7280',
    barSelectedColor: '#3b82f6',
    barBg: '#ffffff',

    // Form colors
    inputBg: '#ffffff',
    inputBorder: '#e5e7eb',
    inputTextColor: '#1f2937',
    inputBorderRadius: 4,
});
