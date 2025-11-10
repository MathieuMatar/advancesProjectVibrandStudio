import { useState, useCallback, useEffect } from 'react';
import LoginService from '../services/loginService';
import Storage from '../utils/storage';

/**
 * User shape returned by authentication.
 */
interface User {
    id: number;
    name: string;
    email: string;
}

/**
 * Internal login payload returned by the backend.
 */
interface LoginData {
    token: string;
    user: User;
}

/**
 * useLogin
 *
 * React hook that centralizes login/logout logic and exposes a small auth API.
 *
 * Returns an object with:
 * - user: User | null — currently authenticated user
 * - isAuth: boolean — shorthand for whether a user is present
 * - login(email, password): Promise<User> — performs login, persists token via Storage
 * - logout(): Promise<void> — clears stored credentials and local auth state
 * - loading: boolean — indicates login is in progress
 * - error: string | null — last login error message
 *
 * Side-effects:
 * - On mount it attempts to load existing credentials from `Storage.getUser()` and
 *   restores the `user` state if present.
 * - `login` uses `LoginService.login` and persists the returned data via `Storage.setUser`.
 *
 * Example:
 * const { user, login, logout, isAuth } = useLogin()
 * await login('me@example.com', 's3cret')
 */
export const useLogin = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Reactive auth state
    const isAuth = !!user;

    // Login function
    const login = useCallback(async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const loginData: LoginData = await LoginService.login(email, password);
            setUser(loginData.user);
            return loginData.user;
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.message || 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Logout function
    const logout = useCallback(async () => {
        await Storage.clearUser();
        setUser(null);
    }, []);

    // Load user if already stored
    useEffect(() => {
        const loadUser = async () => {
            const existing = await Storage.getUser();
            if (existing?.user) {
                setUser(existing.user);
            } else if (existing) {
                setUser(existing);
            }
        };
        loadUser();
    }, []);

    return { user, isAuth, login, logout, loading, error };
};
