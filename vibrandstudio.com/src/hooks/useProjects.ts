import { useState, useEffect, useCallback } from 'react';

import ProjectServices from '../services/projectServices';

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
}


const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    const fetchProjects = useCallback(async () => {
        const data = await ProjectServices.getAll();
        setProjects(data);
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return { projects, fetchProjects };
};

export default useProjects;