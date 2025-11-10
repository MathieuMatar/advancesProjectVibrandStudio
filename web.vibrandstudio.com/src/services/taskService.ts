import request from "../utils/request";
import Storage from "../utils/storage";

/**
 * TaskService
 *
 * Helper methods for creating, updating and deleting tasks through GraphQL.
 * Methods typically return the raw object(s) returned by the backend.
 */
class TaskService {

    /**
     * Create an empty task for a project.
     *
     * @param projectId - (optional) project id to attach the task to
     * @returns created task object
     * @example
     * const task = await taskService.addEmptyTask(12)
     */
    async addEmptyTask(projectId?: number) {
        const user = await Storage.getUser();
        const variables = {
            input: {
                title: '',
                projectId: projectId,
                createdById: user.user.id,
                dueDate: null,
            }
        };
        const query = `mutation CreateTask($input: CreateTaskInput!) { create(input: $input) { id projectId createdById assignedToId completedById dueDate title details important visibility createdAt updatedAt } }`;
        const data = await request(query, variables);
        return data.create;
    }

    /**
     * Delete a task by id.
     *
     * @param id - task id
     * @returns result of remove mutation (backend-defined, often boolean or id)
     */
    async deleteTask(id: number) {
        const variables = { id: id };
        const query = `mutation RemoveTask($id: Int!) { remove(id: $id) }`;
        const data = await request(query, variables);
        return data.remove;
    }

    /**
     * Update fields on a task.
     *
     * @param id - task id
     * @param changes - partial object matching UpdateTaskInput
     * @returns updated task object (id, title, details, dueDate)
     */
    async updateTask(id: number, changes: any) {
        const variables = {
            id: id,
            input: changes
        };

        const query = `mutation UpdateTask($id: Int!, $input: UpdateTaskInput!) { update(id: $id, input: $input) { id title details dueDate } }`;
        const data = await request(query, variables);
        return data.update;
    }

    /**
     * Mark a task as completed by setting `completedById` to the current user.
     *
     * @param id - task id
     * @returns updated task object from updateTask
     */
    async completeTask(id: number) {
        const user = await Storage.getUser();
        return this.updateTask(id, { completedById: user.user.id });
    }

    /**
     * Unmark a task as completed (set `completedById` to null).
     *
     * @param id - task id
     * @returns updated task object from updateTask
     */
    async uncompleteTask(id: number) {
        return this.updateTask(id, { completedById: null });
    }
}

export const taskService = new TaskService();
