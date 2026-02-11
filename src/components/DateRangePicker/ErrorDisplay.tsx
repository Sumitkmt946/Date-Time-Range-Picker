/**
 * Error display component
 * Shows validation errors with ARIA live region
 */

import React from 'react';
import type { ValidationError } from '../../types';

interface ErrorDisplayProps {
    errors: ValidationError[];
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errors }) => {
    if (errors.length === 0) return null;

    return (
        <div
            className="error-display p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded"
            role="alert"
            aria-live="polite"
            aria-atomic="true"
        >
            <div className="flex items-start gap-2">
                <svg
                    className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                    />
                </svg>
                <div className="flex-1">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                        Validation Error{errors.length > 1 ? 's' : ''}
                    </h3>
                    <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                        {errors.map((error, index) => (
                            <li key={index}>{error.message}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
