import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { UserEntity } from './user.entity';

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
