import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length, IsInt, IsNumber, IsEmail } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType('CreateClientInput')
export class CreateClientDTO {
  @IsString()
  @Length(1, 100)
  @ApiProperty({ minLength: 1, maxLength: 100 })
  @Field()
  name: string;

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
  address?: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  clientTypeId?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  image?: string;
}
