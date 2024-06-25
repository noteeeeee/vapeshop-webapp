import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { TransformResponse } from '../common';
import { User } from '../auth/decorators';
import { ReferralStatsDto, UserEntity } from '../users';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('referral-stats')
  @ApiOperation({ summary: 'Get referrer statistics' })
  @ApiOkResponse({
    description: 'Statistics retrieved successfully.',
    type: ReferralStatsDto,
  })
  @TransformResponse(ReferralStatsDto)
  async getStats(@User() user: UserEntity) {
    return this.usersService.getReferralsCount(user.id);
  }
}
