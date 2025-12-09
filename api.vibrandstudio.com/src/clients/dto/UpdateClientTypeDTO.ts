import { PartialType, InputType } from '@nestjs/graphql';
import { CreateClientTypeDTO } from './CreateClientTypeDTO';

/**
 * GraphQL input for updating client type fields.
 */
@InputType('UpdateClientTypeInput')
export class UpdateClientTypeDTO extends PartialType(CreateClientTypeDTO) {}
