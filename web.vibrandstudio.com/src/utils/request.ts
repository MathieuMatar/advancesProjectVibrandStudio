import Storage from '../utils/storage';

const API_BASE_URL = 'http://localhost:3000/graphql';

/**
 * Sends a GraphQL request to the backend server.
 *
 * This function wraps the `fetch` API to handle GraphQL requests in a standardized way.
 * It automatically includes an authorization token (if available) from local storage
 * and provides consistent error handling for HTTP and GraphQL errors.
 *
 * @async
 * @function request
 * @param {string} query - The GraphQL query or mutation string.
 * @param {Record<string, any>} [variables={}] - An optional object containing GraphQL variables.
 * @returns {Promise<any>} The `data` field from the GraphQL response.
 *
 * @throws {Error} Throws an error if:
 * - The HTTP response is not OK (`response.ok === false`)
 * - The GraphQL response contains one or more `errors`
 * - A network issue occurs (e.g., fetch fails)
 *
 * @example
 * ```ts
 * import request from './api/request';
 *
 * const QUERY = `
 *   query GetUser($id: ID!) {
 *     user(id: $id) {
 *       id
 *       name
 *       email
 *     }
 *   }
 * `;
 *
 * async function fetchUser(id: string) {
 *   try {
 *     const data = await request(QUERY, { id });
 *     console.log('User:', data.user);
 *   } catch (error) {
 *     console.error('Error fetching user:', error);
 *   }
 * }
 * ```
 */
async function request(query: string, variables = {}) {
    // Retrieve the user's authentication token from local storage
    const token = await Storage.getToken();

    const body = {
        query,
        variables
    };

    console.log('Request body:', body);

    try {
        // Make a POST request to the GraphQL endpoint
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
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
            throw new Error(data.errors.map((e: { message: string }) => e.message).join('\n') || 'Request failed');
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
