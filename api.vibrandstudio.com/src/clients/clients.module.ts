import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsResolver } from './clients.resolver';
import { ClientTypesService } from './clienttypes.service';
import { ClientTypesResolver } from './clienttypes.resolver';

/**
 * Aggregates client and client type resolvers/services.
 */
@Module({
  providers: [ClientsService, ClientsResolver, ClientTypesService, ClientTypesResolver],
})
export class ClientsModule {}
