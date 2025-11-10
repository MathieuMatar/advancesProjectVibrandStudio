import { PartialType, InputType } from '@nestjs/graphql';
import { CreateDTO } from './CreateDTO';

@InputType('UpdateServiceInput')
export class UpdateDTO extends PartialType(CreateDTO) {}
