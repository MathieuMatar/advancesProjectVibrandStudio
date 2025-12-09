import Storage from '../utils/storage';
import { getQuery, saveQuery, queueMutation, getQueuedMutations, clearQueuedMutations } from '../lib/offline-db';
import { getApiUrl } from './urlUtils';

/**
 * request.ts
 * 
 * Centralized GraphQL request handler with offline support.
 * - Supports caching for queries when offline
 * - Queues mutations for later sync when offline
 * - Handles authentication via JWT tokens stored in localStorage
 * - Automatically syncs queued mutations when connection is restored
 */

const API_BASE_URL = getApiUrl('/graphql');

/** Callback function to handle token expiration (401 responses). */
let onTokenExpired: (() => void) | null = null;

/**
 * Register a callback to be called when the authentication token expires (401 response).
 * 
 * @param {() => void} callback - Function to invoke when a 401 Unauthorized response is received.
 * @returns {void}
 * 
 * @example
 * setTokenExpiredCallback(() => {
 *   console.log('Token expired, redirecting to login...');
 *   window.location.href = '/login';
 * });
 */
export function setTokenExpiredCallback(callback: () => void) {
    onTokenExpired = callback;
}

/**
 * Sync queued offline mutations with the backend when connection is restored.
 * 
 * - Retrieves all queued mutations from IndexedDB
 * - Sends them to the backend in order
 * - Clears the queue upon successful sync
 * - Logs errors if any mutation fails
 * 
 * @async
 * @returns {Promise<void>}
 * 
 * @note This is called automatically when:
 *       - The window 'online' event fires
 *       - The module is loaded (to sync any mutations from a previous session)
 * 
 * @example
 * // Manually sync if needed:
 * await syncOfflineMutations();
 */
export async function syncOfflineMutations() {
    if (!navigator.onLine) return;

    const mutations = await getQueuedMutations();
    for (const m of mutations) {
        try {
            await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(m.token ? { Authorization: `Bearer ${m.token}` } : {}),
                },
                body: JSON.stringify({ query: m.query, variables: m.variables }),
            });
        } catch (err) {
            console.error('Failed to sync mutation', err);
            return; // stop if any fail
        }
    }
    await clearQueuedMutations();
}

// Automatically try to sync mutations when app goes online
window.addEventListener('online', syncOfflineMutations);
syncOfflineMutations();

/**
 * Sends a GraphQL request to the backend server with offline support.
 * 
 * Behavior:
 * - Queries: Cached when online, returns cache when offline, throws if no cache available
 * - Mutations: Sent when online, queued when offline for later sync
 * - Handles 401 responses by clearing user and invoking onTokenExpired callback
 * 
 * @async
 * @param {string} query - GraphQL query or mutation string (e.g., "query { projects { id name } }")
 * @param {Record<string, any>} variables - GraphQL variables object (default: {})
 * @returns {Promise<any>} The data returned by the GraphQL response
 * @throws {Error} Throws if the request fails and no cache is available for queries
 * 
 * @example
 * // Execute a query
 * const projects = await request('query { projects { id name } }');
 * 
 * // Execute a mutation with variables
 * const result = await request(
 *   'mutation Login($input: LoginInput!) { login(input: $input) { token } }',
 *   { input: { email: 'user@example.com', password: 'pass123' } }
 * );
 */
async function request(query: string, variables: Record<string, any> = {}) {
    const token = await Storage.getToken();
    const key = JSON.stringify({ query, variables });
    const isOnline = navigator.onLine;
    const isQuery = query.trim().startsWith('query');
    const isMutation = query.trim().startsWith('mutation');

    async function fetchGraphQL() {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ query, variables }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            if (response.status === 401) {
                await Storage.clearUser();
                if (onTokenExpired) onTokenExpired();
                throw new Error('Session expired. Please login again.');
            }
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.errors && data.errors.length) {
            throw new Error(data.errors.map((e: any) => e.message).join('\n'));
        }

        return data.data;
    }

    try {
        if (isQuery) {
            if (isOnline) {
                try {
                    const data = await fetchGraphQL();
                    await saveQuery(key, data);
                    return data;
                } catch {
                    const cached = await getQuery(key);
                    if (cached) return cached;
                    throw new Error('Network error and no cached data available.');
                }
            } else {
                const cached = await getQuery(key);
                if (cached) return cached;
                throw new Error('Offline and no cached data available.');
            }
        }

        if (isMutation) {
            if (isOnline) {
                return await fetchGraphQL();
            } else {
                await queueMutation({ query, variables, token });
                return { offlineQueued: true };
            }
        }

        // Fallback for unknown operation types
        return await fetchGraphQL();
    } catch (err) {
        const error = err as any;
        if (
            error &&
            typeof error === 'object' &&
            error.name === 'TypeError' &&
            typeof error.message === 'string' &&
            error.message.includes('fetch')
        ) {
            throw new Error('Network error. Please check your connection.');
        }
        throw err;
    }
}

export default request;
