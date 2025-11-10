import { PartialType, InputType } from '@nestjs/graphql';
import { CreateClientTypeDTO } from './CreateClientTypeDTO';

@InputType('UpdateClientTypeInput')
export class UpdateClientTypeDTO extends PartialType(CreateClientTypeDTO) {}
