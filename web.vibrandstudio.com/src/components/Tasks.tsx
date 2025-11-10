import { Task } from './Task';
import './tasks.css';
import { useTasks, type TaskMap } from '../hooks/useTasks';

interface TasksProps {
    projectId?: number;
    projectUsers?: any[];
    projectTasks?: TaskMap;
    style?: React.CSSProperties;
    className?: string;
}

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
    } = useTasks(projectTasks || {}, projectId);

    return (
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
    );
}

export { Tasks };
