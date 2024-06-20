export const VIRTUAL_COLUMN_KEY = Symbol('VIRTUAL_COLUMN_KEY');

/**
 * Check if a given column property has the VirtualColumn decorator.
 * @param queryBuilder The TypeORM query builder instance.
 * @param columnName The name of the column property to check.
 * @returns True if the property has the VirtualColumn decorator; false otherwise.
 */
export function hasVirtualColumnDecorator(
  queryBuilder: any,
  columnName: string,
): boolean {
  const targetEntity = queryBuilder.expressionMap.mainAlias!.target;
  const metaInfo =
    Reflect.getMetadata(VIRTUAL_COLUMN_KEY, targetEntity.prototype) || {};

  return !!metaInfo?.[columnName];
}

export function VirtualColumn(name?: string): PropertyDecorator {
  return (target, propertyKey) => {
    const metaInfo = Reflect.getMetadata(VIRTUAL_COLUMN_KEY, target) || {};

    metaInfo[propertyKey] = name ?? propertyKey;

    Reflect.defineMetadata(VIRTUAL_COLUMN_KEY, metaInfo, target);
  };
}
