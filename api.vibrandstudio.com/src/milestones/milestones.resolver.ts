import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MilestonesService } from './milestones.service';
import { Milestone } from './models/milestone.model';
import { CreateMilestoneDTO } from './dto/CreateMilestoneDTO';
import { UpdateMilestoneDTO } from './dto/UpdateMilestoneDTO';

/**
 * GraphQL Resolver for Milestone entity.
 * Handles queries and mutations related to milestones.
 */
@Resolver(() => Milestone)
export class MilestonesResolver {
  /**
   * Creates an instance of MilestonesResolver.
   * @param milestonesService - The service responsible for milestone business logic.
   */
  constructor(private readonly milestonesService: MilestonesService) {}

  /**
   * Retrieves all milestones.
   * @returns An array of all Milestone objects.
   */
  @Query(() => [Milestone], { name: 'milestones' })
  findAll() {
    return this.milestonesService.findAll();
  }

  /**
   * Retrieves a single milestone by its ID.
   * @param id - The ID of the milestone to retrieve.
   * @returns The Milestone object with the specified ID.
   */
  @Query(() => Milestone, { name: 'milestone' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.milestonesService.findOne(id);
  }
  /**
   * Creates a new milestone.
   * @param input - The input data for creating a new milestone.
   * @returns The newly created Milestone object.
   */
  @Mutation(() => Milestone, { name: 'createMilestone' })
  create(@Args('input', { type: () => CreateMilestoneDTO }) input: CreateMilestoneDTO) {
    return this.milestonesService.create(input as any);
  }

  /**
   * Updates an existing milestone by its ID.
   * @param id - The ID of the milestone to update.
   * @param input - The input data for updating the milestone.
   * @returns The updated Milestone object.
   */
  @Mutation(() => Milestone, { name: 'updateMilestone' })
  updateMilestone(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', { type: () => UpdateMilestoneDTO }) input: UpdateMilestoneDTO,
  ) {
    return this.milestonesService.update(id, input as any);
  }

  /**
   * Deletes a milestone by its ID.
   * @param id - The ID of the milestone to delete.
   * @returns A boolean indicating whether the deletion was successful.
   */
  @Mutation(() => Boolean, { name: 'removeMilestone' })
  async remove(@Args('id', { type: () => Int }) id: number) {
    await this.milestonesService.remove(id);
    return true;
  }
}
