/**
 * dateUtils.ts
 *
 * Centralized date formatting and conversion utilities to eliminate duplication
 * across hooks, components, and services.
 */

/**
 * Convert HTML date input (YYYY-MM-DD) to ISO string
 * @param dateInput - Date string from HTML input (format: YYYY-MM-DD)
 * @returns ISO 8601 formatted string or empty string if invalid
 * @example
 * dateInputToISO('2025-12-01') → '2025-12-01T00:00:00.000Z'
 */
export function dateInputToISO(dateInput: string): string {
    if (!dateInput) return '';
    return new Date(dateInput).toISOString();
}

/**
 * Convert timestamp or date string to formatted date components for display
 * @param timestamp - Unix timestamp (ms) or ISO date string
 * @returns Object with formatted month, day, and year
 * @example
 * formatDateComponents(1701388800000) → { month: 'Dec', day: '01', year: '2025' }
 */
export function formatDateComponents(timestamp: number | string) {
    const date = new Date(timestamp);
    return {
        month: date.toLocaleString('default', { month: 'short' }),
        day: String(date.getDate()).padStart(2, '0'),
        year: date.getFullYear().toString()
    };
}

/**
 * Check if date string is valid
 * @param dateString - Date string to validate
 * @returns true if valid date, false otherwise
 * @example
 * isValidDate('2025-12-01') → true
 * isValidDate('invalid') → false
 */
export function isValidDate(dateString: string): boolean {
    return !isNaN(Date.parse(dateString));
}
