import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryFilterEntity } from '../entities';
import { CreateFilterDto, UpdateFilterDto } from '../dto';
import { CategoriesService } from './categories.service';

@Injectable()
export class CategoryFiltersService {
  constructor(
    @InjectRepository(CategoryFilterEntity)
    private readonly filtersRepo: Repository<CategoryFilterEntity>,
    private categoriesService: CategoriesService,
  ) {}

  find(categoryID: number) {
    return this.filtersRepo.find({
      where: {
        categoryID,
      },
    });
  }

  findOne(id: number) {
    return this.filtersRepo.findOne({
      where: { id },
    });
  }

  async create(data: CreateFilterDto) {
    const category = await this.categoriesService.findOne(data.categoryID);
    if (!category) throw new NotFoundException('Category not found');

    const filter = this.filtersRepo.create(data);
    return await this.filtersRepo.save(filter);
  }

  async update(id: number, data: UpdateFilterDto) {
    const filter = await this.findOne(id);
    if (!filter) throw new NotFoundException();

    await this.filtersRepo.update({ id }, data);
    return this.findOne(id);
  }

  async delete(id: number) {
    const filter = await this.findOne(id);
    if (!filter) throw new NotFoundException();

    const result = await this.filtersRepo.delete({ id });
    return result.affected > 0;
  }
}
