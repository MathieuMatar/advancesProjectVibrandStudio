import { useMilestones } from '../hooks/useMilestones';
import './milestones.css';

function Milestones({ milestones: initialMilestones, ProjectId }: { milestones: any[], ProjectId: number }) {
    const {
        milestones,
        edit,
        setEdit,
        handleChange,
        handleUpdate,
        handleDelete
    } = useMilestones(initialMilestones, ProjectId);

    return (
        <div className="project-milestones">


            {milestones.map((milestone) => (
                <div key={milestone.id}>
                    <span className='line'></span>
                    <span style={{ backgroundColor: "var(--coral)" }}></span>
                    <div>
                        {getDateString(milestone.dueDate)}
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
    );
}

function getDateString(timestamp: number) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'short' });
    const day = String(date.getDate()).padStart(2, '0');
    return (
        <div className="milestone-date">
            {month}
            <span>{day}</span>
            {year}
        </div>
    );
}

export { Milestones };