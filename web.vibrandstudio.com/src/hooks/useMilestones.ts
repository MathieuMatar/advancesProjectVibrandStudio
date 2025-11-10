import { useState } from 'react';
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

        try {
            if (edit?.id) {
                // Convert date input to ISO format
                const isoDueDate = new Date(edit.dueDate).toISOString();

                const updated = await milestoneService.updateMilestone(edit.id, {
                    name: edit.name,
                    description: edit.description,
                    dueDate: isoDueDate, // <-- send ISO format date
                    status: edit.status,
                });

                // Update the milestone in local state
                setMilestones((prev) =>
                    prev.map((m) => (m.id === updated.id ? updated : m))
                );
            } else {
                // Creating a new milestone
                const isoDueDate = edit?.dueDate ? new Date(edit.dueDate).toISOString() : null;
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

            setEdit(null); // Close the form
        } catch (err) {
            console.error('Update failed:', err);
            alert('Failed to update milestone');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await milestoneService.deleteMilestone(id);
            setMilestones((prev) => prev.filter((m) => m.id !== id));
        } catch (err) {
            console.error('Delete failed:', err);
            alert('Failed to delete milestone');
        }
    };

    return {
        milestones,
        edit,
        setEdit,
        handleChange,
        handleUpdate,
        handleDelete
    };
}