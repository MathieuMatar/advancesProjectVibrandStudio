import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ClientType } from './clienttype.model';

@ObjectType()
export class Client {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  address?: string;

  @Field(() => Int, { nullable: true })
  clientTypeId?: number;

  @Field(() => ClientType, { nullable: true })
  clientType?: ClientType | null;

  @Field({ nullable: true })
  image?: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
