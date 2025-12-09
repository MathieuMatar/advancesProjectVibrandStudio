import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

/**
 * Provides REST endpoint for file uploads and related helpers.
 */
@Module({
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
