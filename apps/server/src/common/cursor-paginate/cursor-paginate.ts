import {
  Brackets,
  FindOperator,
  FindOptionsRelations,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { CursorPaginateQuery } from './cursor-paginate.decorator';
import { Logger, ServiceUnavailableException } from '@nestjs/common';
import {
  checkIsEmbedded,
  checkIsRelation,
  Column,
  extractVirtualProperty,
  fixColumnAlias,
  getPropertiesByColumnName,
  getQueryUrlComponents,
  isEntityKey,
  Order,
  positiveNumberOrDefault,
  RelationColumn,
  SortBy,
} from 'nestjs-paginate/lib/helper';
import { addFilter } from 'nestjs-paginate/lib/filter';
import { OrmUtils } from 'typeorm/util/OrmUtils';
import { DEFAULT_LIMIT, PaginateConfig, Paginated } from 'nestjs-paginate';
import { hasVirtualColumnDecorator } from '../typeorm-addons';
import { stringify, escape } from 'querystring';
import { mapKeys } from 'lodash';
import { WherePredicateOperator } from 'typeorm/query-builder/WhereClause';

const logger: Logger = new Logger('nestjs--cursor-paginate');

export class CursorPaginated<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    sortBy: SortBy<T>;
    search: string;
    select: string[];
    filter?: {
      [column: string]: string | string[];
    };
    cursor?: string;
    nextCursor?: string;
  };
  links: {
    current: string;
    next?: string;
  };
}

function generateWhereStatement<T>(
  queryBuilder: SelectQueryBuilder<T>,
  obj: FindOptionsWhere<T> | FindOptionsWhere<T>[],
) {
  const toTransform = Array.isArray(obj) ? obj : [obj];
  return toTransform
    .map((item) => flattenWhereAndTransform(queryBuilder, item).join(' AND '))
    .join(' OR ');
}

function flattenWhereAndTransform<T>(
  queryBuilder: SelectQueryBuilder<T>,
  obj: FindOptionsWhere<T>,
  separator = '.',
  parentKey = '',
) {
  return Object.entries(obj).flatMap(([key, value]) => {
    if (obj.hasOwnProperty(key)) {
      const joinedKey = parentKey ? `${parentKey}${separator}${key}` : key;

      if (
        typeof value === 'object' &&
        value !== null &&
        !(value instanceof FindOperator)
      ) {
        return flattenWhereAndTransform(
          queryBuilder,
          value as FindOptionsWhere<T>,
          separator,
          joinedKey,
        );
      } else {
        const property = getPropertiesByColumnName(joinedKey);
        const { isVirtualProperty, query: virtualQuery } =
          extractVirtualProperty(queryBuilder, property);
        const isRelation = checkIsRelation(queryBuilder, property.propertyPath);
        const isEmbedded = checkIsEmbedded(queryBuilder, property.propertyPath);
        const alias = fixColumnAlias(
          property,
          queryBuilder.alias,
          isRelation,
          isVirtualProperty,
          isEmbedded,
          virtualQuery,
        );
        const whereClause = queryBuilder['createWhereConditionExpression'](
          queryBuilder['getWherePredicateCondition'](alias, value),
        );

        const allJoinedTables =
          queryBuilder.expressionMap.joinAttributes.reduce(
            (acc, attr) => {
              acc[attr.alias.name] = true;
              return acc;
            },
            {} as Record<string, boolean>,
          );

        const allTablesInPath = property.column.split('.').slice(0, -1);
        const tablesToJoin = allTablesInPath.map((table, idx) => {
          if (idx === 0) {
            return table;
          }
          return [...allTablesInPath.slice(0, idx), table].join('.');
        });

        tablesToJoin.forEach((table) => {
          const pathSplit = table.split('.');
          const fullPath =
            pathSplit.length === 1
              ? ''
              : `_${pathSplit
                  .slice(0, -1)
                  .map((p) => p + '_rel')
                  .join('_')}`;
          const tableName = pathSplit[pathSplit.length - 1];
          const tableAliasWithProperty = `${queryBuilder.alias}${fullPath}.${tableName}`;
          const joinTableAlias = `${queryBuilder.alias}${fullPath}_${tableName}_rel`;

          const baseTableAlias = allJoinedTables[joinTableAlias];

          if (baseTableAlias) {
            return;
          } else {
            queryBuilder.leftJoin(tableAliasWithProperty, joinTableAlias);
          }
        });

        return whereClause;
      }
    }
  });
}

