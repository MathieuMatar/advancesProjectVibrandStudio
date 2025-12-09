import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProjectDTO } from './CreateProjectDTO';

/**
 * GraphQL input for updating project fields; all optional.
 */
@InputType('UpdateProjectInput')
export class UpdateProjectDTO extends PartialType(CreateProjectDTO) {}
