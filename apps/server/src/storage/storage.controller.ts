import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiExcludeController } from '../common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ALLOWED_FILES_FORMATS } from './storage.config';
import { SkipThrottle } from '@nestjs/throttler';
import {Public} from "../auth/decorators";

@ApiExcludeController()
@ApiTags('Storage')
@Controller('storage')
export class StorageController {
  constructor(private storageService: StorageService) {}

  @ApiBearerAuth()
  @Post('filepond/process')
  @UseInterceptors(
    FileInterceptor('filepond', {
      fileFilter: (req, file, cb) => {
        if (!ALLOWED_FILES_FORMATS.includes(file.mimetype)) {
          cb(new Error('Invalid file type'), false);
        } else {
          cb(null, true);
        }
      },
      limits: {
        fileSize: 200 * 1024 * 1024,
      },
    }),
  )
  @ApiOperation({ summary: 'Process file upload' })
  process(@UploadedFile() file: Express.Multer.File) {
    return this.storageService.process(file);
  }

  @ApiBearerAuth()
  @Delete('filepond/revert/:id')
  @ApiOperation({ summary: 'Revert file upload' })
  async revertUpload(@Param('id') id: string) {
    return this.storageService.revert(id);
  }

  @Public()
  @SkipThrottle()
  @Get('filepond/load')
  async loadFile(@Query('source') source: string, @Res() res: any) {
    return this.storageService.load(source, res);
  }
}
