import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsEnum } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';
import { Status } from 'src/common/status.enum';

/**
 * GraphQL input for creating milestones within projects.
 */
@InputType('CreateMilestoneInput')
export class CreateMilestoneDTO {
  /** Related project identifier. */
  @IsInt()
  @ApiProperty()
  @Field(() => Int)
  projectId: number;

  /** Milestone name. */
  @IsString()
  @ApiProperty()
  @Field()
  name: string;

  /** Optional description. */
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  description?: string;

  /** Optional start/date field. */
  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  date?: string;

  /** Optional due date. */
  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  dueDate?: string;


  /** Current milestone status. */
  @IsOptional()
  @IsEnum(Status)
  @ApiProperty({ enum: Status, required: false })
  @Field(() => String, { nullable: true })
  status?: Status;

}
