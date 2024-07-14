import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { createHmac } from 'crypto';
import { EnvConfig } from '@vapeshop-webapp/config';

@Injectable()
export class WebAppStrategy extends PassportStrategy(Strategy, 'webapp') {
  constructor(private readonly usersService: UsersService) {
    super({
      passReqToCallback: true,
    });
  }

  private hexToObject(hexString: string) {
    const uint8Array = new Uint8Array(
      hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)),
    );

    const jsonStr = new TextDecoder().decode(uint8Array);

    return JSON.parse(jsonStr);
  }

  private splitIgnoringJson(input: string) {
    const parts: string[] = [];
    let currentPart = '';
    let insideJson = false;
    let jsonDepth = 0;

    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      if (char === '{') {
        insideJson = true;
        jsonDepth++;
      } else if (char === '}') {
        jsonDepth--;
      }

      if (!insideJson && char === '&') {
        if (currentPart.trim() !== '') {
          parts.push(currentPart);
        }
        currentPart = '';
      } else {
        currentPart += char;
      }

      if (jsonDepth === 0 && insideJson) {
        insideJson = false;
        parts.push(currentPart);
        currentPart = '';
      }
    }

    if (currentPart.trim() !== '') {
      parts.push(currentPart);
    }

    return parts;
  }

  async authenticate(request: Request, options?: any) {
    const initData = request.headers['authorization'] as string;
    const encoded = this.hexToObject(initData);

    const secret = createHmac('sha256', 'WebAppData').update(
      EnvConfig.TELEGRAM_BOT_TOKEN,
    );

    const arr = this.splitIgnoringJson(encoded);
    const hashIndex = arr.findIndex((str) => str.startsWith('hash='));
    const hash = arr.splice(hashIndex)[0].split('=')[1];
    arr.sort((a, b) => a.localeCompare(b));

    const dataCheckString = arr.join('\n');
    const _hash = createHmac('sha256', secret.digest())
      .update(dataCheckString)
      .digest('hex');

    if (_hash !== hash) {
      return this.fail(new UnauthorizedException());
    }

    const user = this.extractUser(arr);
    if (!user) {
      return this.fail(new UnauthorizedException());
    }

    const validatedUser = await this.usersService.findOneByID(user.id);
    if (!validatedUser) {
      return this.fail(new UnauthorizedException());
    }

    this.success(validatedUser);
  }

  private extractUser(
    arr: string[],
  ): { id: number; [key: string]: any } | undefined {
    const userDataString = arr.find((str) => str.startsWith('user='));
    if (!userDataString) return undefined;

    try {
      return JSON.parse(userDataString.split('=')[1]);
    } catch (error) {
      return undefined;
    }
  }
}
