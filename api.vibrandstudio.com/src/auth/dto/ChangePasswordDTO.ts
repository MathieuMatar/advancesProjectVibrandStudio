import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

/**
 * GraphQL input for changing a user's password.
 */
@InputType()
export class ChangePasswordDTO {
  /** Current password for verification. */
  @Field()
  @IsString()
  oldPassword: string;

  /** New password the user wants to set. */
  @Field()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  newPassword: string;
}
