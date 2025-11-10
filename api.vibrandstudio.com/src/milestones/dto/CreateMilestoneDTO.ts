import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsEnum } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';
import { Status } from 'src/common/status.enum';

@InputType('CreateMilestoneInput')
export class CreateMilestoneDTO {
  @IsInt()
  @ApiProperty()
  @Field(() => Int)
  projectId: number;

  @IsString()
  @ApiProperty()
  @Field()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  description?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  date?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  dueDate?: string;


  @IsOptional()
  @IsEnum(Status)
  @ApiProperty({ enum: Status, required: false })
  @Field(() => String, { nullable: true })
  status?: Status;

}
