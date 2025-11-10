import { InputType, PartialType } from '@nestjs/graphql';
import { CreateMilestoneDTO } from './CreateMilestoneDTO';

@InputType('UpdateMilestoneInput')
export class UpdateMilestoneDTO extends PartialType(CreateMilestoneDTO) {}
