import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Project } from '../../projects/models/project.model';
import { User } from '../../users/models/user.model';

/**
 * GraphQL object type representing a task.
 */
@ObjectType()
export class Task {
  /** Unique identifier. */
  @Field(() => Int)
  id: number;

  /** Linked project entity. */
  @Field(() => Project, { nullable: true })
  project?: Project | null;

  /** Foreign key to project. */
  @Field(() => Int, { nullable: true })
  projectId?: number;

  /** User who created the task. */
  @Field(() => User, { nullable: true })
  createdBy?: User | null;

  /** Creator user id. */
  @Field(() => Int, { nullable: true })
  createdById?: number;

  /** Assigned user entity. */
  @Field(() => User, { nullable: true })
  assignedTo?: User | null;

  /** Assigned user id. */
  @Field(() => Int, { nullable: true })
  assignedToId?: number;

  /** User who completed the task. */
  @Field(() => User, { nullable: true })
  completedBy?: User | null;

  /** Completion user id. */
  @Field(() => Int, { nullable: true })
  completedById?: number;

  /** Due date. */
  @Field(() => Date, { nullable: true })
  dueDate?: Date;

  /** Task title. */
  @Field()
  title: string;

  /** Additional details. */
  @Field({ nullable: true })
  details?: string;

  /** Importance flag. */
  @Field({ nullable: true })
  important?: boolean;

  /** Visibility level. */
  @Field(() => Int, { nullable: true })
  visibility?: number;

  /** Creation timestamp. */
  @Field(() => String)
  createdAt: Date;

  /** Last update timestamp. */
  @Field(() => String)
  updatedAt: Date;
}
