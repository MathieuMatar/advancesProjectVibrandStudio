import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Client } from '../../clients/models/client.model';
import { Milestone } from '../../milestones/models/milestone.model';
import { Task } from '../../tasks/models/task.model';
import { Service } from '../../services/models/service.model';
import { User } from '../../users/models/user.model';
import { Status } from '../../common/status.enum';

/**
 * GraphQL object type representing a project and its relations.
 */
@ObjectType()
export class Project {
  /** Unique identifier. */
  @Field(() => Int)
  id: number;

  /** Project name. */
  @Field()
  name: string;

  /** Optional project code. */
  @Field({ nullable: true })
  code?: string;

  /** Project description. */
  @Field({ nullable: true })
  description?: string;

  /** Linked client id. */
  @Field(() => Int, { nullable: true })
  clientId?: number;

  /** Linked client entity. */
  @Field(() => Client, { nullable: true })
  client?: Client | null;

  /** Overview or summary. */
  @Field({ nullable: true })
  overview?: string;

  /** Files reference. */
  @Field({ nullable: true })
  files?: string;

  /** Primary image. */
  @Field({ nullable: true })
  image?: string;

  /** Gallery images. */
  @Field(() => [String], { nullable: 'itemsAndList' })
  images?: string[];

  /** Whether the project is public. */
  @Field(() => Boolean)
  public: boolean;

  /** Current project status. */
  @Field(() => Status)
  status: Status;

  /** Associated milestones. */
  @Field(() => [Milestone], { nullable: 'itemsAndList' })
  milestones?: Milestone[];

  /** Associated tasks. */
  @Field(() => [Task], { nullable: 'itemsAndList' })
  tasks?: Task[];

  /** Services linked to the project. */
  @Field(() => [Service], { nullable: 'itemsAndList' })
  services?: Service[];

  /** Users assigned to the project. */
  @Field(() => [User], { nullable: 'itemsAndList' })
  users?: User[];

  /** Creation timestamp. */
  @Field(() => String)
  createdAt: Date;

  /** Last update timestamp. */
  @Field(() => String)
  updatedAt: Date;
}
