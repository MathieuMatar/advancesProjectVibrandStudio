/**
 * Base URL of the GraphQL server.
 * @constant
 * @type {string}
 */
const API_BASE_URL = 'http://localhost:3000/graphql';

/**
 * Sends a GraphQL request to the configured API endpoint.
 *
 * This function wraps the native `fetch` API to provide:
 * - Automatic JSON serialization of query and variables
 * - Handling of HTTP errors (non-2xx responses)
 * - Handling of GraphQL errors returned in the response body
 * - Helpful network-error messaging
 *
 * @async
 * @function request
 *
 * @param {string} query - The GraphQL query or mutation string.
 * @param {Record<string, any>} [variables={}] - Optional variables for the GraphQL operation.
 *
 * @returns {Promise<any>} - Resolves with the `data` field from the GraphQL response.
 *
 * @throws {Error} Throws an error when:
 * - The HTTP response is not OK  
 * - The GraphQL response contains `errors`  
 * - A network or fetch-related issue occurs  
 *
 * @example
 * ```ts
 * const GET_USERS = `
 *   query GetUsers {
 *     users {
 *       id
 *       name
 *     }
 *   }
 * `;
 *
 * const users = await request(GET_USERS);
 * console.log(users);
 * ```
 */
async function request(query: string, variables = {}) {

    const body = {
        query,
        variables
    };


    try {
        // Make a POST request to the GraphQL endpoint
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        // Handle non-2xx HTTP responses
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('GraphQL error:', errorData);
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        // Parse JSON response
        const data = await response.json();

        // Handle GraphQL-level errors (returned in the response body)
        if (data.errors && data.errors.length) {
            console.error('GraphQL errors:', data.errors);
            throw new Error(
                data.errors.map((e: { message: string }) => e.message).join('\n') ||
                'Request failed'
            );
        }

        // Return only the "data" portion of the GraphQL response
        return data.data;
    }
    catch (err) {
        const error = err as any;

        // Handle common network or fetch-related errors
        if (
            error &&
            typeof error === 'object' &&
            error.name === 'TypeError' &&
            typeof error.message === 'string' &&
            error.message.includes('fetch')
        ) {
            throw new Error('Network error. Please check your connection.');
        }

        // Re-throw any other errors
        throw err;
    }
}

export default request;