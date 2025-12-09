import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesResolver } from './services.resolver';

/**
 * Nest module that wires service domain providers and resolvers.
 */
@Module({
  providers: [ServicesService, ServicesResolver],
})
export class ServicesModule {}
