import request from "../utils/request";

/**
 * MilestoneService
 *
 * Provides helper methods to create, update and delete milestones via GraphQL.
 * Methods return the raw objects returned by the backend.
 */
class MilestoneService {
    /**
     * Update a milestone.
     *
     * @param id - milestone id to update
     * @param changes - partial object with fields to update (matches UpdateMilestoneInput)
     * @returns updated milestone object
     * @throws any request errors from `request`
     *
     * Example:
     * await milestoneService.updateMilestone(42, { name: 'New name', dueDate: '2025-12-01' })
     */
    async updateMilestone(id: number, changes: any) {
        const variables = {
            id,
            input: changes,
        };

        const query = `
        mutation UpdateMilestone($id: Int!, $input: UpdateMilestoneInput!) {
            updateMilestone(id: $id, input: $input) {
                id
                projectId
                name
                description
                date
                dueDate
                status
                createdAt
                updatedAt
            }
        }`;

        const data = await request(query, variables);
        return data.updateMilestone;
    }

    /**
     * Delete a milestone by id.
     *
     * @param id - milestone id
     * @returns value returned by backend removeMilestone mutation (usually boolean or id)
     */
    async deleteMilestone(id: number) {
        const variables = { id: id };
        const query = `mutation RemoveMilestone($id: Int!) { removeMilestone(id: $id) }`;
        const data = await request(query, variables);
        return data.removeMilestone;
    }

    /**
     * Create a new milestone.
     *
     * @param variables - object shaped like { input: CreateMilestoneInput }
     * @returns created milestone object
     *
     * Note: this method forwards the variables object directly to the GraphQL request
     * so callers should pass the exact shape the backend expects.
     */
    async createMilestone(variables: any) {
        const query = `mutation CreateMilestone($input: CreateMilestoneInput!) { createMilestone(input: $input) { id projectId name description dueDate status } }`;
        const data = await request(query, variables);
        return data.createMilestone;
    }
}

export const milestoneService = new MilestoneService();
