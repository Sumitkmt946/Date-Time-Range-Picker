import type { Meta, StoryObj } from '@storybook/react';

const Documentation = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 font-sans">
        <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
                <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent inline-block">
                    Date & Time Range Picker
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    A purely custom, timezone-aware component built for precision and accessibility.
                    Zero external dependencies, 100% control.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <FeatureCard
                    title="Fully Custom Architecture"
                    desc="Built entirely from scratch using React 18+ and TypeScript. No bloat, no external UI libraries."
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
                />
                <FeatureCard
                    title="Timezone Intelligence"
                    desc="DST-safe timezone handling using native Intl.DateTimeFormat API. No moment.js or date-fns."
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                />
                <FeatureCard
                    title="WCAG 2.1 AA Accessible"
                    desc="Full ARIA support with grid roles, live regions, and screen reader optimizations."
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>}
                />
                <FeatureCard
                    title="Keyboard Mastery"
                    desc="Complete keyboard navigation support including Home, End, PageUp, and PageDown keys."
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>}
                />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Quick Integration</h3>
                    <span className="text-xs font-mono bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded">TypeScript</span>
                </div>
                <div className="p-6 overflow-x-auto">
                    <pre className="font-mono text-sm text-gray-800 dark:text-gray-300 leading-relaxed">{`import { DateRangePicker } from './components/DateRangePicker';
import { useState } from 'react';

function App() {
  const [range, setRange] = useState({ start: null, end: null });
  
  return (
    <DateRangePicker 
      value={range} 
      onChange={setRange} 
      showTimePicker 
      timezone="America/New_York"
    />
  );
}`}</pre>
                </div>
            </div>

            <footer className="mt-16 text-center text-sm text-gray-500 font-medium">
                Built for Advanced Agentic Coding Assignment • 2026
            </footer>
        </div>
    </div>
);

const FeatureCard = ({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) => (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 group">
        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
    </div>
);

const meta: Meta<typeof Documentation> = {
    title: 'Introduction',
    component: Documentation,
    parameters: {
        layout: 'fullscreen',
        options: { showPanel: false },
    },
};

export default meta;
type Story = StoryObj<typeof Documentation>;

export const Overview: Story = {};
