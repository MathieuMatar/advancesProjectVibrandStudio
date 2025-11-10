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

class ProjectServices {
    static async getAll(): Promise<Project[]> {
        const response = await fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
        query {
          projects {
            id
            name
            client {
              id
              name
            }
            status
            image
          }
        }
      `,
            }),
        });

        const result = await response.json();
        return result.data.projects;
    }
}

export default ProjectServices;