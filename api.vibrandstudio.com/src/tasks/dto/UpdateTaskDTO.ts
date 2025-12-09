import { InputType, PartialType } from '@nestjs/graphql';
import { CreateTaskDTO } from './CreateTaskDTO';

/**
 * GraphQL input for updating tasks; all fields optional.
 */
@InputType('UpdateTaskInput')
export class UpdateTaskDTO extends PartialType(CreateTaskDTO) {}