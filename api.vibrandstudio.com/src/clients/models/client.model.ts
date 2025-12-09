import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ClientType } from './clienttype.model';

/**
 * GraphQL object type representing a client.
 */
@ObjectType()
export class Client {
  /** Unique identifier. */
  @Field(() => Int)
  id: number;

  /** Client name. */
  @Field()
  name: string;

  /** Contact email. */
  @Field({ nullable: true })
  email?: string;

  /** Contact phone. */
  @Field({ nullable: true })
  phone?: string;

  /** Client address. */
  @Field({ nullable: true })
  address?: string;

  /** Associated client type id. */
  @Field(() => Int, { nullable: true })
  clientTypeId?: number;

  /** Linked client type entity. */
  @Field(() => ClientType, { nullable: true })
  clientType?: ClientType | null;

  /** Image asset reference. */
  @Field({ nullable: true })
  image?: string;

  /** Animation asset reference. */
  @Field({ nullable: true })
  animation?: string;

  /** Whether the client is active. */
  @Field(() => Boolean, { nullable: true })
  active?: boolean;

  /** Whether the client is public-facing. */
  @Field(() => Boolean, { nullable: true })
  public?: boolean;

  /** Creation timestamp. */
  @Field(() => String)
  createdAt: Date;

  /** Last update timestamp. */
  @Field(() => String)
  updatedAt: Date;
}
