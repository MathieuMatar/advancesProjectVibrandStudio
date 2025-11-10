import ContactServices from "../services/contactServices";

import { useState, useCallback } from "react";

const useContact = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const sendMail = useCallback(async (data: { name: string; email: string; title: string; message: string }) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await ContactServices.sendMail(data);
            if (response.success) {
                setSuccess(response.message);
            } else {
                setError("Failed to send message");
            }
        } catch (error) {
            setError("An error occurred");
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        success,
        sendMail
    };
};

export default useContact;
