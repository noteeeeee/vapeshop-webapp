import {
  Controller,
  Get,
  Header,
  NotFoundException,
  Res,
} from '@nestjs/common';
import {ApiOperation, ApiProduces, ApiResponse, ApiTags} from '@nestjs/swagger';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import axios from 'axios';
import { User } from '../auth/decorators';
import { UserEntity } from '../users';
import { Response } from "express"

@Controller('bot')
@ApiTags('bot')
export class BotController {
  constructor(@InjectBot() private bot: Telegraf) {}

  @Get('avatar')
  @Header('Cache-Control', 'public, max-age=3600')
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
    try {
      const avatars = await this.bot.telegram.getUserProfilePhotos(
        user.id,
        undefined,
        1,
      );
      const photoId = avatars.photos?.[0]?.[0]?.file_id;
      const { href } = await this.bot.telegram.getFileLink(photoId);

      axios({
        method: 'get',
        url: href,
        responseType: 'stream',
      }).then(function (response) {
        response.data.pipe(res);
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
