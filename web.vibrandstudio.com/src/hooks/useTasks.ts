import { useEffect, useState } from 'react';
import { taskService } from '../services/taskService';
import Storage from '../utils/storage';
import { io } from "socket.io-client";
import { API_BASE_URL } from '../utils/urlUtils';

/**
 * TaskItem
 * Lightweight task shape used by the UI hooks.
 */
export interface TaskItem {
    title: string;
    details?: string;
    assignedTo?: number | string;
    createdBy?: number;
    visibility?: number | string;
    dueDate?: string;
    important: boolean;
    completedById?: number | null;
    order: number;
}

/**
 * TaskMap
 * Map of task id -> TaskItem. Used to keep tasks in a keyed structure instead of arrays.
 */
export type TaskMap = Record<number, TaskItem>;


const socket = io(API_BASE_URL);


/**
 * useTasks
 *
 * Hook that manages a set of tasks for a project. It provides helpers to update
 * local state, complete/uncomplete tasks, reorder tasks and add/delete tasks.
 *
 * Parameters:
 * - initialTasks: TaskMap — initial task map (usually from `project.tasks` transformed)
 * - projectId?: number — optional project id used when creating new empty tasks
 *
 * Returns an object with:
 * - tasks: TaskMap — current tasks keyed by id
 * - updateTask(id, updatedTask)
 * - complete(id) — toggles completion and updates remote state
 * - reorder(id, 'up'|'down') — swap orders between adjacent tasks
 * - deleteTask(id) — delete remote task and remove locally
 * - addTask() — create new empty task via backend and insert locally
 * - completedVisible / setCompletedVisible — state toggle for showing completed tasks
 *
 * Important behavior notes and edge-cases:
 * - Orders are normalized so that visible (non-completed) tasks have contiguous positive order values.
 * - Completed tasks are assigned `order = 0` to indicate hidden/completed state.
 * - Many operations are optimistic: the hook calls the `taskService` and then updates local state
 *   in `.then()` handlers. Failures in remote calls are not deeply handled; you may want to
 *   add retry/error UI handling depending on UX needs.
 * - `addTask` assumes the backend returns the created task object with an `id` field.
 *
 * Example:
 * const { tasks, addTask, complete } = useTasks(initialTasks, projectId)
 */
export function useTasks(initialTasks: TaskMap, projectId?: number) {
    const normalizeOrders = (tasks: TaskMap): TaskMap => {
        const tasksWithOrder = Object.entries(tasks)
            .filter(([_, task]) => task.order > 0)
            .sort((a, b) => a[1].order - b[1].order);

        tasksWithOrder.forEach(([, task], index) => {
            task.order = index + 1;
        });
        return tasks;
    };

    const [tasks, setTasks] = useState<TaskMap>(() => normalizeOrders(initialTasks));
    const [completedVisible, setCompletedVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);










    useEffect(() => {
        // 🔥 Listen for backend updates
        socket.on("taskUpdated", (updatedTask) => {

            // If this task does not belong to this project, ignore it
            // (Assuming your task object includes projectId)
            if (updatedTask.projectId !== projectId) return;

            setTasks(prev => ({
                ...prev,
                [updatedTask.id]: {
                    ...prev[updatedTask.id],
                    ...updatedTask
                }
            }));
        });

        // Cleanup on unmount
        return () => {
            socket.off("taskUpdated");
        };
    }, [projectId]);






    const updateTask = (id: number, updatedTask: TaskItem) => {
        setTasks(prev => ({ ...prev, [id]: updatedTask }));
    };

    const complete = async (id: number) => {
        setError(null);
        try {
            if (tasks[id].completedById) {
                await taskService.uncompleteTask(id);
                const maxOrder = Math.max(...Object.values(tasks).map(t => t.order));
                setTasks(prev => {
                    tasks[id].completedById = null;
                    tasks[id].order = maxOrder + 1;
                    return { ...prev };
                });
            } else {
                const user = await Storage.getUser();
                await taskService.completeTask(id);
                setTasks(prev => ({
                    ...prev,
                    [id]: { ...prev[id], completedById: user.user.id, order: 0 }
                }));
            }
        } catch (err: any) {
            let message = 'Error updating task completion';
            if (err?.message) message += `: ${err.message}`;
            setError(message);
        }
    };

    const reorder = async (id: number, direction: 'up' | 'down') => {
        setError(null);
        try {
            const currentTask = tasks[id];
            const targetOrder = direction === 'up' ? currentTask.order - 1 : currentTask.order + 1;
            const swapTaskId = Object.keys(tasks).find(key => tasks[Number(key)].order === targetOrder);
            if (!swapTaskId) return;

            const updatedTasks = { ...tasks };
            updatedTasks[id] = { ...currentTask, order: targetOrder };
            updatedTasks[Number(swapTaskId)] = { ...updatedTasks[Number(swapTaskId)], order: currentTask.order };

            setTasks(normalizeOrders(updatedTasks));
            await taskService.updateTask(id, { order: targetOrder });
        } catch (err: any) {
            let message = 'Error reordering task';
            if (err?.message) message += `: ${err.message}`;
            setError(message);
        }
    };

    const deleteTask = async (id: number) => {
        setError(null);
        try {
            await taskService.deleteTask(id);
            const updatedTasks = { ...tasks };
            delete updatedTasks[id];
            setTasks(normalizeOrders(updatedTasks));
        } catch (err: any) {
            let message = 'Error deleting task';
            if (err?.message) message += `: ${err.message}`;
            setError(message);
        }
    };

    const addTask = async () => {
        setError(null);
        try {
            const newTask = await taskService.addEmptyTask(projectId);
            const newTaskId = newTask.id;
            delete newTask.id;

            Object.values(tasks).forEach(task => { if (task.order > 0) task.order += 1; });
            newTask.order = 1;

            setTasks(prev => ({ ...prev, [newTaskId]: newTask }));
        } catch (err: any) {
            let message = 'Error adding task';
            if (err?.message) message += `: ${err.message}`;
            setError(message);
        }
    };

    return {
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
    };
}
