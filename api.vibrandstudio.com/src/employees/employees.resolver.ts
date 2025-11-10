import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EmployeesService } from './employees.service';
import { Employee } from './models/employee.model';
import { CreateEmployeeDTO } from './dto/CreateEmployeeDTO';
import { UpdateEmployeeDTO } from './dto/UpdateEmployeeDTO';

/**
 * GraphQL Resolver for Employee entity.
 * Handles queries and mutations related to employees.
 */
@Resolver(() => Employee)
export class EmployeesResolver {
  /**
   * Creates an instance of EmployeesResolver.
   * @param employeesService - The service responsible for employee business logic.
   */
  constructor(private readonly employeesService: EmployeesService) {}

  /**
   * Retrieves all employees.
   * @returns An array of all Employee objects.
   */
  @Query(() => [Employee], { name: 'employees' })
  findAll() {
    return this.employeesService.findAll();
  }

  /**
   * Retrieves a single employee by its ID.
   * @param id - The ID of the employee to retrieve.
   * @returns The Employee object with the specified ID.
   */
  @Query(() => Employee, { name: 'employee' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.employeesService.findOne(id);
  }

  /**
   * Creates a new employee.
   * @param input - The input data for creating a new employee.
   * @returns The newly created Employee object.
   */
  @Mutation(() => Employee)
  create(@Args('input') input: CreateEmployeeDTO) {
    return this.employeesService.create(input as any);
  }

  /**
   * Updates an existing employee by its ID.
   * @param id - The ID of the employee to update.
   * @param input - The input data for updating the employee.
   * @returns The updated Employee object.
   */
  @Mutation(() => Employee)
  update(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateEmployeeDTO) {
    return this.employeesService.update(id, input as any);
  }

  /**
   * Deletes an employee by its ID.
   * @param id - The ID of the employee to delete.
   * @returns A boolean indicating whether the deletion was successful.
   */
  @Mutation(() => Boolean)
  async remove(@Args('id', { type: () => Int }) id: number) {
    await this.employeesService.remove(id);
    return true;
  }
}
