import fs from 'fs';
import { TRANSFER_DIR, UPLOAD_DIR } from './storage.config';

export const createStorageDirs = () => {
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, 0o755);
  if (!fs.existsSync(TRANSFER_DIR)) fs.mkdirSync(TRANSFER_DIR, 0o755);
};
