import { InputType, PartialType } from '@nestjs/graphql';
import { CreateEmployeeDTO } from './CreateEmployeeDTO';

@InputType('UpdateEmployeeInput')
export class UpdateEmployeeDTO extends PartialType(CreateEmployeeDTO) {}
