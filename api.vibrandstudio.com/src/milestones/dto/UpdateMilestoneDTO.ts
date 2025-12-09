import { InputType, PartialType } from '@nestjs/graphql';
import { CreateMilestoneDTO } from './CreateMilestoneDTO';

/**
 * GraphQL input for updating milestone fields; all optional.
 */
@InputType('UpdateMilestoneInput')
export class UpdateMilestoneDTO extends PartialType(CreateMilestoneDTO) {}
