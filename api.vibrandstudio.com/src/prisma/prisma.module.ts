import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Exposes a singleton PrismaService across the application.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
