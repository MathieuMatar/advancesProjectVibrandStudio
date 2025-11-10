import { Module } from '@nestjs/common';
import { MilestonesResolver } from './milestones.resolver';
import { MilestonesService } from './milestones.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MilestonesResolver, MilestonesService],
  exports: [MilestonesService],
})
export class MilestonesModule {}
