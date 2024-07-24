import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { ReferralStatsDto, UsersStats, UserUpdateDto } from './user.dto';
import { InjectDayjs, dayjs, paginate } from '../common';
import { PaginateConfig, PaginateQuery } from 'nestjs-paginate';

export const paginateConfig: PaginateConfig<UserEntity> = {
  sortableColumns: ['id', 'created'],
  defaultSortBy: [['id', 'DESC']],
  searchableColumns: ['id', 'firstName', 'username'],
  defaultLimit: 50,
};

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectDayjs() private dayjs: dayjs,
    @InjectRepository(UserEntity) private usersRepo: Repository<UserEntity>,
  ) {}

  paginate(query: PaginateQuery) {
    return paginate(query, this.usersRepo, paginateConfig);
  }

  findOneByUsernameOrID(id: number, username: string) {
    return this.usersRepo.findOneBy([
      { id: id || undefined },
      { username: username },
    ]);
  }

  findOneByID(id: number) {
    return this.usersRepo.findOne({ where: { id } });
  }

  findOne(
    where: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[],
  ) {
    return this.usersRepo.findOne({ where });
  }

  find(where: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[]) {
    return this.usersRepo.find({ where });
  }

  deleteByID(id: number) {
    return this.usersRepo.delete({ id });
  }

  updateByID(id: number, partial: DeepPartial<UserEntity>) {
    return this.usersRepo.update({ id }, partial);
  }

  async updateUserAdmin(
    currentUser: UserEntity,
    id: number,
    data: UserUpdateDto,
  ): Promise<UserEntity> {
    const user = await this.findOneByID(id);
    if (!user) throw new NotFoundException();

    if (
      currentUser.id === id &&
      data.isAdmin !== undefined &&
      data.isAdmin !== user.isAdmin
    ) {
      throw new ForbiddenException(
        'You cannot modify your own admin privileges.',
      );
    }

    await this.usersRepo.update({ id }, data);
    return Object.assign(user, data);
  }

  decrementReferralBalance(id: number, amount: number) {
    return this.usersRepo.decrement({ id }, 'referralBalance', amount);
  }

  incrementReferralBalance(id: number, amount: number) {
    return this.usersRepo.increment({ id }, 'referralBalance', amount);
  }

  decrementBalance(id: number, amount: number) {
    return this.usersRepo.decrement({ id }, 'balance', amount);
  }

  incrementBalance(id: number, amount: number) {
    return this.usersRepo.increment({ id }, 'balance', amount);
  }

  updateByUsername(username: string, partial: DeepPartial<UserEntity>) {
    return this.usersRepo.update({ username }, partial);
  }

  async createOrUpdate(id: number, partial: DeepPartial<UserEntity>) {
    try {
      const result = await this.usersRepo
        .createQueryBuilder()
        .insert()
        .values({ id, ...partial })
        .orUpdate(['isActive', 'username', 'firstName'], ['id'])
        .execute();
    } catch (e) {
      this.logger.error(e);
    }

    return this.findOneByID(id);
  }

  async getReferralsCount(referrerID: number): Promise<ReferralStatsDto> {
    const referralCount = await this.usersRepo
      .createQueryBuilder('user')
      .where('user.referrerID = :referrerID', { referrerID })
      .getCount();

    return {
      referralCount,
    };
  }

  async getStats(): Promise<UsersStats> {
    const todayStart = this.dayjs().startOf('day').toDate();

    const queryBuilder = this.usersRepo.createQueryBuilder('user');
    const today = await queryBuilder
      .where('user.created >= :todayStart', { todayStart })
      .getCount();
    const total = await queryBuilder.getCount();

    return { today, total };
  }
}
