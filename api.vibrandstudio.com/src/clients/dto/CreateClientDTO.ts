import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length, IsInt, IsNumber, IsEmail, IsBoolean } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

/**
 * GraphQL input for creating a client record.
 */
@InputType('CreateClientInput')
export class CreateClientDTO {
  /** Client name. */
  @IsString()
  @Length(1, 100)
  @ApiProperty({ minLength: 1, maxLength: 100 })
  @Field()
  name: string;

  /** Contact email. */
  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  email?: string;

  /** Contact phone number. */
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  phone?: string;

  /** Physical or mailing address. */
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  address?: string;

  /** Optional reference to a client type. */
  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  clientTypeId?: number;

  /** Path or URL to an image asset. */
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  image?: string;

  /** Optional animation asset reference. */
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  animation?: string;

  /** Whether the client is active. */
  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  @Field(() => Boolean, { nullable: true })
  active?: boolean;

  /** Whether the client is visible publicly. */
  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  @Field(() => Boolean, { nullable: true })
  public?: boolean;
}
