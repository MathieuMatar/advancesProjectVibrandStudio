import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Client } from '../../clients/models/client.model';
import { Milestone } from '../../milestones/models/milestone.model';
import { Task } from '../../tasks/models/task.model';
import { Service } from '../../services/models/service.model';
import { User } from '../../users/models/user.model';
import { Status } from '../../common/status.enum';

@ObjectType()
export class Project {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  code?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  clientId?: number;

  @Field(() => Client, { nullable: true })
  client?: Client | null;

  @Field({ nullable: true })
  overview?: string;

  @Field({ nullable: true })
  files?: string;

  @Field({ nullable: true })
  image?: string;

  @Field(() => Boolean)
  public: boolean;

  @Field(() => Status)
  status: Status;

  @Field(() => [Milestone], { nullable: 'itemsAndList' })
  milestones?: Milestone[];

  @Field(() => [Task], { nullable: 'itemsAndList' })
  tasks?: Task[];

  @Field(() => [Service], { nullable: 'itemsAndList' })
  services?: Service[];

  @Field(() => [User], { nullable: 'itemsAndList' })
  users?: User[];

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
