/**
 * useHeader.ts
 * 
 * Hook for managing header state including project list and user information.
 */

// useHeader.ts
import { useEffect, useState } from 'react';
import { projectService } from '../services/projectService';

interface Project {
    client: any;
    id: string;
    name: string;
    code?: string;
}

/**
 * useHeader
 * 
 * Manages state for the application header component.
 * 
 * Fetches:
 * - All projects for navigation
 * - Current user from localStorage
 * 
 * Returns an object with:
 * - visible: boolean - Whether header is visible (can be toggled)
 * - setVisible: setter for visibility
 * - projects: Project[] - List of available projects
 * - user: any - Current logged-in user object
 * - error: string | null - Error message if fetch fails
 * - setError: setter for error state
 * 
 * @returns {Object} Header state object
 * 
 * @example
 * const { visible, setVisible, projects, user, error } = useHeader();
 */
export function useHeader() {
    const [visible, setVisible] = useState(true);
    const [projects, setProjects] = useState<Project[]>([]);
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setError(null);
        projectService.getAllProjects()
            .then(fetched => setProjects(fetched))
            .catch((err: any) => {
                let message = 'Error fetching projects';
                if (err?.message) message += `: ${err.message}`;
                setError(message);
            });
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser).user);
        }
    }, []);

    return {
        visible,
        setVisible,
        projects,
        user,
        error,
        setError,
    };
}
