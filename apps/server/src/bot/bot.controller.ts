import {
  Controller,
  Get,
  Header,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiProduces,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import {Public, User} from '../auth/decorators';
import { UserEntity } from '../users';
import { Response } from 'express';
import { AvatarCacheService } from './avatar-cache.service';

@Controller('bot')
@ApiTags('bot')
export class BotController {
  constructor(private avatarCacheService: AvatarCacheService) {}

  @Get('avatar')
  @Header('Cache-Control', 'public, max-age=604800') // Cache for 1 week
  @ApiOperation({ summary: 'Get user avatar' })
  @ApiProduces('image/jpeg') // or the appropriate MIME type for the image
  @ApiResponse({
    status: 200,
    description: 'The avatar image',
    content: {
      'image/jpeg': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async avatar(@Res() res: Response, @User() user: UserEntity) {
    return this.getAvatarById(res, user.id.toString());
  }

  @Get('avatar/:id')
  @Header('Cache-Control', 'public, max-age=604800') // Cache for 1 week
  @ApiOperation({ summary: 'Get user avatar by ID' })
  @ApiProduces('image/jpeg') // or the appropriate MIME type for the image
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'The avatar image',
    content: {
      'image/jpeg': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async getAvatarById(@Res() res: Response, @Param('id') id: string) {
    try {
      const avatarPath = await this.avatarCacheService.getAvatar(id);
      res.sendFile(avatarPath);
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
