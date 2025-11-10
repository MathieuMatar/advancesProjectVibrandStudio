import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Project } from '../../projects/models/project.model';
import { User } from '../../users/models/user.model';

@ObjectType()
export class Task {
  @Field(() => Int)
  id: number;

  @Field(() => Project, { nullable: true })
  project?: Project | null;

  @Field(() => Int, { nullable: true })
  projectId?: number;

  @Field(() => User, { nullable: true })
  createdBy?: User | null;

  @Field(() => Int, { nullable: true })
  createdById?: number;

  @Field(() => User, { nullable: true })
  assignedTo?: User | null;

  @Field(() => Int, { nullable: true })
  assignedToId?: number;

  @Field(() => User, { nullable: true })
  completedBy?: User | null;

  @Field(() => Int, { nullable: true })
  completedById?: number;

  @Field(() => Date, { nullable: true })
  dueDate?: Date;

  @Field()
  title: string;

  @Field({ nullable: true })
  details?: string;

  @Field({ nullable: true })
  important?: boolean;

  @Field(() => Int, { nullable: true })
  visibility?: number;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
