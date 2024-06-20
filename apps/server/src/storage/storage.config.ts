import path from 'path';
import * as process from 'process';

export const ALLOWED_FILES_FORMATS = [
  'image/jpeg',
  'image/gif',
  'image/png',
  'image/webp',
];

export const UPLOAD_DIR = path.join(process.cwd(), '../../uploads');
export const TRANSFER_DIR = path.join(UPLOAD_DIR, 'tmp');
