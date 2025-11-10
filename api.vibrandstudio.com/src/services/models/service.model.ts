import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Service {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  rate: number;

  @Field(() => Int)
  duration: number;

  @Field()
  active: boolean;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
