import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

/**
 * GraphQL object type representing a service offering.
 */
@ObjectType()
export class Service {
  /** Unique identifier for the service. */
  @Field(() => Int)
  id: number;

  /** Human readable name. */
  @Field()
  name: string;

  /** Optional description of the service. */
  @Field({ nullable: true })
  description?: string;

  /** Billing rate for the service. */
  @Field(() => Float)
  rate: number;

  /** Duration in weeks. */
  @Field(() => Int)
  duration: number;

  /** Indicates if the service is active. */
  @Field()
  active: boolean;

  /** Timestamp of creation. */
  @Field(() => String)
  createdAt: Date;

  /** Timestamp of last update. */
  @Field(() => String)
  updatedAt: Date;
}
