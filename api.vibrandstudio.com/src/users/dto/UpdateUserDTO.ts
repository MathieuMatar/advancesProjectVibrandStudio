import { InputType, PartialType } from '@nestjs/graphql';
import { CreateUserDTO } from './CreateUserDTO';

/**
 * GraphQL input for updating user fields; all optional.
 */
@InputType('UpdateUserInput')
export class UpdateUserDTO extends PartialType(CreateUserDTO) { }