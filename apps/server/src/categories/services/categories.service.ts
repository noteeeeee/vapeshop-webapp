import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';
import {runOnTransactionRollback, Transactional} from "typeorm-transactional";
import {StorageService} from "../../storage";
import {omit, pick} from "lodash";

@Injectable()
export class CategoriesService {
  constructor(
      private storageService: StorageService,
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

  @Transactional()
  async create(data: CreateCategoryDto) {
    runOnTransactionRollback(() => {
      if (data.image) this.storageService.revert(data.image);
    });

    const category = this.categoriesRepo.create(data);
    const [image] = await this.storageService.commit([data.image]);
    category.image = image;

    return await this.categoriesRepo.save(category);
  }

  @Transactional()
  async update(id: number, data: UpdateCategoryDto) {
    runOnTransactionRollback(() => {
      if (data.image) this.storageService.revert(data.image);
    });

    const category = await this.findOne(id);
    if (!category) throw new NotFoundException();

    const [image] = await this.storageService.commit(
        [data.image],
        [category.image],
    );
    category.image = image;

    const entity = Object.assign(data, pick(category, 'image'));
    await this.categoriesRepo.update({ id }, entity);
    return this.findOne(id);
  }

  async delete(id: number) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException();

    const result = await this.categoriesRepo.delete({ id });
    return result.affected > 0;
  }
}
