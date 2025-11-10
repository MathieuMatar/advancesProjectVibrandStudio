import { InputType, PartialType } from '@nestjs/graphql';
import { CreateUserDTO } from './CreateUserDTO';

@InputType('UpdateUserInput')
export class UpdateUserDTO extends PartialType(CreateUserDTO) { }