// hooks/useContact.ts
import ContactServices from "../services/contactServices";

/**
 * Custom React hook for handling contact form and newsletter submissions.
 *
 * Provides two main handlers:
 * - `handleNewsletterSubmit`: Subscribes a user to the newsletter.
 * - `handleContactSubmit`: Sends a contact form message to the backend.
 *
 * Both handlers automatically prevent default form submission behavior
 * and include basic error handling with alerts and console logging.
 *
 * @returns {Object} An object containing the form submission handlers.
 * @property {function} handleNewsletterSubmit - Handles newsletter form submission.
 * @property {function} handleContactSubmit - Handles contact form submission.
 */
export function useContact() {

    /**
     * Handles newsletter subscription form submission.
     *
     * Extracts the email from the form input, calls
     * `ContactServices.joinNewsletter`, and provides user feedback.
     *
     * @async
     * @param {React.FormEvent<HTMLFormElement>} e - The form submit event.
     */
    const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
        const email = emailInput?.value;

        if (!email) {
            alert("Please enter a valid email.");
            return;
        }

        try {
            await ContactServices.joinNewsletter(email);
            alert("Thank you for subscribing to our newsletter!");
            emailInput.value = "";
        } catch (error) {
            alert("There was an error subscribing to the newsletter. Please try again later.");
            console.error("Error joining newsletter:", error);
        }
    };

    /**
     * Handles contact form submission.
     *
     * Extracts all input values from the form, converts checkbox values
     * into booleans, and calls `ContactServices.contactUs`.
     * Provides user feedback and resets the form on success.
     *
     * @async
     * @param {React.FormEvent<HTMLFormElement>} e - The form submit event.
     */
    const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const data = {
            name: formData.get('name') as string,
            company: formData.get('company') as string,
            country: formData.get('country') as string,
            phone: formData.get('phone') as string,
            email: formData.get('email') as string,
            companyType: formData.get('companyType') as string,
            message: formData.get('message') as string,
            communications: formData.get('consent') === 'on',
            policy: formData.get('privacy') === 'on',
            newsletter: formData.get('terms') === 'on',
        };

        try {
            await ContactServices.contactUs(data);
            alert("Your message has been sent successfully!");
            form.reset();
        } catch (error) {
            alert("There was an error sending your message. Please try again later.");
            console.error("Error sending contact request:", error);
        }
    };

    return {
        handleNewsletterSubmit,
        handleContactSubmit,
    };
}
