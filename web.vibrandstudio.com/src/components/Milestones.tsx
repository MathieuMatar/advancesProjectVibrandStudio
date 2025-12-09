/**
 * Milestones.tsx
 * 
 * Component for displaying and managing project milestones.
 */

import { useMilestones } from '../hooks/useMilestones';
import { ErrorNotification } from './ErrorNotification';
import { formatDateComponents } from '../utils/dateUtils';
import './milestones.css';

/**
 * Milestones
 * 
 * Displays a timeline view of project milestones with create/edit/delete functionality.
 * 
 * Features:
 * - Visual timeline display of milestones
 * - Create new milestones via form
 * - Edit existing milestone details (name, description, due date, status)
 * - Delete milestones
 * - Format dates for display
 * - Error notifications for failed operations
 * 
 * Props:
 * - milestones: any[] - Initial array of milestone objects
 * - ProjectId: number - The project ID (used when creating new milestones)
 * 
 * @component
 * @param {Object} props - Component props
 * @param {any[]} props.milestones - Array of milestone objects with id, name, description, dueDate, status
 * @param {number} props.ProjectId - The project ID for context
 * @returns {JSX.Element} The milestones timeline component
 * 
 * @example
 * <Milestones 
 *   milestones={project.milestones} 
 *   ProjectId={project.id} 
 * />
 */
function Milestones({ milestones: initialMilestones, ProjectId }: { milestones: any[], ProjectId: number }) {
    const {
        milestones,
        edit,
        setEdit,
        handleChange,
        handleUpdate,
        handleDelete,
        error,
        setError
    } = useMilestones(initialMilestones, ProjectId);

    return (
        <>
            <ErrorNotification error={error} onClose={() => setError(null)} />
            <div className="project-milestones">


            {milestones.map((milestone) => (
                <div key={milestone.id}>
                    <span className='line'></span>
                    <span style={{ backgroundColor: "var(--coral)" }}></span>
                    <div>
                        {(() => {
                            const { month, day, year } = formatDateComponents(milestone.dueDate);
                            return (
                                <div className="milestone-date">
                                    {month}
                                    <span>{day}</span>
                                    {year}
                                </div>
                            );
                        })()}
                        <div>
                            <h3>{milestone.name}<span>{milestone.status}</span></h3>
                            {milestone.description}
                        </div>
                        <span className='more'>
                            <div className='more-options'>
                                <a onClick={() => handleDelete(milestone.id)}>Delete</a>
                                <a onClick={() => setEdit(milestone)}>Edit</a>
                            </div>
                        </span>
                    </div>
                </div>
            ))}

            <div className='add' onClick={() => setEdit({ id: null, name: '', description: '', dueDate: '', status: 'Upcoming' })}>Add New Milestone</div>

            {edit && (
                <form onSubmit={handleUpdate} className="milestone-form">
                    <input
                        name="dueDate"
                        value={edit.dueDate}
                        type='date'
                        onChange={handleChange}
                    />
                    <input
                        name="name"
                        value={edit.name}
                        type="text"
                        onChange={handleChange}
                    />
                    <input
                        name="description"
                        value={edit.description}
                        type="text"
                        onChange={handleChange}
                    />
                    <select name="status" value={edit.status} onChange={handleChange}>
                        <option>Upcoming</option>
                        <option>Pending</option>
                        <option>InProgress</option>
                        <option>Completed</option>
                    </select>
                    <button type="submit">Update</button>
                    <button type="button" onClick={() => setEdit(null)} />
                </form>
            )}
        </div>
        </>
    );
}

export { Milestones };