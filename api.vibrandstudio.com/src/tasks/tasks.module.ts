import { Module } from '@nestjs/common';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TaskGateway } from './task.gateway';

/**
 * Provides task resolvers, service, and WebSocket gateway for task events.
 */
@Module({
  imports: [PrismaModule],
  providers: [TasksResolver, TasksService, TaskGateway],
  exports: [TasksService],
})
export class TasksModule {}
