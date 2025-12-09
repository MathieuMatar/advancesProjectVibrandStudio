import { useState } from 'react';
import { dateInputToISO } from '../utils/dateUtils';
import { milestoneService } from '../services/milestoneService';

/**
 * useMilestones
 *
 * Hook to manage a list of milestones with create/update/delete handlers tied to the
 * `milestoneService`.
 *
 * Parameters:
 * - initialMilestones: initial array of milestone objects (shape depends on backend)
 * - ProjectId: numeric project id used when creating a new milestone
 *
 * Returns an object with:
 * - milestones: current milestone array
 * - edit: current edit object (or null) used for forms
 * - setEdit: setter for edit state
 * - handleChange(event): input change handler to update the edit object
 * - handleUpdate(event): form submit handler that creates or updates a milestone
 * - handleDelete(id): deletes a milestone by id
 *
 * Behavior and notes:
 * - Dates from inputs are converted to ISO strings before being sent to the backend.
 * - `handleUpdate` will either call `updateMilestone` (when `edit.id` exists) or
 *   `createMilestone` (when creating a new milestone).
 * - Errors are currently surfaced via console.error and an alert; adapt to your UI as needed.
 *
 * Example:
 * const { milestones, edit, handleChange, handleUpdate, handleDelete } = useMilestones(initial, projectId)
 */
export function useMilestones(initialMilestones: any[], ProjectId: number) {
    const [milestones, setMilestones] = useState(initialMilestones);
    const [edit, setEdit] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Handle input changes in the edit form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEdit((prev: any) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            if (edit?.id) {
                const isoDueDate = dateInputToISO(edit.dueDate);
                const updated = await milestoneService.updateMilestone(edit.id, {
                    name: edit.name,
                    description: edit.description,
                    dueDate: isoDueDate,
                    status: edit.status,
                });
                setMilestones((prev) =>
                    prev.map((m) => (m.id === updated.id ? updated : m))
                );
            } else {
                const isoDueDate = edit?.dueDate ? dateInputToISO(edit.dueDate) : null;
                const created = await milestoneService.createMilestone({
                    input: {
                        projectId: ProjectId,
                        name: edit?.name,
                        description: edit?.description,
                        dueDate: isoDueDate,
                    }
                });
                setMilestones((prev) => [...prev, created]);
            }
            setEdit(null);
        } catch (err: any) {
            let message = 'Failed to update milestone';
            if (err?.message) message += `: ${err.message}`;
            setError(message);
        }
    };

    const handleDelete = async (id: number) => {
        setError(null);
        try {
            await milestoneService.deleteMilestone(id);
            setMilestones((prev) => prev.filter((m) => m.id !== id));
        } catch (err: any) {
            let message = 'Failed to delete milestone';
            if (err?.message) message += `: ${err.message}`;
            setError(message);
        }
    };

    return {
        milestones,
        edit,
        setEdit,
        handleChange,
        handleUpdate,
        handleDelete,
        error,
        setError,
    };
}