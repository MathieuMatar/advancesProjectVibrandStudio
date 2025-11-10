import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProjectDTO } from './CreateProjectDTO';

@InputType('UpdateProjectInput')
export class UpdateProjectDTO extends PartialType(CreateProjectDTO) {}
