import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { UserEntity } from './user.entity';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@Exclude()
export class UserDto {
  @Expose()
  @ApiProperty({
    example: 1234567890,
    description: 'The unique identifier for the user',
  })
  id: number;

  @Expose()
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  firstName: string;

  @Expose()
  @ApiProperty({
    example: 'john_doe',
    description: 'The username of the user',
    required: false,
  })
  username?: string;

  @Expose()
  @ApiProperty({
    example: true,
    description: 'Indicates if the user is active',
    required: false,
  })
  isActive?: boolean;

  @Expose()
  @ApiProperty({
    example: true,
    description: 'Indicates if the user is an admin',
    required: false,
  })
  isAdmin?: boolean;

  @Expose()
  @ApiProperty({
    example: false,
    description: 'Indicates if the user is banned',
    required: false,
  })
  isBanned?: boolean;

  @Expose()
  @ApiProperty({
    example: 100,
    description: 'The balance of the user',
    default: 0,
  })
  balance: number;

  @Expose()
  @ApiProperty({
    example: 100,
    description: 'The referral balance of the user',
    default: 0,
  })
  referralBalance: number;

  @Expose()
  @ApiProperty({
    example: 10,
    description: 'The discount for the user',
    required: false,
  })
  discount?: number;

  @Expose()
  @ApiProperty({
    example: '2024-06-19T12:34:56.789Z',
    description: 'The date when the user was last updated',
  })
  updated: Date;

  @Expose()
  @ApiProperty({
    example: '2024-06-19T12:34:56.789Z',
    description: 'The date when the user was created',
  })
  created: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class UserUpdateDto {
  @Expose()
  @ApiProperty({ description: 'Flag indicating if the user is banned' })
  @IsBoolean()
  @IsOptional()
  isBanned: boolean;

  @Expose()
  @ApiProperty({
    description: 'Flag indicating if the user is an administrator',
  })
  @IsBoolean()
  @IsOptional()
  isAdmin: boolean;

  @Expose()
  @ApiProperty({ description: 'The balance of the user' })
  @IsNumber()
  @IsOptional()
  balance: number;

  @Expose()
  @ApiProperty({ description: 'The referral balance of the user' })
  @IsNumber()
  @IsOptional()
  referralBalance: number;
}

@Exclude()
export class UsersStats {
  @Expose()
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  today: number;

  @Expose()
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  total: number;

  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class ReferralStatsDto {
  @Expose()
  @ApiProperty({
    description: 'Number of referrals associated with the partner',
  })
  referralCount: number;

  constructor(partial: any) {
    Object.assign(this, partial);
  }
}
