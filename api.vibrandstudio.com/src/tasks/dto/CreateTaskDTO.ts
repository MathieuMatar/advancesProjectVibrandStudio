import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType('CreateTaskInput')
export class CreateTaskDTO {
  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  projectId?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  createdById?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  assignedToId?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  completedById?: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  dueDate?: string;

  @IsString()
  @ApiProperty()
  @Field()
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  details?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  important?: boolean;

  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  visibility?: number;
}