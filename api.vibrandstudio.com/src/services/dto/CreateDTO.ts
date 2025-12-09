import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length, IsNumber, IsInt, IsBoolean } from 'class-validator';
import { InputType, Field, Float, Int } from '@nestjs/graphql';


/**
 * GraphQL input type for creating a service.
 */
@InputType('CreateServiceInput')
export class CreateDTO {
  /** Human readable name of the service. */
  @IsString()
  @Length(1, 200)
  @ApiProperty({ minLength: 1, maxLength: 200 })
  @Field()
  name: string;

  /** Optional description explaining the service. */
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  description?: string;

  /** Billing rate for the service. */
  @IsNumber()
  @ApiProperty({ type: 'number' })
  @Field(() => Float)
  rate: number;

  /** Duration of the service in weeks. */
  @IsInt()
  @ApiProperty({ type: 'number' })
  @Field(() => Int)
  duration: number;

  /** Flag indicating if the service is active. */
  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  active?: boolean;
}
