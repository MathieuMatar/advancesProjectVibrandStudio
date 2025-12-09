import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailResolver } from './mail.resolver';
import { ConfigModule } from '@nestjs/config';

/**
 * Provides mailing services and GraphQL mutations for contact/newsletter flows.
 */
@Module({
  imports: [ConfigModule],
  providers: [MailService, MailResolver],
  exports: [MailService],
})
export class MailModule {}
