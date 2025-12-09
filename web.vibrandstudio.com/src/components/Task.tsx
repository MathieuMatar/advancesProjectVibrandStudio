/**
 * Task.tsx
 * 
 * Individual task component for displaying and editing task details.
 */

import './task.css';
import { useTask } from '../hooks/useTask';

/**
 * Props for the Task component
 */
interface TaskProps {
    task: any;
    setTask: (newTask: any) => void;
    users: { id: number; name: string }[];
    reorder: (direction: 'up' | 'down') => void;
    deleteTask: () => void;
    complete: () => void;
    id: number;
}

/**
 * Task
 * 
 * Individual task card component with inline editing capabilities.
 * 
 * Features:
 * - Inline editing of title, details, and due date
 * - Task assignment to project users
 * - Visibility level selection (Me, Person Assigned To, Team, Client, All)
 * - Mark task as complete/incomplete
 * - Reorder tasks up/down within the list
 * - Delete task
 * - Mark task as important (star icon)
 * 
 * Props:
 * - task: any - Task object with properties like title, details, dueDate, assignedToId, etc.
 * - setTask: Function to update the task object
 * - users: Array of users available for assignment
 * - reorder: Function to reorder task (direction: 'up' | 'down')
 * - deleteTask: Function to delete the task
 * - complete: Function to toggle task completion status
 * - id: number - Numeric task ID
 * 
 * @component
 * @param {TaskProps} props - Component props
 * @returns {JSX.Element} The task card component
 * 
 * @example
 * <Task 
 *   task={taskData}
 *   setTask={setTaskData}
 *   users={projectUsers}
 *   reorder={(dir) => handleReorder(taskId, dir)}
 *   deleteTask={() => handleDelete(taskId)}
 *   complete={() => handleComplete(taskId)}
 *   id={taskId}
 * />
 */
function Task({ task, setTask, users, reorder, deleteTask, complete, id }: TaskProps) {
    const { handleFocusIn, handleFocusOut, toggleImportant } = useTask(task, setTask, id);

    return (
        <div className={'task' + (task.completedById ? ' complete' : '')} style={{ order: task.order }} onFocus={handleFocusIn} onBlur={handleFocusOut}>
            <span className="up" onClick={() => reorder('up')} title="Move up" style={{ backgroundImage: `url(/up.svg)`, cursor: 'pointer' }}></span>
            <span className="down" onClick={() => reorder('down')} title="Move down" style={{ backgroundImage: `url(/down.svg)`, cursor: 'pointer' }}></span>
            <div onClick={complete} className="done"></div>
            <div className="task-text">
                <input placeholder="Title" className="title" aria-label="Title" value={task.title || ''} onChange={e => setTask({ ...task, title: e.target.value })} />
                <input placeholder="Details" className="details" aria-label="Details" value={task.details || ''} onChange={e => setTask({ ...task, details: e.target.value })} />
                <input type="date" value={task.dueDate ? task.dueDate.split('T')[0] : ''} className={task.dueDate ? "filled" : ""} onChange={e => setTask({ ...task, dueDate: new Date(e.target.value).toISOString() })} />
                <select name="assigned" value={task.assignedToId || ""} className={task.assignedToId ? "filled" : ""} onChange={e => setTask({ ...task, assignedToId: e.target.value ? Number(e.target.value) : null })}>
                    <option value="" disabled hidden>Assign to</option>
                    <option value="">None</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <select name="visibility" value={task.visibility || ""} className={task.visibility ? "filled" : ""} onChange={e => setTask({ ...task, visibility: Number(e.target.value) })}>
                    <option value="1">Me</option>
                    <option value="2">Person Assigned To</option>
                    <option value="3">Team</option>
                    <option value="4">Client</option>
                    <option value="5">All</option>
                </select>
            </div>
            <span className='delete' style={{ backgroundImage: `url(/delete.svg)` }} onClick={deleteTask}></span>
            <span onClick={toggleImportant} className={'star' + (task.important ? ' full' : '')}></span>
        </div>
    );
}

export { Task }