export type CursorPaginatedConfig<T> = PaginateConfig<T> & {
  cursorColumns: Column<T>[];
  defaultCursorColumn: Column<T>;
};

export async function cursorPaginate<T extends ObjectLiteral>(
  query: CursorPaginateQuery,
  repo: Repository<T> | SelectQueryBuilder<T>,
  config: CursorPaginatedConfig<T>,
): Promise<Paginated<T>> {
  const limit = positiveNumberOrDefault(
    query.limit,
    config.defaultLimit || DEFAULT_LIMIT,
  );
  const sortBy = [] as SortBy<T>;
  const searchBy: Column<T>[] = [];

  let [items, totalItems]: [T[], number] = [[], 0];

  const queryBuilder =
    repo instanceof Repository ? repo.createQueryBuilder('__root') : repo;

  if (config.relations) {
    const relations = Array.isArray(config.relations)
      ? OrmUtils.propertyPathsToTruthyObject(config.relations)
      : config.relations;
    const createQueryBuilderRelations = (
      prefix: string,
      relations: FindOptionsRelations<T> | RelationColumn<T>[],
      alias?: string,
    ) => {
      Object.keys(relations).forEach((relationName) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const relationSchema = relations![relationName]!;

        queryBuilder.leftJoinAndSelect(
          `${alias ?? prefix}.${relationName}`,
          `${alias ?? prefix}_${relationName}_rel`,
        );

        if (typeof relationSchema === 'object') {
          createQueryBuilderRelations(
            relationName,
            relationSchema,
            `${alias ?? prefix}_${relationName}_rel`,
          );
        }
      });
    };
    createQueryBuilderRelations(queryBuilder.alias, relations);
  }

  if (config.sortableColumns.length < 1) {
    const message = "Missing required 'sortableColumns' config.";
    logger.debug(message);
    throw new ServiceUnavailableException(message);
  }

  if (query.sortBy) {
    for (const order of query.sortBy) {
      if (
        isEntityKey(config.sortableColumns, order[0]) &&
        ['ASC', 'DESC'].includes(order[1])
      ) {
        sortBy.push(order as Order<T>);
      }
    }
  }

  if (!sortBy.length) {
    sortBy.push(
      ...(config.defaultSortBy || [[config.sortableColumns[0], 'ASC']]),
    );
  }

  for (const order of sortBy) {
    const columnProperties = getPropertiesByColumnName(order[0]);
    const { isVirtualProperty } = extractVirtualProperty(
      queryBuilder,
      columnProperties,
    );
    const hasVirtualColumn = hasVirtualColumnDecorator(
      queryBuilder,
      columnProperties.column,
    );
    const isRelation = checkIsRelation(
      queryBuilder,
      columnProperties.propertyPath,
    );
    const isEmbeded = checkIsEmbedded(
      queryBuilder,
      columnProperties.propertyPath,
    );
    let alias = fixColumnAlias(
      columnProperties,
      queryBuilder.alias,
      isRelation,
      isVirtualProperty,
      isEmbeded,
    );
    if (isVirtualProperty) {
      alias = `"${alias}"`;
    }
    if (hasVirtualColumn) {
      alias = columnProperties.column;
    }
    queryBuilder.addOrderBy(alias, order[1]);
  }

  function parseCursor(cursor: string) {
    const colonIndex = cursor.indexOf(':');
    const part1 = cursor.substring(0, colonIndex);
    let part2: any = cursor.substring(colonIndex + 1);

    if (Number(part2)) part2 = Number(part2);
    if (typeof part2 !== 'number' && Date.parse(part2)) part2 = new Date(part2);

    return [part1, part2];
  }

  if (query.cursor) {
    const [column, value] = parseCursor(query.cursor);
    if (config.cursorColumns.includes(column as Column<T>))
      queryBuilder.where(`${queryBuilder.alias}.${column} < :value`, {
        value,
      });
  }

  if (limit) {
    queryBuilder.take(limit);
  }

  if (config.select) {
    const selectColumns =
      typeof config.select === 'string' ? [config.select] : config.select;
    queryBuilder.select(selectColumns);
  }

  if (config.where && repo instanceof Repository) {
    const baseWhereStr = generateWhereStatement(queryBuilder, config.where);
    queryBuilder.andWhere(`(${baseWhereStr})`);
  }

  if (config.searchableColumns) {
    if (query.searchBy && !config.ignoreSearchByInQueryParam) {
      for (const column of query.searchBy) {
        if (isEntityKey(config.searchableColumns, column)) {
          searchBy.push(column);
        }
      }
    } else {
      searchBy.push(...config.searchableColumns);
    }
  }

  if (query.search && searchBy.length) {
    queryBuilder.andWhere(
      new Brackets((qb: SelectQueryBuilder<T>) => {
        for (const column of searchBy) {
          const property = getPropertiesByColumnName(column);
          const { isVirtualProperty, query: virtualQuery } =
            extractVirtualProperty(qb, property);
          const isRelation = checkIsRelation(qb, property.propertyPath);
          const isEmbeded = checkIsEmbedded(qb, property.propertyPath);
          const alias = fixColumnAlias(
            property,
            qb.alias,
            isRelation,
            isVirtualProperty,
            isEmbeded,
            virtualQuery,
          );

          const condition: WherePredicateOperator = {
            operator: 'ilike',
            parameters: [alias, `:${property.column}`],
          };

          if (
            ['postgres', 'cockroachdb'].includes(
              queryBuilder.connection.options.type,
            )
          ) {
            condition.parameters[0] = `CAST(${condition.parameters[0]} AS text)`;
          }

          qb.orWhere(qb['createWhereConditionExpression'](condition), {
            [property.column]: `%${query.search}%`,
          });
        }
      }),
    );
  }

  if (query.filter) {
    addFilter(queryBuilder, query, config.filterableColumns);
  }

  [items, totalItems] = await queryBuilder.getManyAndCountForPagination();
  const [column] = query.cursor?.split(':', 2) || [config.defaultCursorColumn];
  const nextCursor =
    items.length > 0 && config.cursorColumns.includes(column as Column<T>)
      ? `${column}:${items[items.length - 1][column]}`
      : null;

  let path: string;
  const { queryOrigin, queryPath } = getQueryUrlComponents(query.path);
  if (config.relativePath) {
    path = queryPath;
  } else if (config.origin) {
    path = config.origin + queryPath;
  } else {
    path = queryOrigin + queryPath;
  }

  const sortByQuery = sortBy
    .map((order) => `&sortBy=${order.join(':')}`)
    .join('');
  const searchQuery = query.search ? `&search=${query.search}` : '';
  const filterQuery = query.filter
    ? '&' +
      stringify(
        mapKeys(query.filter, (_param, name) => 'filter.' + name),
        '&',
        '=',
        { encodeURIComponent: (str) => str },
      )
    : '';
  const options = `&limit=${limit}${sortByQuery}${searchQuery}${filterQuery}`;
  const buildLink = (cursor?: string): string =>
    path + (cursor ? '?cursor=' + cursor : '?') + options;

  const results: CursorPaginated<T> = {
    data: items,
    meta: {
      itemsPerPage: limit,
      totalItems,
      sortBy,
      search: query.search,
      select: config.select,
      filter: query.filter,
      cursor: query.cursor,
      nextCursor:
        items.length == limit && query.cursor != nextCursor
          ? nextCursor
          : undefined,
    },
    links: {
      current: query.cursor ? buildLink(escape(query.cursor)) : buildLink(),
      next:
        items.length == limit && query.cursor != nextCursor
          ? buildLink(escape(nextCursor))
          : undefined,
    },
  };

  return Object.assign(new Paginated<T>(), results);
}
