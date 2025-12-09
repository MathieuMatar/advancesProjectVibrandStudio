/**
 * ProjectUsers.tsx
 * 
 * Component for displaying and managing project team members.
 */

import './projectUsers.css';
import { ErrorNotification } from './ErrorNotification';
import { getImageUrl } from '../utils/urlUtils';
import { useProjectUsers } from "../hooks/useProjectUsers";

/**
 * ProjectUsers
 * 
 * Displays current project team members and provides interface to add new members.
 * 
 * Features:
 * - Display user avatars and names for current project members
 * - Show available users with "add" UI for easy addition
 * - Click to add users to the project
 * - Error notifications for failed operations
 * 
 * Props:
 * - users: any[] - Current project users
 * - projectId: number - The project ID
 * 
 * @component
 * @param {Object} props - Component props
 * @param {any[]} props.users - Array of user objects with id, name, image
 * @param {number} props.projectId - The project ID
 * @returns {JSX.Element} The project users display component
 * 
 * @example
 * <ProjectUsers 
 *   users={project.users} 
 *   projectId={project.id} 
 * />
 */
function ProjectUsers({ users, projectId }: { users: any[]; projectId: number }) {
    const {
        currentUsers,
        otherUsers,
        addUser,
        error,
        setError
    } = useProjectUsers(users, projectId);

    return (
        <>
            <ErrorNotification error={error} onClose={() => setError(null)} />
            <div className="project-users">
            
            {currentUsers.map(user => (
                <div key={user.id} className="project-user">
                    <img
                        src={getImageUrl(user.image)}
                        alt={user.name}
                    />
                    <span>{user.name}</span>
                </div>
            ))}

            {otherUsers.map(user => (
                <div
                    key={user.id}
                    className="add-user"
                    title="add"
                    onClick={() => addUser(user.id)}
                >
                    <img
                        src={getImageUrl(user.image)}
                        alt={user.name}
                    />
                    <span>{`${user.name} ➕`}</span>
                </div>
            ))}

        </div>
        </>
    );
}

export { ProjectUsers };
