import { PartialType, InputType } from '@nestjs/graphql';
import { CreateDTO } from './CreateDTO';

/**
 * GraphQL input type for updating a service; all fields are optional.
 */
@InputType('UpdateServiceInput')
export class UpdateDTO extends PartialType(CreateDTO) {}
