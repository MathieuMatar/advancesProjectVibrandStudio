import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length, IsInt, IsEmail } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType('CreateUserInput')
export class CreateUserDTO {
  @IsString()
  @Length(1, 100)
  @ApiProperty({ minLength: 1, maxLength: 100 })
  @Field()
  name: string;

  @IsString()
  @Length(1, 100)
  @ApiProperty()
  @Field()
  password: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  companyId?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  position?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  phone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  image?: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  accessLevel?: number;
}