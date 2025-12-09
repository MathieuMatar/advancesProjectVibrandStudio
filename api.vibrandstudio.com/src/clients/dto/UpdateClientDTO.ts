import { PartialType, InputType } from '@nestjs/graphql';
import { CreateClientDTO } from './CreateClientDTO';

/**
 * GraphQL input for updating client fields; all properties optional.
 */
@InputType('UpdateClientInput')
export class UpdateClientDTO extends PartialType(CreateClientDTO) {}
