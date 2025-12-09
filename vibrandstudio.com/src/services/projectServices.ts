import request from "../utils/request";

interface Client {
    id: number;
    name: string;
}

interface Project {
    id: number;
    name: string;
    description?: string;
    image?: string;
    client?: Client;
    status?: string;
}

/**
 * Service class for fetching project-related data.
 *
 * Wraps GraphQL queries to retrieve project lists
 * with their associated client and metadata.
 */
class ProjectServices {

    /**
     * Fetches all projects with related client information.
     *
     * @async
     * @returns {Promise<Project[]>} Array of project objects.
     *
     * @example
     * ```ts
     * const projects = await ProjectServices.getAll();
     * console.log(projects);
     * ```
     */
    static async getAll() {
        const query = `
            query {
                projects {
                    id
                    name
                    description
                    image
                    client { id name }
                    status
                }
            }
        `;
        const data = await request(query);
        return data.projects as Project[];
    }
}

export default ProjectServices;
