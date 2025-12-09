import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';

/**
 * GraphQL object type representing an employee.
 */
@ObjectType()
export class Employee {
  /** Unique identifier. */
  @Field(() => Int)
  id: number;

  /** Given name. */
  @Field()
  firstName: string;

  /** Optional paternal name. */
  @Field({ nullable: true })
  fatherName?: string;

  /** Family name. */
  @Field()
  lastName: string;

  /** Position or title. */
  @Field({ nullable: true })
  position?: string;

  /** Optional bio/info. */
  @Field({ nullable: true })
  info?: string;

  /** Creation timestamp. */
  @Field(() => String)
  createdAt: Date;

  /** Last update timestamp. */
  @Field(() => String)
  updatedAt: Date;

  /** Linked user account. */
  @Field(() => User)
  user: User;
}
