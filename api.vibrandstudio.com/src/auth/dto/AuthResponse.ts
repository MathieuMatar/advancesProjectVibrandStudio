import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';

/**
 * GraphQL payload returned after authentication operations.
 */
@ObjectType()
export class AuthResponse {
  /** Signed JWT access token. */
  @Field()
  token: string;

  /** Authenticated user details. */
  @Field(() => User)
  user: User;
}
