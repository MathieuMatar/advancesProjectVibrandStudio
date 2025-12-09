import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

/**
 * GraphQL input for creating tasks.
 */
@InputType('CreateTaskInput')
export class CreateTaskDTO {
  /** Optional project linkage. */
  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  projectId?: number;

  /** User id who created the task. */
  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  createdById?: number;

  /** Assignee user id. */
  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  assignedToId?: number;

  /** User id who completed the task. */
  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  completedById?: number;

  /** Optional due date. */
  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  dueDate?: string;

  /** Task title. */
  @IsString()
  @ApiProperty()
  @Field()
  title: string;

  /** Additional details. */
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  details?: string;

  /** Importance flag. */
  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  important?: boolean;

  /** Visibility level. */
  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  visibility?: number;
}