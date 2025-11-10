import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project } from './models/project.model';
import { CreateProjectDTO } from './dto/CreateProjectDTO';
import { UpdateProjectDTO } from './dto/UpdateProjectDTO';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Public } from 'src/auth/public.decorator';

/**
 * GraphQL Resolver for Project entity.
 * Handles queries and mutations related to projects.
 */
@Resolver(() => Project)
export class ProjectsResolver {
  /**
   * Creates an instance of ProjectsResolver.
   * @param projectsService - The service responsible for project business logic.
   * @param jwtService - JWT service for optional token verification.
   * @param usersService - Users service for optional user validation.
   */
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) { }

  /**
   * Retrieves all projects. If an authorization header with a valid token is present
   * the user's id will be used for filtering/validation.
   * @param ctx - GraphQL context containing request and user information.
   * @returns An array of Project objects, optionally filtered by user.
   */
  @Query(() => [Project], { name: 'projects' })
  @Public()
  async findAll(@Context() ctx: any) {
    const authHeader = ctx?.req?.headers?.authorization as string | undefined;
    let userId: number | null = null;

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payload: any = this.jwtService.verify(token);
        userId = payload?.sub;
        if (userId) {
          await this.usersService.findOne(userId); // optional validation
        }
      } catch (err) {
        userId = null;
      }
    }

    return this.projectsService.findAll(userId);
  }

  /**
   * Retrieves a single project by its ID.
   * @param id - The ID of the project to retrieve.
   * @returns The Project object with the specified ID.
   */
  @Query(() => Project, { name: 'project' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.projectsService.findOne(id);
  }

  /**
   * Creates a new project.
   * @param input - The input data for creating a new project.
   * @returns The newly created Project object.
   */
  @Mutation(() => Project, { name: 'createProject' })
  create(@Args('input') input: CreateProjectDTO) {
    return this.projectsService.create(input as any);
  }

  /**
   * Updates an existing project by its ID.
   * @param id - The ID of the project to update.
   * @param input - The input data for updating the project.
   * @returns The updated Project object.
   */
  @Mutation(() => Project, { name: 'updateProject' })
  update(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateProjectDTO) {
    return this.projectsService.update(id, input as any);
  }

  /**
   * Adds a user to a project.
   * @param projectId - The ID of the project.
   * @param userId - The ID of the user to add.
   * @returns The updated Project object.
   */
  @Mutation(() => Project)
  addUserToProject(@Args('projectId', { type: () => Int }) projectId: number, @Args('userId', { type: () => Int }) userId: number) {
    return this.projectsService.addUserToProject(projectId, userId);
  }

  /**
   * Adds a service to a project.
   * @param projectId - The ID of the project.
   * @param serviceId - The ID of the service to add.
   * @returns The updated Project object.
   */
  @Mutation(() => Project)
  addServiceToProject(@Args('projectId', { type: () => Int }) projectId: number, @Args('serviceId', { type: () => Int }) serviceId: number) {
    return this.projectsService.addServiceToProject(projectId, serviceId);
  }

  /**
   * Deletes a project by its ID.
   * @param id - The ID of the project to delete.
   * @returns A boolean indicating whether the deletion was successful.
   */
  @Mutation(() => Boolean)
  async remove(@Args('id', { type: () => Int }) id: number) {
    await this.projectsService.remove(id);
    return true;
  }
}
