import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Employee } from '../../employees/models/employee.model';
import { Client } from '../../clients/models/client.model';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  //password was exculded to not be exposed

  @Field({ nullable: true })
  position?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  image?: string;

  @Field(() => Int)
  accessLevel: number;

  @Field(() => Int, { nullable: true })
  companyId?: number;

  @Field(() => Client, { nullable: true })
  company?: Client | null;

  @Field(() => Employee, { nullable: true })
  employee?: Employee | null;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
