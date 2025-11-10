export type Client = {
    id: number;
    name: string;
    image: string;
};

class ClientServices {
    static async getAll(): Promise<Client[]> {
        const response = await fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
        query {
          clients {
            id
            name
            image
          }
        }
      `,
            }),
        });

        const result = await response.json();
        return result.data.clients;
    }
}

export default ClientServices;