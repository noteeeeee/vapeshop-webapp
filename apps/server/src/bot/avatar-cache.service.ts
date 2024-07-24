import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import axios from 'axios';
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  statSync,
  unlinkSync,
  readdirSync
} from 'fs';
import * as path from 'path';
import * as process from "node:process";
import {Cron, CronExpression} from "@nestjs/schedule";

@Injectable()
export class AvatarCacheService {
  private avatarCacheDir = path.join(process.cwd(), '..', '..', 'cache', 'avatars');
  private oneWeekInMs = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds

  constructor(@InjectBot() private bot: Telegraf) {
    // Ensure the cache directory exists
    if (!existsSync(this.avatarCacheDir)) {
      mkdirSync(this.avatarCacheDir, { recursive: true });
    }
  }

  async getAvatar(userId: string): Promise<string> {
    const avatarPath = path.join(this.avatarCacheDir, `${userId}.jpg`);
    const now = Date.now();

    // Check if the file exists and is not older than one week
    if (existsSync(avatarPath)) {
      const stats = statSync(avatarPath);
      const fileAge = now - stats.mtimeMs;

      if (fileAge < this.oneWeekInMs) {
        return avatarPath;
      } else {
        // Delete old file
        unlinkSync(avatarPath);
      }
    }

    try {
      const avatars = await this.bot.telegram.getUserProfilePhotos(
        parseInt(userId),
        undefined,
        1,
      );
      const photoId = avatars.photos?.[0]?.[0]?.file_id;

      if (!photoId) {
        throw new NotFoundException('Avatar not found');
      }

      const { href } = await this.bot.telegram.getFileLink(photoId);

      const response = await axios({
        method: 'get',
        url: href,
        responseType: 'stream',
      });

      const writer = createWriteStream(avatarPath);
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(avatarPath));
        writer.on('error', reject);
      });
    } catch (e) {
      throw new NotFoundException('Avatar not found');
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanUpCache() {
    const now = Date.now();
    const files = readdirSync(this.avatarCacheDir);

    for (const file of files) {
      const filePath = path.join(this.avatarCacheDir, file);
      const stats = statSync(filePath);
      const fileAge = now - stats.mtimeMs;

      if (fileAge >= this.oneWeekInMs) {
        unlinkSync(filePath);
      }
    }
  }
}
