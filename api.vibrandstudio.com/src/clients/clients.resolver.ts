import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClientsService } from './clients.service';
import { Client } from './models/client.model';
import { CreateClientDTO } from './dto/CreateClientDTO';
import { UpdateClientDTO } from './dto/UpdateClientDTO';
import { Public } from '../auth/public.decorator';

/**
 * GraphQL Resolver for Client entity.
 * Handles queries and mutations related to clients.
 */
@Resolver(() => Client)
export class ClientsResolver {
  /**
   * Creates an instance of ClientsResolver.
   * @param clientsService - The service responsible for client business logic.
   */
  constructor(private readonly clientsService: ClientsService) {}

  /**
   * Retrieves all clients.
   * @returns An array of all Client objects.
   */
  @Query(() => [Client], { name: 'clients' })
  @Public()
  findAll() {
    return this.clientsService.findAll();
  }

  /**
   * Retrieves a single client by its ID.
   * @param id - The ID of the client to retrieve.
   * @returns The Client object with the specified ID.
   */
  @Query(() => Client, { name: 'client' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.clientsService.findOne(id);
  }

  /**
   * Creates a new client.
   * @param input - The input data for creating a new client.
   * @returns The newly created Client object.
   */
  @Mutation(() => Client)
  create(@Args('input') input: CreateClientDTO) {
    return this.clientsService.create(input as any);
  }

  /**
   * Updates an existing client by its ID.
   * @param id - The ID of the client to update.
   * @param input - The input data for updating the client.
   * @returns The updated Client object.
   */
  @Mutation(() => Client)
  update(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateClientDTO) {
    return this.clientsService.update(id, input as any);
  }

  /**
   * Deletes a client by its ID.
   * @param id - The ID of the client to delete.
   * @returns A boolean indicating whether the deletion was successful.
   */
  @Mutation(() => Boolean)
  async remove(@Args('id', { type: () => Int }) id: number) {
    await this.clientsService.remove(id);
    return true;
  }
}
