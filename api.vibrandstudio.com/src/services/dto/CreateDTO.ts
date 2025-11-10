import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length, IsNumber, IsInt, IsBoolean } from 'class-validator';
import { InputType, Field, Float, Int } from '@nestjs/graphql';


@InputType('CreateServiceInput')
export class CreateDTO {
  @IsString()
  @Length(1, 200)
  @ApiProperty({ minLength: 1, maxLength: 200 })
  @Field()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  description?: string;

  @IsNumber()
  @ApiProperty({ type: 'number' })
  @Field(() => Float)
  rate: number;

  @IsInt()
  @ApiProperty({ type: 'number' })
  @Field(() => Int)
  duration: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  active?: boolean;
}
