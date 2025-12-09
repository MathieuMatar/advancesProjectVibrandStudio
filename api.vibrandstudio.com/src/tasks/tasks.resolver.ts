import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './models/task.model';
import { CreateTaskDTO } from './dto/CreateTaskDTO';
import { UpdateTaskDTO } from './dto/UpdateTaskDTO';
import { Access } from '../auth/access.decorator';
import { Public } from '../auth/public.decorator';

/**
 * GraphQL Resolver for Task entity.
 * Handles queries and mutations related to tasks.
 */
@Resolver(() => Task)
export class TasksResolver {
  /**
   * Creates an instance of TasksResolver.
   * @param tasksService - The service responsible for task business logic.
   */
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Retrieves all tasks.
   * @param ctx - GraphQL context containing request and user information.
   * @returns An array of all Task objects.
   */
  @Access(1)
  @Query(() => [Task], { name: 'tasks' })
  findAll(@Context() ctx: any) {
    const user = ctx.req?.user;
    return this.tasksService.findAll();
  }

  /**
   * Retrieves a single task by its ID.
   * @param id - The ID of the task to retrieve.
   * @param ctx - GraphQL context containing request and user information.
   * @returns The Task object with the specified ID.
   */
  @Query(() => Task, { name: 'task' })
  findOne(@Args('id', { type: () => Int }) id: number, @Context() ctx: any) {
    const user = ctx.req?.user;
    return this.tasksService.findOne(id);
  }

  /**
   * Creates a new task.
   * @param input - The input data for creating a new task.
   * @param ctx - GraphQL context containing request and user information.
   * @returns The newly created Task object.
   */
  @Mutation(() => Task)
  create(@Args('input') input: CreateTaskDTO, @Context() ctx: any) {
    const user = ctx.req?.user;
    return this.tasksService.create(input as any);
  }

  /**
   * Updates an existing task by its ID.
   * @param id - The ID of the task to update.
   * @param input - The input data for updating the task.
   * @param ctx - GraphQL context containing request and user information.
   * @returns The updated Task object.
   */
  @Mutation(() => Task)
  update(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateTaskDTO,
    @Context() ctx: any
  ) {
    const user = ctx.req?.user;
    return this.tasksService.update(id, input as any);
  }

  /**
   * Deletes a task by its ID.
   * @param id - The ID of the task to delete.
   * @param ctx - GraphQL context containing request and user information.
   * @returns A boolean indicating whether the deletion was successful.
   */
  @Mutation(() => Boolean)
  async remove(@Args('id', { type: () => Int }) id: number, @Context() ctx: any) {
    const user = ctx.req?.user;
    await this.tasksService.remove(id);
    return true;
  }
}
