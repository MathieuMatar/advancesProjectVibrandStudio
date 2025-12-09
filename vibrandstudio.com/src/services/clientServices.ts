import request from "../utils/request";

export type Client = {
    id: number;
    name: string;
    image: string;
    animation: string;
};

/**
 * Service class for performing operations related to Clients.
 *
 * Provides an abstraction layer for fetching client data
 * from a GraphQL API using the shared `request` utility.
 */
class ClientServices {

    /**
     * Fetches all clients from the GraphQL API.
     *
     * @async
     * @returns {Promise<Client[]>} A list of client objects.
     *
     * @example
     * ```ts
     * const clients = await ClientServices.getAll();
     * console.log(clients);
     * ```
     */
    static async getAll() {
        const query = `query { clients { id name image animation } }`;
        const data = await request(query);
        return data.clients as Client[];
    }
}

export default ClientServices;
