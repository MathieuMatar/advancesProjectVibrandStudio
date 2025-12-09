/**
 * Tasks.tsx
 * 
 * Component for displaying and managing tasks within a project.
 */

import { Task } from './Task';
import { ErrorNotification } from './ErrorNotification';
import './tasks.css';
import { useTasks, type TaskMap } from '../hooks/useTasks';

/**
 * Props for the Tasks component
 */
interface TasksProps {
    projectId?: number;
    projectUsers?: any[];
    projectTasks?: TaskMap;
    style?: React.CSSProperties;
    className?: string;
}

/**
 * Tasks
 * 
 * Displays a list of tasks for a project, organized into uncompleted and completed sections.
 * 
 * Features:
 * - Add new tasks via "Add a task" button
 * - Reorder tasks within the uncompleted list
 * - Mark tasks complete/incomplete
 * - Delete tasks
 * - Toggle visibility of completed tasks section
 * - Real-time error notifications
 * 
 * Props:
 * - projectId?: number - ID of the project (used when creating new tasks)
 * - projectUsers?: any[] - Available users for task assignment
 * - projectTasks?: TaskMap - Initial task map from the project
 * - style?: React.CSSProperties - Custom CSS styles
 * - className?: string - Additional CSS class names
 * 
 * @component
 * @param {TasksProps} props - Component props
 * @returns {JSX.Element} The tasks container with task list
 * 
 * @example
 * <Tasks 
 *   projectId={123}
 *   projectUsers={project.users}
 *   projectTasks={project.tasks}
 * />
 */
function Tasks({ projectId, projectUsers, projectTasks, style, className = '' }: TasksProps) {
    const {
        tasks,
        updateTask,
        complete,
        reorder,
        deleteTask,
        addTask,
        completedVisible,
        setCompletedVisible,
        error,
        setError,
    } = useTasks(projectTasks || {}, projectId);

    return (
        <>
            <ErrorNotification error={error} onClose={() => setError(null)} />
            <div className={`tasks-container ${className}`} style={style}>
            <div className='add' onClick={addTask}>Add a task</div>
            <div className="uncompleted-tasks">
                {Object.entries(tasks).filter(([_, task]) => task.completedById === null).map(([id, task]) => (
                    <Task
                        complete={() => complete(Number(id))}
                        reorder={(direction) => reorder(Number(id), direction)}
                        key={id}
                        task={task}
                        setTask={(newTask) => updateTask(Number(id), newTask)}
                        users={projectUsers || []}
                        deleteTask={() => deleteTask(Number(id))}
                        id={Number(id)}
                    />
                ))}
            </div>
            <div className="completed-tasks">
                <p onClick={() => setCompletedVisible(v => !v)}>{completedVisible ? '▼' : '▶'}&nbsp;&nbsp;&nbsp; Completed</p>
                {completedVisible && Object.entries(tasks).filter(([_, task]) => task.completedById !== null).map(([id, task]) => (
                    <Task
                        complete={() => complete(Number(id))}
                        reorder={(direction) => reorder(Number(id), direction)}
                        key={id} task={task}
                        setTask={(newTask) => updateTask(Number(id), newTask)}
                        users={projectUsers || []}
                        deleteTask={() => deleteTask(Number(id))}
                        id={Number(id)} />
                ))}
            </div>
        </div>
        </>
    );
}

export { Tasks };
