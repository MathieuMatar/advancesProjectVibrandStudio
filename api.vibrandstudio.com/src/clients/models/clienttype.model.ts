import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Client } from './client.model';

/**
 * GraphQL object type representing a client category/type.
 */
@ObjectType()
export class ClientType {
  /** Unique identifier. */
  @Field(() => Int)
  id: number;

  /** Display name. */
  @Field()
  name: string;

  /** Optional image reference. */
  @Field({ nullable: true })
  image?: string;

  /** Clients belonging to this type. */
  @Field(() => [Client], { nullable: 'itemsAndList' })
  clients?: Client[];
}
