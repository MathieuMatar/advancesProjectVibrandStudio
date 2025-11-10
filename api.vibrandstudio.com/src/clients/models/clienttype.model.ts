import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Client } from './client.model';

@ObjectType()
export class ClientType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  image?: string;

  @Field(() => [Client], { nullable: 'itemsAndList' })
  clients?: Client[];
}
