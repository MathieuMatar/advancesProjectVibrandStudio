import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsBoolean, IsEnum, IsArray } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';
import { Status } from '../../common/status.enum';

/**
 * GraphQL input for creating projects.
 */
@InputType('CreateProjectInput')
export class CreateProjectDTO {
  /** Project name. */
  @IsString()
  @ApiProperty()
  @Field()
  name: string;

  /** Optional short code. */
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  code?: string;

  /** Project description. */
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  description?: string;

  /** Linked client id. */
  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  clientId?: number;

  /** Overview or summary text. */
  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  overview?: string;

  /** Supporting files reference. */
  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  files?: string;

  /** Primary image reference. */
  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  image?: string;

  /** Public visibility flag. */
  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  @Field(() => Boolean, { nullable: true })
  public?: boolean;

  /** Additional gallery images. */
  @IsOptional()
  @IsArray()
  @ApiProperty({ required: false, type: 'array', items: { type: 'string' } })
  @Field(() => [String], { nullable: 'itemsAndList' })
  images?: string[];

  /** Current status. */
  @IsOptional()
  @IsEnum(Status)
  @ApiProperty({ required: false, enum: Status })
  @Field(() => Status, { nullable: true })
  status?: Status;
}
