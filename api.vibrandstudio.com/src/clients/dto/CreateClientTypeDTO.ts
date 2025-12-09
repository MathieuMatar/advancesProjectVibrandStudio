import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

/**
 * GraphQL input for creating a client category/type.
 */
@InputType('CreateClientTypeInput')
export class CreateClientTypeDTO {
  /** Display name of the client type. */
  @IsString()
  @Length(1, 100)
  @ApiProperty({ minLength: 1, maxLength: 100 })
  @Field()
  name: string;

  /** Optional image reference for this type. */
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  image?: string;
}
