import { InputType, PartialType } from '@nestjs/graphql';
import { CreateEmployeeDTO } from './CreateEmployeeDTO';

/**
 * GraphQL input for updating employee fields; all optional.
 */
@InputType('UpdateEmployeeInput')
export class UpdateEmployeeDTO extends PartialType(CreateEmployeeDTO) {}
