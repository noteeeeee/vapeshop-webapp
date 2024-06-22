import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryEntity } from './entities';
import { Repository } from 'typeorm';
import { DeliveryUpsertDto } from './dto';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(DeliveryEntity)
    private readonly deliveryRepository: Repository<DeliveryEntity>,
  ) {}

  async findOne(userID: number): Promise<DeliveryEntity | undefined> {
    return this.deliveryRepository.findOneBy({ userID });
  }

  async upsert(userID: number, deliveryDto: DeliveryUpsertDto) {
    await this.deliveryRepository.upsert({ ...deliveryDto, userID }, [
      'userID',
    ]);
    return this.findOne(userID);
  }
}
