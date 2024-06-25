import { AxiosError } from "axios";
import {
  type QueryFunction,
  type QueryFunctionContext,
  type QueryObserverResult,
  type QueryOptions,
  useQuery,
  type UseQueryReturnType,
} from "@tanstack/vue-query";
import type { ApiConfig } from "~/composables/utils/useApi";
import deepmerge from "deepmerge";
import forOwn from "lodash/forOwn";
import omit from "lodash/omit";

export interface PaginationMeta {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginatedData<DataT> {
  data: DataT[];
  meta: PaginationMeta;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string[];
  sortOrder?: number[];
  filters?: Record<string, any>;
  search?: string;
}

export const transformFilters = (filters?: Record<string, string>) => {
  if (!filters) {
    return {};
  }

  const transformedFilters: Record<string, string> = {};

  forOwn(filters, (value, key) => {
    const newKey = `filter.${key}`;
    transformedFilters[newKey] = value;
  });

  return transformedFilters;
};

export type UsePaginationReturnType<DataT> = UseQueryReturnType<
  PaginatedData<DataT>,
  AxiosError
> & {
  setPage: (
    page: number,
  ) =>
    | Promise<
        QueryObserverResult<PaginatedData<DataT>, AxiosError<unknown, any>>
      >
    | undefined;
  setLimit: (
    limit: number,
  ) =>
    | Promise<
        QueryObserverResult<PaginatedData<DataT>, AxiosError<unknown, any>>
      >
    | undefined;
  setSort: (
    field: string,
    order: number,
  ) =>
    | Promise<
        QueryObserverResult<PaginatedData<DataT>, AxiosError<unknown, any>>
      >
    | undefined;
  setFilters: (
    filters: Record<string, any>,
  ) =>
    | Promise<
        QueryObserverResult<PaginatedData<DataT>, AxiosError<unknown, any>>
      >
    | undefined;
  setSearch: (
    search: string,
  ) =>
    | Promise<
        QueryObserverResult<PaginatedData<DataT>, AxiosError<unknown, any>>
      >
    | undefined;
};

export function usePagination<DataT>(
  queryFn: QueryFunction<any>,
  queryKey: string,
  paginationConfig: PaginationQuery = {
    page: 1,
  },
  tanstackConfig?: QueryOptions,
  config?: ApiConfig & { vueRoute: boolean },
): UsePaginationReturnType<DataT> {
  config = deepmerge(
    {
      vueRoute: false,
      immediately: true,
      debounceOptions: {
        enabled: true,
        delay: 300,
      },
      cacheOptions: {
        enabled: false,
        cacheTime: 0,
      },
    },
    config || {},
  );
  const route = useRoute();
  const router = useRouter();

  if (config?.vueRoute) {
    const routeSearch = route.query.search && String(route.query.search);
    const routePage = route.query.page && Number(route.query.page);
    const routeFilters = route.query.filters && String(route.query.filters);
    if (routeSearch) paginationConfig.search = routeSearch;
    if (routePage) paginationConfig.page = routePage;
    if (routeFilters)
      paginationConfig.filters = Object.fromEntries(
        new URLSearchParams(decodeURIComponent(route.query.filters)),
      );
  }

  const paginationConfigReactive = reactive<PaginationQuery>(paginationConfig);
  const initialData: PaginatedData<DataT> = {
    data: [],
    meta: {
      itemCount: 0,
      totalItems: 0,
      itemsPerPage: 0,
      totalPages: 0,
      currentPage: 11,
    },
  };

  const fetchData = (context: QueryFunctionContext) => {
    const params = {
      ...omit(paginationConfigReactive, "filters"),
      ...transformFilters(paginationConfigReactive.filters),
    };
    return queryFn(params as any);
  };

  const { debouncedFunction } = useDebouncedFunction(
    fetchData,
    config?.debounceOptions?.delay,
  );

  const queryKeyComputed = computed(() => {
    return [queryKey, JSON.stringify(paginationConfigReactive)];
  });

  const tanstack = useQuery({
    queryKey: queryKeyComputed,
    queryFn:
      config.debounceOptions?.enabled && process.client
        ? debouncedFunction
        : fetchData,
    enabled: config.immediately,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    ...tanstackConfig,
  }) as UseQueryReturnType<PaginatedData<DataT>, AxiosError>;

  const setPage = (page: number) => {
    if (
      page >= 1 &&
      tanstack.data.value?.meta.totalPages &&
      page <= tanstack.data.value?.meta.totalPages
    ) {
      paginationConfigReactive.page = page;
      if (config?.vueRoute)
        router.push({
          query: {
            ...router.currentRoute.value.query,
            page: page == 1 ? undefined : page,
          },
        });
      return tanstack.refetch();
    }
  };

  const setLimit = (limit: number) => {
    paginationConfigReactive.limit = limit;
    return tanstack.refetch();
  };

  const setSort = (field: string, order: number) => {
    paginationConfigReactive.sortBy = [field];
    paginationConfigReactive.sortOrder = [order];
    return tanstack.refetch();
  };

  const setFilters = (filters: Record<string, any>) => {
    paginationConfigReactive.filters = filters;
    if (config?.vueRoute) {
      router.push({
        query: {
          ...router.currentRoute.value.query,
          filters: filters ? new URLSearchParams(filters) : undefined,
        },
      });
    }

    return tanstack.refetch();
  };

  const setSearch = (search: string) => {
    paginationConfigReactive.page = 1;
    paginationConfigReactive.search = search; // Set the search property in the config
    if (config?.vueRoute)
      router.push({
        query: {
          ...router.currentRoute.value.query,
          search: search ? search : undefined,
          page: undefined,
        },
      });
    return tanstack.refetch();
  };

  // Обработка изменений фильтров и сортировки
  watch(
    [
      () => paginationConfigReactive.filters,
      () => paginationConfigReactive.sortBy,
      () => paginationConfigReactive.sortOrder,
    ],
    () => tanstack.refetch(),
  );

  onServerPrefetch(async () => {
    await tanstack.suspense();
  });

  const data = computed(() =>
    tanstack.data.value ? tanstack.data.value : initialData,
  );

  return {
    setPage,
    setLimit,
    setSort,
    setFilters,
    setSearch,
    ...tanstack,
    data: data as any,
  };
}
