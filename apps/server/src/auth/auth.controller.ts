import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController, TransformResponse } from '../common';
import {
  ApiTags,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { User } from './decorators';
import { UserDto, UserEntity } from '../users';

@ApiExcludeController()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Get('me')
  @ApiOkResponse({ type: UserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOperation({
    summary: 'Get current user',
    description: 'Retrieve the current authenticated user profile.',
  })
  @TransformResponse(UserDto)
  me(@User() user: UserEntity) {
    return user;
  }
}
