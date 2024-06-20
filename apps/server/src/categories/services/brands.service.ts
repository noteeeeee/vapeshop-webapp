import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {BrandEntity} from "../entities";
import {CreateBrandDto, UpdateBrandDto} from "../dto";

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandsRepo: Repository<BrandEntity>,
  ) {}

  find() {
    return this.brandsRepo.find();
  }

  findOne(id: number) {
    return this.brandsRepo.findOne({
      where: { id },
    });
  }

  async create(data: CreateBrandDto) {
    const brand = this.brandsRepo.create(data);
    return await this.brandsRepo.save(brand);
  }

  async update(id: number, data: UpdateBrandDto) {
    const brand = await this.findOne(id);
    if (!brand) throw new NotFoundException();

    await this.brandsRepo.update({ id }, data);
    return this.findOne(id);
  }

  async delete(id: number) {
    const brand = await this.findOne(id);
    if (!brand) throw new NotFoundException();

    const result = await this.brandsRepo.delete({ id });
    return result.affected > 0;
  }
}
