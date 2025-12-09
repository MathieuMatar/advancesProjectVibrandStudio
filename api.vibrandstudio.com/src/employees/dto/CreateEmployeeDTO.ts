import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

/**
 * GraphQL input for creating an employee.
 */
@InputType('CreateEmployeeInput')
export class CreateEmployeeDTO {
  /** Given name. */
  @IsString()
  @ApiProperty()
  @Field()
  firstName: string;

  /** Optional paternal name. */
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  fatherName?: string;

  /** Family name. */
  @IsString()
  @ApiProperty()
  @Field()
  lastName: string;

  /** Role or position title. */
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  position?: string;

  /** Optional short bio or info. */
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  info?: string;
}
