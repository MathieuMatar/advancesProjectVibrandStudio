import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsBoolean, IsEnum } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';
import { Status } from '../../common/status.enum';

@InputType('CreateProjectInput')
export class CreateProjectDTO {
  @IsString()
  @ApiProperty()
  @Field()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  code?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  description?: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  clientId?: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  overview?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  files?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  image?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  @Field(() => Boolean, { nullable: true })
  public?: boolean;

  @IsOptional()
  @IsEnum(Status)
  @ApiProperty({ required: false, enum: Status })
  @Field(() => Status, { nullable: true })
  status?: Status;
}
