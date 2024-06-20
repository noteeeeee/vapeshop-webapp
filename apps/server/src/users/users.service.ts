import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(UserEntity) private usersRepo: Repository<UserEntity>,
  ) {}

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
}
