import request from '../utils/request';

class ProjectService {
    /**
     * Fetch a list of all projects (lightweight fields).
     *
     * @returns array of projects with { id, code, name, client }
     */
    async getAllProjects() {
        const query = `query { projects { id code name client { id name image } } }`;
        const data = await request(query);
        return data.projects;
    }

    /**
     * Fetch a project by id with related data (users, milestones, tasks).
     * The method transforms the tasks array into a dictionary keyed by task id
     * and adds an `order` property set to the task id.
     *
     * @param id - project id
     * @returns project object or null if not found
     */
    async getProjectById(id: number) {
        const query = `
            query ($id: Int!) {
                project(id: $id) {
                    id
                    code
                    name
                    description
                    status
                    overview
                    files
                    public
                    client {
                        id
                        name
                    }
                    users {
                        id
                        name
                        image
                    }
                    milestones {
                        id
                        name
                        description
                        dueDate
                        status
                    }
                    tasks {
                        id
                        projectId
                        createdById
                        assignedToId
                        completedById
                        dueDate
                        title
                        details
                        important
                        visibility
                        createdAt
                        updatedAt
                    }
                    services { 
                        id 
                        name 
                    }
                }
            }
        `;
        const result = await request(query, { id });
        const project = result?.project;

        if (!project) return null;

        const tasks: Record<number, any> = {};

        for (const task of project.tasks) {
            tasks[task.id] = task;
            tasks[task.id].order = task.id;
        }

        project.tasks = tasks;

        return project;
    }

    /**
     * Add a user to a project.
     *
     * @param projectId - id of the project
     * @param userId - id of the user to add
     * @returns updated project fragment including users
     */
    async addUserToProject(projectId: number, userId: number) {
        const variables = {
            projectId,
            userId,
        };
        const query = `mutation AddUserToProject($projectId:Int!,$userId:Int!){ addUserToProject(projectId:$projectId,userId:$userId){ id name users { id name image } } }`;
        const data = await request(query, variables);
        return data.addUserToProject;
    }

    /**
     * Add a service to a project.
     *
     * @param projectId - id of the project
     * @param serviceId - id of the service to add
     * @returns updated project fragment including services
     */
    async addServiceToProject(projectId: number, serviceId: number) {
        const variables = {
            projectId,
            serviceId,
        };
        const query = `mutation AddServiceToProject($projectId:Int!,$serviceId:Int!){ addServiceToProject(projectId:$projectId,serviceId:$serviceId){ id name services { id name } } }`;
        const data = await request(query, variables);
        return data.addServiceToProject;
    }

    /**
     * Get users relevant to projects.
     *
     * NOTE: currently returns all users. After roles are added this should be
     * scoped to employees or assignable users.
     *
     * @param projectId - currently unused (kept for future compatibility)
     * @returns array of users { id, name, image }
     */
    async getUsersForProject(_projectId?: number) {
        // this function will now just return all users; adjust later to filter by role
        const query = `query { users { id name image } }`;
        const data = await request(query);
        return data.users;
    }

    async getServicesForProject() {
        const query = `query { services { id name } }`;
        const data = await request(query);
        return data.services;
    }

    /**
     * Update a project.
     *
     * @param id - project id
     * @param changes - partial object matching UpdateProjectInput
     * @returns updated project payload returned by backend
     */
    async updateProject(id: number, changes: any) {
        const variables = {
            id: id,
            input: changes,
        };
        const query = `mutation UpdateProject($id: Int!, $input: UpdateProjectInput!) { updateProject(id: $id, input: $input) { id
                    code
                    name
                    description
                    status
                    overview
                    files
                    public
                    client {
                        id
                        name
                    }
                    users {
                        id
                        name
                        image
                    }
                    milestones {
                        id
                        name
                        description
                        dueDate
                        status
                    }
                    services { id name }
                    tasks {
                        id
                        projectId
                        createdById
                        assignedToId
                        completedById
                        dueDate
                        title
                        details
                        important
                        visibility
                        createdAt
                        updatedAt
                    } } }`;
        const data = await request(query, variables);
        return data.update;
    }

    /**
     * 
     * @param data 
     * @returns created project id
     */

    async createProject(data: any) {
        const variables = {
            input: data,
        };
        const query = `mutation CreateProject($input: CreateProjectInput!) { createProject(input: $input) { id } }`;
        const result = await request(query, variables);
        return result.createProject;
    }


    /**
     * 
     * @returns all clients
     * used in the form to create a Project
     */
    async getAllClients() {
        const query = `query { clients { id name } }`;
        const data = await request(query);
        return data.clients;
    }
}

export const projectService = new ProjectService();

