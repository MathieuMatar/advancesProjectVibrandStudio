/**
 * useApp.ts
 * 
 * Main application state hook for managing page navigation and global error state.
 */

// hooks/useApp.ts
import { useEffect, useState } from "react";
import Storage from "../utils/storage";

/**
 * useApp
 * 
 * Manages global application state including current page selection and error messages.
 * 
 * Features:
 * - Persists the last opened project to localStorage
 * - Keyboard shortcut: Ctrl+I opens Add Project page
 * - Global error state for displaying app-wide notifications
 * 
 * Returns an object with:
 * - currentPage: number - Current page/project ID (0=home, -1=add project, -2=change password, >0=project id)
 * - setCurrentPage(id): setter for current page
 * - globalError: string | null - Current error message
 * - setGlobalError(msg): setter for error message
 * 
 * @returns {Object} App state object
 * 
 * @example
 * const { currentPage, setCurrentPage, globalError, setGlobalError } = useApp();
 * 
 * // Navigate to a project
 * setCurrentPage(123);
 * 
 * // Show error
 * setGlobalError('Failed to load project');
 */
export function useApp() {
    const [currentPage, setCurrentPage] = useState(0);
    const [globalError, setGlobalError] = useState<string | null>(null);

    // Load last opened project
    useEffect(() => {
        const loadLatestProject = async () => {
            const storedPage = await Storage.getLatestProject();
            if (storedPage !== null) setCurrentPage(Number(storedPage));
        };
        loadLatestProject();
    }, []);

    // Save last opened project
    useEffect(() => {
        const saveLatestProject = async () => {
            if (currentPage > 0) {
                await Storage.addLatestProject(currentPage);
            }
        };
        saveLatestProject();
    }, [currentPage]);

    // Keyboard shortcut: Ctrl + I → AddProject
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key.toLowerCase() === "i") {
                event.preventDefault();
                setCurrentPage(-1);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return {
        currentPage,
        setCurrentPage,
        globalError,
        setGlobalError
    };
}
