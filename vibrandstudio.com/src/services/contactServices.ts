import request from "../utils/request";

interface ContactInput {
    name: string;
    company: string;
    country: string;
    phone: string;
    email: string;
    companyType: string;
    message: string;
    communications: boolean;
    policy: boolean;
    newsletter: boolean;
}

/**
 * Service class for contact-related operations.
 *
 * Handles newsletter subscriptions and contact form submissions
 * through GraphQL mutations.
 */
class ContactServices {

    /**
     * Adds a user to the newsletter subscription list.
     *
     * @async
     * @param {string} email - The email address to subscribe.
     * @returns {Promise<boolean>} Indicates whether the subscription was successful.
     *
     * @example
     * ```ts
     * const subscribed = await ContactServices.joinNewsletter("test@example.com");
     * ```
     */
    static async joinNewsletter(email: string) {
        const query = `
            mutation JoinNewsletter($email: String!) {
                joinNewsletter(email: $email)
            }
        `;
        const variables = { email };
        const data = await request(query, variables);
        return data.joinNewsletter;
    }

    /**
     * Sends a contact form submission to the backend.
     *
     * @async
     * @param {ContactInput} data - The full contact form payload.
     * @returns {Promise<boolean>} Indicates whether the message was submitted successfully.
     *
     * @example
     * ```ts
     * await ContactServices.contactUs({
     *   name: "John Doe",
     *   email: "john@example.com",
     *   message: "Hello!",
     *   company: "Example Inc",
     *   phone: "123456789",
     *   country: "USA",
     *   companyType: "Tech",
     *   communications: true,
     *   policy: true,
     *   newsletter: false
     * });
     * ```
     */
    static async contactUs(data: ContactInput) {
        const query = `
            mutation ContactUs($input: ContactInput!) {
                contactUs(input: $input)
            }
        `;
        const variables = { input: data };
        const response = await request(query, variables);
        return response.contactUs;
    }
}

export default ContactServices;
