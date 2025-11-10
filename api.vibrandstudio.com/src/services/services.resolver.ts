import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ServicesService } from './services.service';
import { Service } from './models/service.model';
import { CreateDTO } from './dto/CreateDTO';
import { UpdateDTO } from './dto/UpdateDTO';

/**
 * GraphQL Resolver for Service entity.
 * Handles queries and mutations related to services.
 */
@Resolver(() => Service)
export class ServicesResolver {
  /**
   * Creates an instance of ServicesResolver.
   * @param servicesService - The service responsible for service business logic.
   */
  constructor(private readonly servicesService: ServicesService) {}

  /**
   * Retrieves all services.
   * @returns An array of all Service objects.
   */
  @Query(() => [Service], { name: 'services' })
  findAll() {
    return this.servicesService.findAll();
  }

  /**
   * Retrieves a single service by its ID.
   * @param id - The ID of the service to retrieve.
   * @returns The Service object with the specified ID.
   */
  @Query(() => Service, { name: 'service' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.servicesService.findOne(id);
  }

  /**
   * Creates a new service.
   * @param input - The input data for creating a new service.
   * @returns The newly created Service object.
   */
  @Mutation(() => Service)
  create(@Args('input') input: CreateDTO) {
    return this.servicesService.create(input as any);
  }

  /**
   * Updates an existing service by its ID.
   * @param id - The ID of the service to update.
   * @param input - The input data for updating the service.
   * @returns The updated Service object.
   */
  @Mutation(() => Service)
  update(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateDTO,
  ) {
    return this.servicesService.update(id, input as any);
  }

  /**
   * Deletes a service by its ID.
   * @param id - The ID of the service to delete.
   * @returns A boolean indicating whether the deletion was successful.
   */
  @Mutation(() => Boolean)
  async remove(@Args('id', { type: () => Int }) id: number) {
    await this.servicesService.remove(id);
    return true;
  }
}
