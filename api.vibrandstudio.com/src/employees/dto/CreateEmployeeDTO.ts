import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType('CreateEmployeeInput')
export class CreateEmployeeDTO {
  @IsString()
  @ApiProperty()
  @Field()
  firstName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  fatherName?: string;

  @IsString()
  @ApiProperty()
  @Field()
  lastName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  position?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  info?: string;
}
