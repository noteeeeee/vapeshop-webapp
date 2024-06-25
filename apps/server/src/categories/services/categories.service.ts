import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoriesRepo: Repository<CategoryEntity>,
  ) {}

  find() {
    return this.categoriesRepo.find();
  }

  findOne(id: number) {
    return this.categoriesRepo.findOne({
      where: { id },
    });
  }

  async create(data: CreateCategoryDto) {
    const category = this.categoriesRepo.create(data);
    return await this.categoriesRepo.save(category);
  }

  async update(id: number, data: UpdateCategoryDto) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException();

    await this.categoriesRepo.update({ id }, data);
    return this.findOne(id);
  }

  async delete(id: number) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException();

    const result = await this.categoriesRepo.delete({ id });
    return result.affected > 0;
  }
}
