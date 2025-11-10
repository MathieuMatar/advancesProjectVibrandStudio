import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Project } from '../../projects/models/project.model';
import { Status } from '../../common/status.enum';

@ObjectType()
export class Milestone {
  @Field(() => Int)
  id: number;

  @Field(() => Project)
  project: Project;

  @Field(() => Int)
  projectId: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Date, { nullable: true })
  date?: Date;

  @Field(() => Date, { nullable: true })
  dueDate?: Date;

  @Field(() => Status)
  status: Status;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
