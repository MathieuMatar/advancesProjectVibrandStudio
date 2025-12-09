/**
 * useProjectServices.ts
 * 
 * Hook for managing project services - fetches available services and handles adding services to projects.
 */

// useProjectServices.ts
import { useEffect, useState } from "react";
import { projectService } from "../services/projectService";

/**
 * useProjectServices
 * 
 * Manages the list of services associated with a project and available services that can be added.
 * 
 * Parameters:
 * - initialServices: any[] - Services already associated with the project
 * - projectId: number - The project ID to fetch services for
 * 
 * Returns an object with:
 * - currentServices: any[] - Services currently associated with the project
 * - otherServices: any[] - Available services not associated with the project
 * - addService(serviceId): async function to add a service to the project
 * - error: string | null - Error message if operation fails
 * - setError: setter for error state
 * 
 * @param {any[]} initialServices - Array of initially associated services
 * @param {number} projectId - The project ID
 * @returns {Object} Project services state object
 * 
 * @example
 * const { currentServices, otherServices, addService, error } = useProjectServices(project.services, projectId);
 * 
 * // Add a service to the project
 * await addService(serviceId);
 */
export function useProjectServices(initialServices: any[], projectId: number) {
    const [currentServices, setCurrentServices] = useState<any[]>(initialServices);
    const [otherServices, setOtherServices] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOtherServices = async () => {
            const allServices = await projectService.getServicesForProject();
            const projectServiceIds = initialServices.map(s => s.id);

            const available = allServices.filter(
                (service: { id: number }) => !projectServiceIds.includes(service.id)
            );

            setOtherServices(available);
        };
        fetchOtherServices();
    }, [initialServices]);

    const addService = async (serviceId: number) => {
        setError(null);
        try {
            const updatedProject = await projectService.addServiceToProject(projectId, serviceId);
            const newService = updatedProject.services.find(
                (s: any) => s.id === serviceId
            );
            if (newService) {
                setCurrentServices(prev => [...prev, newService]);
                setOtherServices(prev => prev.filter(s => s.id !== serviceId));
            }
        } catch (err: any) {
            let message = 'Error adding service to project';
            if (err?.message) message += `: ${err.message}`;
            setError(message);
        }
    };

    return {
        currentServices,
        otherServices,
        addService,
        error,
        setError,
    };
}
