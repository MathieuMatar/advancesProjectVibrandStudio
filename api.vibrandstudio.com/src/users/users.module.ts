import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';

/**
 * Provides user resolvers and service backed by Prisma.
 */
@Module({
  imports: [PrismaModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
