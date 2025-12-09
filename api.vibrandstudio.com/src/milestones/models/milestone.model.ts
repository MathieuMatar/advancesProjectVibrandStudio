import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Project } from '../../projects/models/project.model';
import { Status } from '../../common/status.enum';

/**
 * GraphQL object type representing a project milestone.
 */
@ObjectType()
export class Milestone {
  /** Unique identifier. */
  @Field(() => Int)
  id: number;

  /** Associated project entity. */
  @Field(() => Project)
  project: Project;

  /** Foreign key to project. */
  @Field(() => Int)
  projectId: number;

  /** Milestone title. */
  @Field()
  name: string;

  /** Optional description. */
  @Field({ nullable: true })
  description?: string;

  /** Optional start/occurence date. */
  @Field(() => Date, { nullable: true })
  date?: Date;

  /** Due date for milestone completion. */
  @Field(() => Date, { nullable: true })
  dueDate?: Date;

  /** Current status value. */
  @Field(() => Status)
  status: Status;

  /** Creation timestamp. */
  @Field(() => String)
  createdAt: Date;

  /** Last update timestamp. */
  @Field(() => String)
  updatedAt: Date;
}
