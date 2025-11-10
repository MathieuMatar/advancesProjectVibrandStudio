import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType('CreateClientTypeInput')
export class CreateClientTypeDTO {
  @IsString()
  @Length(1, 100)
  @ApiProperty({ minLength: 1, maxLength: 100 })
  @Field()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  image?: string;
}
