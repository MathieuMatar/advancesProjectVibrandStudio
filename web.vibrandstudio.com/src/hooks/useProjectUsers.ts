/**
 * useProjectUsers.ts
 * 
 * Hook for managing project users - fetches available users and handles adding users to projects.
 */

// useProjectUsers.ts
import { useEffect, useState } from "react";
import { projectService } from "../services/projectService";

/**
 * useProjectUsers
 * 
 * Manages the list of users assigned to a project and available users that can be added.
 * 
 * Parameters:
 * - initialUsers: any[] - Users already assigned to the project
 * - projectId: number - The project ID to fetch users for
 * 
 * Returns an object with:
 * - currentUsers: any[] - Users currently assigned to the project
 * - otherUsers: any[] - Available users not assigned to the project
 * - addUser(userId): async function to add a user to the project
 * - error: string | null - Error message if operation fails
 * - setError: setter for error state
 * 
 * @param {any[]} initialUsers - Array of initially assigned users
 * @param {number} projectId - The project ID
 * @returns {Object} Project users state object
 * 
 * @example
 * const { currentUsers, otherUsers, addUser, error } = useProjectUsers(project.users, projectId);
 * 
 * // Add a user to the project
 * await addUser(userId);
 */
export function useProjectUsers(initialUsers: any[], projectId: number) {
    const [currentUsers, setCurrentUsers] = useState<any[]>(initialUsers);
    const [otherUsers, setOtherUsers] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOtherUsers = async () => {
            const allUsers = await projectService.getUsersForProject(projectId);
            const currentIds = initialUsers.map(u => u.id);

            const available = allUsers.filter(
                (user: { id: number }) => !currentIds.includes(user.id)
            );

            setOtherUsers(available);
        };

        fetchOtherUsers();
    }, [initialUsers, projectId]);

    const addUser = async (userId: number) => {
        setError(null);
        try {
            const updatedProject = await projectService.addUserToProject(projectId, userId);
            const newUser = updatedProject.users.find(
                (u: any) => u.id === userId
            );
            if (newUser) {
                setCurrentUsers(prev => [...prev, newUser]);
                setOtherUsers(prev => prev.filter(user => user.id !== userId));
            }
        } catch (err: any) {
            let message = 'Error adding user to project';
            if (err?.message) message += `: ${err.message}`;
            setError(message);
        }
    };

    return {
        currentUsers,
        otherUsers,
        addUser,
        error,
        setError,
    };
}
