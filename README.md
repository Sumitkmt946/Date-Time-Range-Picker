# Date & Time Range Picker

A fully custom, timezone-aware Date & Time Range Picker built from scratch with React 18+, TypeScript (strict mode), and Tailwind CSS.

**Zero external UI libraries or date picker dependencies.**

## ✨ Features

- ✅ **Fully Custom** - No MUI, Radix, Chakra, or any prebuilt component library
- ✅ **TypeScript Strict Mode** - Complete type safety with strict compiler flags
- ✅ **Timezone-Aware** - DST-safe timezone handling using `Intl.DateTimeFormat`
- ✅ **Full Keyboard Navigation** - Arrow keys, Enter, Space, Tab, Esc, Home, End, PageUp/PageDown
- ✅ **WCAG 2.1 AA Accessible** - ARIA grid roles, labels, and screen reader support
- ✅ **Constraint Validation** - Min/max dates, blackout dates, max duration
- ✅ **Preset Quick Selections** - Today, Last 24h, Last 7 Days, This Month
- ✅ **12h/24h Time Format** - Flexible time picker with AM/PM toggle
- ✅ **Dark Mode Support** - Automatic dark mode with `prefers-color-scheme`

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit http://localhost:5173/

### Storybook

```bash
npm run storybook
```

Visit http://localhost:6006/

### Build

```bash
npm run build
```

## 📖 Usage

### Basic Example

```typescript
import { useState } from 'react';
import { DateRangePicker } from './components/DateRangePicker';
import type { DateRangeState } from './types';

function App() {
  const [selectedRange, setSelectedRange] = useState<DateRangeState>({
    start: null,
    end: null,
  });

  return (
    <DateRangePicker
      value={selectedRange}
      onChange={setSelectedRange}
    />
  );
}
```

### With Time Picker

```typescript
<DateRangePicker
  value={selectedRange}
  onChange={setSelectedRange}
  showTimePicker
  timeFormat="12h"
/>
```

### With Constraints

```typescript
<DateRangePicker
  value={selectedRange}
  onChange={setSelectedRange}
  constraints={{
    minDate: new Date(2024, 0, 1),
    maxDate: new Date(2024, 11, 31),
    maxDuration: 30 * 24 * 60 * 60 * 1000, // 30 days
  }}
/>
```

## 🎨 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `DateRangeState` | **Required** | Current selected range |
| `onChange` | `(range: DateRangeState) => void` | **Required** | Callback when range changes |
| `timezone` | `TimeZone` | User's timezone | IANA timezone identifier |
| `timeFormat` | `'12h' \| '24h'` | `'24h'` | Time format |
| `constraints` | `DateRangeConstraints` | `{}` | Validation constraints |
| `showTimePicker` | `boolean` | `false` | Show time picker |
| `showPresets` | `boolean` | `true` | Show preset buttons |
| `disabled` | `boolean` | `false` | Disable the picker |

### Types

```typescript
interface DateRangeState {
  start: Date | null;
  end: Date | null;
}

interface DateRangeConstraints {
  minDate?: Date;
  maxDate?: Date;
  blackoutDates?: Date[];
  maxDuration?: number; // milliseconds
}
```

## ⌨️ Keyboard Navigation

| Key | Action |
|-----|--------|
| Arrow Keys | Navigate calendar grid |
| Enter / Space | Select focused date |
| Tab | Navigate between elements |
| Esc | Close picker |
| Home / End | Jump to week start/end |
| PageUp / PageDown | Navigate months |

## ♿ Accessibility

- **ARIA Grid** - Proper `role="grid"` with `gridcell` roles
- **ARIA Labels** - Descriptive labels on all interactive elements
- **Screen Reader Support** - Live regions for announcements
- **Focus Management** - Visible focus indicators
- **Keyboard-Only** - Complete functionality without mouse

## 🏗️ Architecture

### Project Structure

```
src/
├── components/DateRangePicker/
│   ├── index.tsx           # Main component
│   ├── Calendar.tsx        # Calendar grid
│   ├── CalendarCell.tsx    # Date cells
│   ├── TimePicker.tsx      # Time selector
│   ├── Presets.tsx         # Quick selections
│   ├── TimezoneSelector.tsx # Timezone dropdown
│   └── ErrorDisplay.tsx    # Validation errors
├── hooks/
│   ├── useCalendarGrid.ts      # Calendar logic
│   ├── useKeyboardNavigation.ts # Keyboard handling
│   └── useTimeState.ts         # Time state
├── utils/
│   ├── dateUtils.ts        # Date manipulation (custom)
│   ├── timezoneUtils.ts    # Timezone handling (Intl)
│   └── validationUtils.ts  # Validation
└── types/
    └── index.ts            # TypeScript types
```

### Custom Implementation

**All utilities built from scratch:**
- 50+ date manipulation functions
- DST-safe timezone conversions
- Comprehensive validation logic
- Zero external date libraries

## 🧪 Testing

```bash
npm test
```

Testing infrastructure ready with:
- Testing Library
- Vitest
- Playwright
- axe-core for accessibility

## 🚀 Deployment

### Deploying to Vercel (Recommended)

To deploy the **Storybook** (which showcases all components and documentation):

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com) and "Add New Project".
3. Import the repository.
4. **Configure Project Settings:**
   - **Framework Preset:** `Vite` (or `Other`)
   - **Build Command:** `npm run build-storybook`
   - **Output Directory:** `storybook-static`
5. Click **Deploy**.

This will give you a live URL for your Storybook documentation.

## 📦 Tech Stack

- **React** 19.2.0
- **TypeScript** 5.9.3 (strict mode)
- **Vite** 7.3.1
- **Tailwind CSS** 4.1.18
- **Storybook** 10.2.8
- **ESLint** + **Prettier**

## 🎯 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📝 License

MIT

---

**Built entirely from scratch** - No MUI, Radix, Chakra, date-fns, dayjs, moment, or any forbidden libraries.
