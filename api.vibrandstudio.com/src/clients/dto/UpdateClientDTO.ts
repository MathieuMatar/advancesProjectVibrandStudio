import { PartialType, InputType } from '@nestjs/graphql';
import { CreateClientDTO } from './CreateClientDTO';

@InputType('UpdateClientInput')
export class UpdateClientDTO extends PartialType(CreateClientDTO) {}
