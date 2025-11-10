import './projectUsers.css';

import { projectService } from "../services/projectService";
import { useEffect, useState } from 'react';


function ProjectUsers({ users, projectId }: { users: any[]; projectId: number }) {

    const [currentUsers, setCurrentUsers] = useState<any[]>(users);
    const [otherUsers, setOtherUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchOtherUsers = async () => {
            const allUsers = await projectService.getUsersForProject(projectId);
            const projectUserIds = users.map(user => user.id);
            const filteredUsers = allUsers.filter((user: { id: any; }) => !projectUserIds.includes(user.id));
            setOtherUsers(filteredUsers);
        };

        fetchOtherUsers();
    }, [users]);

    const addUser = (userId: number) => async () => {
        try {
            const updatedProject = await projectService.addUserToProject(projectId, userId);
            console.log('Updated Project:', updatedProject);
            // Update the users list to include the newly added user
            const newUser = updatedProject.users.find((user: any) => user.id === userId);
            if (newUser) {
                setCurrentUsers([...currentUsers, newUser]);
                setOtherUsers(otherUsers.filter(user => user.id !== userId));
            }

        } catch (error) {
            console.error('Error adding user to project:', error);
        }
    }

    return (
        <div className="project-users">
            {currentUsers.map((user) => (
                <div key={user.id} className="project-user">
                    <img src={`http://localhost:3000/uploads${user.image}`} alt={user.name} />
                    <span>{user.name}</span>
                </div>
            ))}

            {otherUsers.map((user) => (
                <div key={user.id} className="add-user" title='add' onClick={addUser(user.id)}>
                    <img src={`http://localhost:3000/uploads${user.image}`} alt={user.name} />
                    <span>{`${user.name}  ➕`}</span>
                </div>
            ))}


        </div>
    );
}

export { ProjectUsers };
