import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length, IsInt, IsEmail } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

/**
 * GraphQL input for creating users.
 */
@InputType('CreateUserInput')
export class CreateUserDTO {
  /** Display name. */
  @IsString()
  @Length(1, 100)
  @ApiProperty({ minLength: 1, maxLength: 100 })
  @Field()
  name: string;

  /** Plaintext password to be hashed. */
  @IsString()
  @Length(1, 100)
  @ApiProperty()
  @Field()
  password: string;

  /** Optional company id. */
  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  companyId?: number;

  /** Position or title. */
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  position?: string;

  /** Email address. */
  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  email?: string;

  /** Phone number. */
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  phone?: string;

  /** Profile image reference. */
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  image?: string;

  /** Access level numeric value. */
  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  accessLevel?: number;
}