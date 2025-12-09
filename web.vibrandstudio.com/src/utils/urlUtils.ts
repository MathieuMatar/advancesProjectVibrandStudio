/**
 * urlUtils.ts
 *
 * Centralized URL configuration and helper functions to eliminate hardcoded URLs
 * across components and services.
 */

/**
 * Base API URL - centralized for easy configuration
 * Update this single value when deploying to production or changing backend
 */
export const API_BASE_URL = 'http://localhost:3000';

/**
 * Get full image URL from relative path
 * @param imagePath - Relative path to image (e.g., '/avatar.jpg')
 * @returns Full URL for the image
 * @example
 * getImageUrl('/avatar.jpg') → 'http://localhost:3000/uploads/avatar.jpg'
 */
export function getImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    return `${API_BASE_URL}/uploads${imagePath}`;
}

/**
 * Get full API endpoint URL
 * @param endpoint - API endpoint path (e.g., '/api/projects')
 * @returns Full URL for the API endpoint
 * @example
 * getApiUrl('/api/projects') → 'http://localhost:3000/api/projects'
 */
export function getApiUrl(endpoint: string): string {
    return `${API_BASE_URL}${endpoint}`;
}
