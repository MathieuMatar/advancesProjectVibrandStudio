import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClientTypesService } from './clienttypes.service';
import { ClientType } from './models/clienttype.model';
import { CreateClientTypeDTO } from './dto/CreateClientTypeDTO';
import { UpdateClientTypeDTO } from './dto/UpdateClientTypeDTO';

/**
 * GraphQL Resolver for ClientType entity.
 * Handles queries and mutations related to client types.
 */
@Resolver(() => ClientType)
export class ClientTypesResolver {
  /**
   * Creates an instance of ClientTypesResolver.
   * @param clientTypesService - The service responsible for client type business logic.
   */
  constructor(private readonly clientTypesService: ClientTypesService) {}

  /**
   * Retrieves all client types.
   * @returns An array of all ClientType objects.
   */
  @Query(() => [ClientType], { name: 'clientTypes' })
  findAll() {
    return this.clientTypesService.findAll();
  }

  /**
   * Retrieves a single client type by its ID.
   * @param id - The ID of the client type to retrieve.
   * @returns The ClientType object with the specified ID.
   */
  @Query(() => ClientType, { name: 'clientType' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.clientTypesService.findOne(id);
  }

  /**
   * Creates a new client type.
   * @param input - The input data for creating a new client type.
   * @returns The newly created ClientType object.
   */
  @Mutation(() => ClientType)
  create(@Args('input') input: CreateClientTypeDTO) {
    return this.clientTypesService.create(input as any);
  }

  /**
   * Updates an existing client type by its ID.
   * @param id - The ID of the client type to update.
   * @param input - The input data for updating the client type.
   * @returns The updated ClientType object.
   */
  @Mutation(() => ClientType)
  update(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateClientTypeDTO) {
    return this.clientTypesService.update(id, input as any);
  }

  /**
   * Deletes a client type by its ID.
   * @param id - The ID of the client type to delete.
   * @returns A boolean indicating whether the deletion was successful.
   */
  @Mutation(() => Boolean)
  async remove(@Args('id', { type: () => Int }) id: number) {
    await this.clientTypesService.remove(id);
    return true;
  }
}
