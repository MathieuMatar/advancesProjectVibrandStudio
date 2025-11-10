import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  Upcoming = 'Upcoming',
  Pending = 'Pending',
  InProgress = 'InProgress',
  Completed = 'Completed',
}

registerEnumType(Status, {
  name: 'Status',
  description: 'Project/Milestone/Task status enum',
});

export default Status;
