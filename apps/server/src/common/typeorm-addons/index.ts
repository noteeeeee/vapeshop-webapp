import { SelectQueryBuilder } from 'typeorm';
import { VIRTUAL_COLUMN_KEY } from './decorators';

declare module 'typeorm' {
  interface SelectQueryBuilder<Entity> {
    getManyAndCountForPagination(): Promise<[Entity[], number]>;
    getOneWithVirtualColumn(): Promise<Entity>;
  }
}

export function initTypeORMAddons() {
  SelectQueryBuilder.prototype.getManyAndCountForPagination =
    async function () {
      const { entities, raw } = await this.getRawAndEntities();
      const total = await this.getCount();

      const items = entities.map((entitiy, index) => {
        const metaInfo = Reflect.getMetadata(VIRTUAL_COLUMN_KEY, entitiy) ?? {};
        const item = raw[index];

        for (const [propertyKey, name] of Object.entries<string>(metaInfo)) {
          entitiy[propertyKey] = item[name];
        }

        return entitiy;
      });

      return [items, total];
    };

  SelectQueryBuilder.prototype.getOneWithVirtualColumn = async function () {
    const { entities, raw } = await this.take(1).getRawAndEntities();
    if (!entities?.length) return undefined;

    const entity = entities[0];
    const metaInfo = Reflect.getMetadata(VIRTUAL_COLUMN_KEY, entity) ?? {};
    const item = raw[0];

    for (const [propertyKey, name] of Object.entries<string>(metaInfo)) {
      entity[propertyKey] = item[name];
    }

    return entity;
  };
}

export * from './decorators';
export * from './transformers';
