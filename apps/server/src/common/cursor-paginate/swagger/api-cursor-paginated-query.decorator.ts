import {
  DEFAULT_LIMIT,
  DEFAULT_MAX_LIMIT,
  FilterOperator,
  FilterSuffix,
  PaginateConfig,
} from 'nestjs-paginate';
import { ApiQuery } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { FilterComparator } from 'nestjs-paginate/lib/filter';

const DEFAULT_VALUE_KEY = 'Default Value';

function p(
  key: string | 'Format' | 'Example' | 'Default Value' | 'Max Value',
  value: string,
) {
  return `<p>
             <b>${key}: </b> ${value}
          </p>`;
}

function li(key: string | 'Available Fields', values: string[]) {
  return `<h4>${key}</h4><ul>${values
    .map((v) => `<li>${v}</li>`)
    .join('\n')}</ul>`;
}

export function SortBy(paginationConfig: PaginateConfig<any>) {
  const defaultSortMessage = paginationConfig.defaultSortBy
    ? paginationConfig.defaultSortBy
        .map(([col, order]) => `${col}:${order}`)
        .join(',')
    : 'No default sorting specified, the result order is not guaranteed';

  const sortBy = paginationConfig.sortableColumns.reduce((prev, curr) => {
    return [...prev, `${curr}:ASC`, `${curr}:DESC`];
  }, []);

  return ApiQuery({
    name: 'sortBy',
    isArray: true,
    enum: sortBy,
    description: `Parameter to sort by.
      <p>To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting</p>
      ${p('Format', 'fieldName:DIRECTION')}
      ${p('Example', 'sortBy=id:DESC&sortBy=createdAt:ASC')}
      ${p('Default Value', defaultSortMessage)}
      ${li('Available Fields', paginationConfig.sortableColumns)}
      `,
    required: false,
    type: 'string',
  });
}

function Limit(paginationConfig: PaginateConfig<any>) {
  return ApiQuery({
    name: 'limit',
    description: `Number of records per page.
      ${p('Example', '20')}
      ${p(
        DEFAULT_VALUE_KEY,
        paginationConfig?.defaultLimit?.toString() || DEFAULT_LIMIT.toString(),
      )}
      ${p(
        'Max Value',
        paginationConfig.maxLimit?.toString() || DEFAULT_MAX_LIMIT.toString(),
      )}

      If provided value is greater than max value, max value will be applied.
      `,
    required: false,
    type: 'number',
  });
}

function Select(paginationConfig: PaginateConfig<any>) {
  if (!paginationConfig.select) {
    return;
  }

  return ApiQuery({
    name: 'select',
    description: `List of fields to select.
      ${p(
        'Example',
        paginationConfig.select
          .slice(0, Math.min(5, paginationConfig.select.length))
          .join(','),
      )}
      ${p(
        DEFAULT_VALUE_KEY,
        'By default all fields returns. If you want to select only some fields, provide them in query param',
      )}
      `,
    required: false,
    type: 'string',
  });
}

function Where(paginationConfig: PaginateConfig<any>) {
  if (!paginationConfig.filterableColumns) return;

  const allColumnsDecorators = Object.entries(
    paginationConfig.filterableColumns,
  )
    .map(([fieldName, filterOperations]) => {
      const operations =
        filterOperations === true || filterOperations === undefined
          ? [
              ...Object.values(FilterComparator),
              ...Object.values(FilterSuffix),
              ...Object.values(FilterOperator),
            ]
          : filterOperations.map((fo) => fo.toString());

      return ApiQuery({
        name: `filter.${fieldName}`,
        description: `Filter by ${fieldName} query param.
          ${p('Format', `filter.${fieldName}={$not}:OPERATION:VALUE`)}
          ${p(
            'Example',
            `filter.${fieldName}=$not:$like:John Doe&filter.${fieldName}=like:John`,
          )}
          ${li('Available Operations', operations)}`,
        required: false,
        type: 'string',
        isArray: true,
      });
    })
    .filter((v) => v !== undefined);

  return applyDecorators(...allColumnsDecorators);
}

function Cursor() {
  return ApiQuery({
    name: 'cursor',
    description: `Cursor to navigate through the dataset. This is typically a string representing the last seen value of the sorting field.
        ${p('Example', 'createdAt:2022-01-01T00:00:00Z')}
        `,
    required: false,
    type: 'string',
  });
}

function Search(paginateConfig: PaginateConfig<any>) {
  if (!paginateConfig.searchableColumns) return;

  return ApiQuery({
    name: 'search',
    description: `Search term to filter result values
        ${p('Example', 'John')}
        ${p(DEFAULT_VALUE_KEY, 'No default value')}
        `,
    required: false,
    type: 'string',
  });
}

function SearchBy(paginateConfig: PaginateConfig<any>) {
  if (!paginateConfig.searchableColumns) return;

  return ApiQuery({
    name: 'searchBy',
    description: `List of fields to search by term to filter result values
        ${p(
          'Example',
          paginateConfig.searchableColumns
            .slice(0, Math.min(5, paginateConfig.searchableColumns.length))
            .join(','),
        )}
        ${p(
          DEFAULT_VALUE_KEY,
          'By default all fields mentioned below will be used to search by term',
        )}
        ${li('Available Fields', paginateConfig.searchableColumns)}
        `,
    required: false,
    isArray: true,
    type: 'string',
  });
}

export const ApiCursorPaginationQuery = (
  paginationConfig: PaginateConfig<any>,
) => {
  return applyDecorators(
    ...[
      Cursor(),
      Limit(paginationConfig),
      Where(paginationConfig),
      SortBy(paginationConfig),
      Search(paginationConfig),
      SearchBy(paginationConfig),
      Select(paginationConfig),
    ].filter((v): v is MethodDecorator => v !== undefined),
  );
};
