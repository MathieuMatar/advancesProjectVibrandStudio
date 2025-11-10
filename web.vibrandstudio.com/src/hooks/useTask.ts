import { useRef, useState } from 'react';
import { taskService } from '../services/taskService';

/**
 * useTask
 *
 * Hook to manage a single task's local editing behavior and related actions.
 *
 * Parameters:
 * - task: the task object to manage (mutable-like, caller is expected to keep reference)
 * - setTask: setter callback provided by the parent to update the task state
 * - id: numeric task id used for backend calls
 *
 * Returns an object with:
 * - isFocused: boolean — whether the task is currently focused for editing
 * - handleFocusIn(): () => void — call on focus to snapshot current task data
 * - handleFocusOut(event): (e) => void — call on blur to detect changes and persist them
 * - toggleImportant(): Promise<void> — toggles the `important` flag locally and on the server
 *
 * Behavior and edge-cases:
 * - On focus in, the hook captures a snapshot of the task in a ref to later compare for changes.
 * - On focus out (when focus leaves the element tree) it compares the snapshot to the current
 *   task via JSON serialization and sends only changed fields to `taskService.updateTask`.
 * - `toggleImportant` updates the server first then applies the optimistic local update.
 * - Errors from `updateTask` are surfaced via a catch that currently shows an alert; you can
 *   replace this with a toast or error handler in the parent.
 *
 * Example usage:
 * const { isFocused, handleFocusIn, handleFocusOut, toggleImportant } = useTask(task, setTask, id)
 */
export function useTask(task: any, setTask: (newTask: any) => void, id: number) {
    const [isFocused, setIsFocused] = useState(false);
    const ref = useRef(task);

    const handleFocusIn = () => {
        setIsFocused(true);
        ref.current = task; // store snapshot of data on focus
    };

    const handleFocusOut = (e: React.FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsFocused(false);
            if (JSON.stringify(ref.current) !== JSON.stringify(task)) {
                let changedFields: any = {};
                for (const key in task) {
                    if (ref.current[key] !== task[key]) changedFields[key] = task[key];
                }
                taskService.updateTask(id, changedFields).catch(() => alert('Error updating task'));
            }
        }
    };

    const toggleImportant = async () => {
        await taskService.updateTask(id, { important: !task.important });
        setTask({ ...task, important: !task.important });
    };

    return {
        isFocused,
        handleFocusIn,
        handleFocusOut,
        toggleImportant
    };
}
