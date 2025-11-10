import request from '../utils/request';
import Storage from '../utils/storage';

/**
 * LoginService
 *
 * Wrapper around GraphQL login mutation and local storage persistence.
 * All methods return plain JS objects received from the GraphQL API.
 *
 * Contract:
 * - login(email, password): Promise<{ token: string, user: { id, name, email } }>
 * - Throws when the API response is missing expected fields.
 */
class LoginService {
    /**
     * Authenticate a user.
     *
     * Inputs:
     * - email: user's email
     * - password: user's password
     *
     * Output: Promise resolving to an object with `token` and `user`.
     * Side-effects: persists login data via `Storage.setUser`.
     *
     * Errors: throws Error('Invalid login response') when response is malformed.
     *
     * Example:
     * const data = await LoginService.login('me@example.com', 's3cret')
     * console.log(data.token, data.user.id)
     */
    static async login(email: string, password: string) {
        const query = `mutation Login($input: LoginInput!) { login(input: $input) { token user { id name email } } }`
        const result = await request(query, { input: { email, password } })
        const loginData = result?.login
        if (!loginData || !loginData.token || !loginData.user) {
            throw new Error('Invalid login response')
        }
        await Storage.setUser(loginData)

        return loginData
    }
}

export default LoginService;
