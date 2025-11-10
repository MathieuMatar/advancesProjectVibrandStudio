import { useState, useEffect, useCallback } from 'react';

import ClientServices from '../services/clientServices';

export type Client = {
    id: number;
    name: string;
    image: string;
};

const useClients = () => {
    const [clients, setClients] = useState<Client[]>([]);

    const fetchClients = useCallback(async () => {
        const data = await ClientServices.getAll();
        setClients(data);
    }, []);

    useEffect(() => {
        fetchClients();
    }, [fetchClients]);

    return { clients, fetchClients };
};

export default useClients;