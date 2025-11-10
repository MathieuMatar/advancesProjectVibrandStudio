/**
 * A utility class for managing user authentication data in both memory and `localStorage`.
 *
 * This class provides simple, asynchronous methods to store, retrieve, and clear
 * user data and authentication tokens. It caches user data in memory for faster access
 * and falls back to `localStorage` if the cache is empty.
 *
 * @example
 * ```ts
 * import Storage from '../utils/storage';
 *
 * // Save user data
 * await Storage.setUser({ id: 1, name: 'Alice', token: 'abc123' });
 *
 * // Retrieve user data
 * const user = await Storage.getUser();
 * console.log(user?.name); // "Alice"
 *
 * // Get only the token
 * const token = await Storage.getToken();
 * console.log(token); // "abc123"
 *
 * // Clear stored user data
 * await Storage.clearUser();
 * ```
 */
class Storage {
    /** Cached user object in memory (avoids repeated JSON parsing). */
    private static _user: any | null = null;

    /**
     * Stores the user data in both memory and `localStorage`.
     *
     * @async
     * @param {any} user - The user object to store (should include at least a `token` property if authentication is used).
     * @returns {Promise<void>}
     *
     * @example
     * ```ts
     * await Storage.setUser({ id: 42, name: 'Eve', token: 'xyz789' });
     * ```
     */
    static async setUser(user: any): Promise<void> {
        // Save to memory
        this._user = user;
        // Persist to localStorage
        localStorage.setItem('user', JSON.stringify(user));
    }

    /**
     * Retrieves the stored user data.
     *
     * - Returns the in-memory user if available.
     * - Otherwise, reads from `localStorage`.
     * - If invalid JSON is found, logs an error and returns `null`.
     *
     * @async
     * @returns {Promise<any | null>} The user object or `null` if not found.
     *
     * @example
     * ```ts
     * const user = await Storage.getUser();
     * if (user) console.log('User logged in:', user.name);
     * ```
     */
    static async getUser(): Promise<any | null> {
        // If user already cached, return it
        if (this._user) {
            return this._user;
        }

        // Otherwise, read from localStorage
        const stored = localStorage.getItem('user');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                this._user = parsed; // Cache for future use
                return parsed;
            } catch {
                console.error('Invalid user JSON in storage');
                return null;
            }
        }
        return null;
    }

    /**
     * Retrieves the user's authentication token (if available).
     *
     * @async
     * @returns {Promise<string | null>} The user's token string or `null` if unavailable.
     *
     * @example
     * ```ts
     * const token = await Storage.getToken();
     * if (token) console.log('User token:', token);
     * ```
     */
    static async getToken(): Promise<string | null> {
        const user = await this.getUser();
        return user?.token || null;
    }

    /**
     * Clears the user data from both memory and `localStorage`.
     *
     * @async
     * @returns {Promise<void>}
     *
     * @example
     * ```ts
     * await Storage.clearUser();
     * console.log('User logged out.');
     * ```
     */
    static async clearUser(): Promise<void> {
        this._user = null;
        localStorage.removeItem('user');
    }
}

export default Storage;
