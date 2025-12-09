/**
 * ProjectServices.tsx
 * 
 * Component for displaying and managing project services/tools.
 */

import './projectServices.css';
import { ErrorNotification } from './ErrorNotification';
import { useProjectServices } from "../hooks/useProjectServices";

/**
 * ProjectServices
 * 
 * Displays services/tools associated with a project and allows adding new ones.
 * 
 * Features:
 * - Display current project services as tags
 * - Dropdown menu to add new services
 * - Error notifications for failed operations
 * 
 * Props:
 * - services: any[] - Current project services
 * - projectId: number - The project ID
 * 
 * @component
 * @param {Object} props - Component props
 * @param {any[]} props.services - Array of service objects with id and name
 * @param {number} props.projectId - The project ID
 * @returns {JSX.Element} The project services component
 * 
 * @example
 * <ProjectServices 
 *   services={project.services} 
 *   projectId={project.id} 
 * />
 */
function ProjectServices({ services, projectId }: { services: any[]; projectId: number }) {

    const {
        currentServices,
        otherServices,
        addService,
        error,
        setError
    } = useProjectServices(services, projectId);

    return (
        <>
            <ErrorNotification error={error} onClose={() => setError(null)} />
            <div className="project-services">
            {currentServices.map(service => (
                <span key={service.id}>{service.name}</span>
            ))}

            <select onChange={(e) => addService(Number(e.target.value))}>
                <option value="">Add a service...</option>
                {otherServices.map(service => (
                    <option key={service.id} value={service.id}>
                        {service.name}
                    </option>
                ))}
            </select>
        </div>
        </>
    );
}

export { ProjectServices };
