import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UpdateUserDTO } from './dto/UpdateUserDTO';

/**
 * GraphQL Resolver for User entity.
 * Handles queries and mutations related to users.
 */
@Resolver(() => User)
export class UsersResolver {
  /**
   * Creates an instance of UsersResolver.
   * @param usersService - The service responsible for user business logic.
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Retrieves all users.
   * @returns An array of all User objects.
   */
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Retrieves a single user by its ID.
   * @param id - The ID of the user to retrieve.
   * @returns The User object with the specified ID.
   */
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  /**
   * Creates a new user.
   * @param input - The input data for creating a new user.
   * @returns The newly created User object.
   */
  @Mutation(() => User)
  create(@Args('input') input: CreateUserDTO) {
    return this.usersService.create(input as any);
  }

  /**
   * Updates an existing user by its ID.
   * @param id - The ID of the user to update.
   * @param input - The input data for updating the user.
   * @returns The updated User object.
   */
  @Mutation(() => User)
  update(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateUserDTO) {
    return this.usersService.update(id, input as any);
  }

  /**
   * Deletes a user by its ID.
   * @param id - The ID of the user to delete.
   * @returns A boolean indicating whether the deletion was successful.
   */
  @Mutation(() => Boolean)
  async remove(@Args('id', { type: () => Int }) id: number) {
    await this.usersService.remove(id);
    return true;
  }
}

