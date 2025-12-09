import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

/**
 * Handles filesystem concerns for uploads.
 */
@Injectable()
export class UploadService {
  private uploadsRoot = join(__dirname, '..', '..', 'uploads');

  /** Ensures uploads directory exists. */
  ensureUploadsDir() {
    if (!existsSync(this.uploadsRoot)) {
      mkdirSync(this.uploadsRoot, { recursive: true });
    }
  }

  // Returns relative path to saved file (e.g. /uploads/filename.ext)
  filePathFor(filename: string): string {
    return `/uploads/${filename}`;
  }
}
