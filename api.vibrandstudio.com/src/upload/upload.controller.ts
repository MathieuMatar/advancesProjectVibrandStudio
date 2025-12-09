import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, basename } from 'path';
import { UploadService } from './upload.service';
import { Public } from '../auth/public.decorator';

// Local MulterFile shape to avoid depending on exported member from 'multer'
// (some @types/express/@types/multer combinations cause the namespace
// augmentation to be unavailable). This mirrors the typical multer File.
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination?: string;
  filename?: string;
  path?: string;
  buffer?: Buffer;
}

const ALLOWED_MIME = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/svg+xml',
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-ms-wmv',
];

/**
 * REST controller handling file uploads.
 */
@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          // save to project uploads folder; main.ts already ensures it exists
          cb(null, './uploads');
        },
        filename: (req, file, cb) => {
          const timestamp = Date.now();
          const random = Math.floor(Math.random() * 1e6);
          const fileExt = extname(file.originalname) || '';
          const safeName = `${timestamp}-${random}${fileExt}`;
          cb(null, safeName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (ALLOWED_MIME.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Only images or videos are allowed'), false);
        }
      },
      limits: {
        fileSize: 200 * 1024 * 1024, // 200MB max
      },
    })
  )
  /**
   * Accepts a single uploaded file and returns its stored path.
   */
  @Public()
  async uploadFile(@UploadedFile() file: MulterFile) {
    if (!file) throw new BadRequestException('No file uploaded');

    // Ensure we pass a concrete string filename to the service.
    // `file.filename` is set by our diskStorage filename generator, but
    // TypeScript marks it optional on the MulterFile interface. Derive a
    // fallback from `file.path` or `file.originalname` to satisfy typing and
    // avoid runtime undefined.
    const filename: string =
      file.filename ?? (file.path ? basename(file.path) : file.originalname);

    // return path WITHOUT the '/uploads' prefix per request
    return { path: `/${filename}` };
  }
}
