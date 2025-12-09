import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

/**
 * GraphQL input for authenticating a user.
 */
@InputType('LoginInput')
export class LoginDTO {
  /** Account email address. */
  @IsEmail()
  @Field()
  email: string;

  /** Plaintext password. */
  @IsString()
  @Field()
  password: string;
}
