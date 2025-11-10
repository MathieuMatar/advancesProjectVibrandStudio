import { InputType, PartialType } from '@nestjs/graphql';
import { CreateTaskDTO } from './CreateTaskDTO';

@InputType('UpdateTaskInput')
export class UpdateTaskDTO extends PartialType(CreateTaskDTO) {}