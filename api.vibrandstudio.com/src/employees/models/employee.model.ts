import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';

@ObjectType()
export class Employee {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field({ nullable: true })
  fatherName?: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  position?: string;

  @Field({ nullable: true })
  info?: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;

  @Field(() => User)
  user: User;
}
