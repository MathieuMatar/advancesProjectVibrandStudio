import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Employee } from '../../employees/models/employee.model';
import { Client } from '../../clients/models/client.model';

/**
 * GraphQL object type representing an application user.
 */
@ObjectType()
export class User {
  /** Unique identifier. */
  @Field(() => Int)
  id: number;

  /** Display name. */
  @Field()
  name: string;

  //password was exculded to not be exposed

  /** Position or title. */
  @Field({ nullable: true })
  position?: string;

  /** Email address. */
  @Field({ nullable: true })
  email?: string;

  /** Phone number. */
  @Field({ nullable: true })
  phone?: string;

  /** Profile image reference. */
  @Field({ nullable: true })
  image?: string;

  /** Access level numeric value. */
  @Field(() => Int)
  accessLevel: number;

  /** Linked company id. */
  @Field(() => Int, { nullable: true })
  companyId?: number;

  /** Linked company (client) entity. */
  @Field(() => Client, { nullable: true })
  company?: Client | null;

  /** Linked employee entity. */
  @Field(() => Employee, { nullable: true })
  employee?: Employee | null;

  /** Creation timestamp. */
  @Field(() => String)
  createdAt: Date;

  /** Last update timestamp. */
  @Field(() => String)
  updatedAt: Date;
}
