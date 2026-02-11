import { useState } from 'react';
import { DateRangePicker } from './components/DateRangePicker';
import type { DateRangeState } from './types';
import './index.css';

function App() {
  const [selectedRange, setSelectedRange] = useState<DateRangeState>({
    start: null,
    end: null,
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Date & Time Range Picker
        </h1>

        <DateRangePicker
          value={selectedRange}
          onChange={setSelectedRange}
          showTimePicker
          timeFormat="12h"
        />

        {selectedRange.start && (
          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="font-semibold mb-2 text-gray-900 dark:text-white">
              Selected Range:
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Start:</strong> {selectedRange.start.toLocaleString()}
            </p>
            {selectedRange.end && (
              <p className="text-gray-700 dark:text-gray-300">
                <strong>End:</strong> {selectedRange.end.toLocaleString()}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
