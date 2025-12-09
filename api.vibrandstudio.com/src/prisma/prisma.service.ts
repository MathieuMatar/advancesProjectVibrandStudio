import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Thin wrapper around PrismaClient that hooks into Nest lifecycle events.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  /** Connect to the database when the Nest module initializes. */
  async onModuleInit() {
    await this.$connect();
  }

  /** Gracefully disconnect when the Nest module is destroyed. */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
