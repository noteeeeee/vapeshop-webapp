import { HttpStatus, Injectable } from '@nestjs/common';
import path from 'path';
import { TRANSFER_DIR, UPLOAD_DIR } from './storage.config';
import { nanoid } from 'nanoid';
import fs from 'fs';
import { Cron, CronExpression } from '@nestjs/schedule';
import mime from 'mime-types';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageEntity } from './storage.entity';
import { LessThan, Repository } from 'typeorm';
import map from 'lodash/map';
import * as util from 'util';

const readdirAsync = util.promisify(fs.readdir);
const statAsync = util.promisify(fs.stat);

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(StorageEntity)
    private storageRepo: Repository<StorageEntity>,
  ) {}

  process(file: Express.Multer.File) {
    // Generate a unique ID for the upload
    const uniqueId = nanoid(); // Example of generating a unique ID

    // Create a directory for the temporary upload if it doesn't exist
    const tempDir = path.join(TRANSFER_DIR, uniqueId);
    fs.mkdirSync(tempDir, { recursive: true });

    // Save the uploaded file to the temporary directory
    const filePath = path.join(tempDir, file.originalname);
    fs.writeFileSync(filePath, file.buffer);

    // Return the unique ID to FilePond
    return uniqueId;
  }

  revert(id: string) {
    // Construct the path to the temporary folder
    const tempDir = path.join(TRANSFER_DIR, id);

    // Check if the directory exists
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true });
    }
  }

  private async getDirectorySize(directoryPath: string): Promise<number> {
    let totalSize = 0;

    const files = await readdirAsync(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stats = await statAsync(filePath);

      if (stats.isFile()) {
        totalSize += stats.size;
      } else if (stats.isDirectory()) {
        totalSize += await this.getDirectorySize(filePath); // Recursively calculate size of subdirectories
      }
    }

    return totalSize;
  }

  async load(sources: string, res: any) {
    try {
      const [source, ...files] = sources.split('/');
      const file = files.join('/');

      const fileInRepo = await this.storageRepo.findOneBy({ id: source });
      if (fileInRepo) {
        let filePath: string | undefined;
        if (file) {
          filePath = path.resolve(UPLOAD_DIR, fileInRepo.filename, file);
          if (!filePath.startsWith(UPLOAD_DIR)) {
            filePath = path.join(UPLOAD_DIR, fileInRepo.filename);
          }
        } else {
          filePath = path.join(UPLOAD_DIR, fileInRepo.filename);
        }

        // Check if the file exists in the UPLOAD_DIR
        if (fs.existsSync(filePath)) {
          if (fs.lstatSync(filePath).isDirectory()) {
            res.set({
              'Content-Disposition': `inline; filename="${fileInRepo.originalFilename}"`,
              'Content-Type': 'application/octet-stream',
            });

            res.end();
            return;
          }

          // Determine MIME type based on file extension
          const mimeType: string | false = mime.lookup(filePath);
          const contentType: string = mimeType || 'application/octet-stream';

          // Set the appropriate headers for the file
          res.set({
            'Content-Disposition': `inline; filename="${fileInRepo.originalFilename}"`,
            'Content-Type': contentType,
          });

          // Pipe the file from the UPLOAD_DIR to the response
          fs.createReadStream(filePath).pipe(res);
          return;
        }

        res.status(HttpStatus.NOT_FOUND).send('File not found');
      } else {
        const dirPath = path.join(TRANSFER_DIR, source); // Directory path
        const files = fs.readdirSync(dirPath); // Get files in the directory

        // Check if there are any files in the directory
        if (files.length === 0) {
          // If no files found, return 404
          res.status(HttpStatus.NOT_FOUND).send('No files found in directory');
          return;
        }

        // Get the first file from the directory
        const firstFile = files[0];
        const filePath = path.join(dirPath, firstFile); // Full path to the first file

        // Determine MIME type based on file extension
        const mimeType: string | false = mime.lookup(filePath);
        const contentType: string = mimeType || 'application/octet-stream';

        // Set the appropriate headers for the file
        res.set({
          'Content-Disposition': `inline; filename="${firstFile}"`,
          'Content-Type': contentType,
        });

        // Pipe the file to the response
        fs.createReadStream(filePath).pipe(res);
      }
    } catch (error) {
      console.log(error)
      // If any error occurs, return 500
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Internal server error');
    }
  }

  async commit(files: string[], oldFiles?: string[], expireIn?: Date) {
    if (
      oldFiles &&
      oldFiles.length === files.length &&
      oldFiles.every((f) => files.includes(f))
    ) {
      return files;
    }

    let destinationFiles: string[] = [];

    // Iterate through each temp file ID
    for (const fileId of files) {
      if (oldFiles && oldFiles.includes(fileId)) continue;

      // Construct the source and destination directory paths
      const sourceDirPath = path.join(TRANSFER_DIR, fileId);

      // Check if the source directory exists
      if (!fs.existsSync(sourceDirPath)) continue;

      const filesInDir = fs.readdirSync(sourceDirPath);
      const firstFile = filesInDir[0];
      if (!firstFile) continue;

      const originalFilename = firstFile;
      const extension = path.extname(originalFilename);
      const newFilename = fileId + extension;

      const source = path.join(sourceDirPath, firstFile);
      const target = path.join(UPLOAD_DIR, newFilename);
      fs.renameSync(source, target);
      fs.rmSync(sourceDirPath, { recursive: true });

      // Create a corresponding entity in the repository
      const fileEntity = this.storageRepo.create({
        id: fileId,
        filename: newFilename,
        originalFilename,
        expireIn,
      });

      await this.storageRepo.save(fileEntity);
      destinationFiles.push(fileId);
    }

    if (oldFiles) {
      const deletedFiles = oldFiles.filter((f) => !files.includes(f));
      for (const fileId of deletedFiles) {
        const fileEntity = await this.storageRepo.findOneBy({ id: fileId });
        if (fileEntity) {
          await this.storageRepo.remove(fileEntity);
          const filePath = path.join(UPLOAD_DIR, fileEntity.filename);
          if (fs.existsSync(filePath)) {
            if (fs.statSync(filePath).isDirectory()) {
              fs.rmSync(filePath, { recursive: true });
            } else {
              fs.unlinkSync(filePath);
            }
          }
        }
      }
    }

    return destinationFiles;
  }

  async delete(files: string[]) {
    for (const fileId of files) {
      const fileEntity = await this.storageRepo.findOneBy({ id: fileId });
      if (fileEntity) {
        await this.storageRepo.remove(fileEntity);
        const filePath = path.join(UPLOAD_DIR, fileId);
        if (fs.existsSync(filePath)) {
          if (fs.statSync(filePath).isDirectory()) {
            fs.rmSync(filePath, { recursive: true });
          } else {
            fs.unlinkSync(filePath);
          }
        }
      }
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async deleteExpiredFiles() {
    const expiredFiles = await this.storageRepo.find({
      where: {
        expireIn: LessThan(new Date()),
      },
    });

    await this.delete(map(expiredFiles, 'id'));
  }

  @Cron(CronExpression.EVERY_SECOND)
  async deleteOldTempDirs() {
    // Get a list of all directories in the TRANSFER_DIR
    const dirs = fs
      .readdirSync(TRANSFER_DIR, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    // Iterate over each directory
    for (const dir of dirs) {
      // Get the creation time of the directory
      const dirPath = path.join(TRANSFER_DIR, dir);
      const stats = fs.statSync(dirPath);
      const creationTime = stats.birthtimeMs;

      // Check if the directory is older than 24 hours
      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      if (now - creationTime > twentyFourHours) {
        // Delete the directory and its contents
        fs.rmSync(dirPath, { recursive: true });
      }
    }
  }
}
