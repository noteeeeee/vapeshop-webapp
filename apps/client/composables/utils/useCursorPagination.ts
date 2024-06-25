import { AxiosError } from "axios";
import {
  type QueryFunction,
  type QueryObserverResult,
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
  type UseInfiniteQueryReturnType,
} from "@tanstack/vue-query";
import type { ApiConfig } from "~/composables/utils/useApi";
import deepmerge from "deepmerge";
import omit from "lodash/omit";

export interface CursorPaginationMeta {
  totalItems: number;
  itemsPerPage: number;
  cursor?: string;
  nextCursor?: string;
}

export interface CursorPaginatedData<DataT> {
  data: DataT[];
  meta: CursorPaginationMeta;
}

export interface CursorPaginationQuery {
  cursor?: string;
  limit?: number;
  sortBy?: string[];
  filters?: Record<string, any>;
  search?: string;
}

export type UseCursorPaginationReturnType<DataT> = UseInfiniteQueryReturnType<
  DataT[],
  AxiosError
> & {
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

export function useCursorPagination<DataT>(
  queryFn: QueryFunction<any>,
  queryKeys: string[],
  paginationConfig: CursorPaginationQuery = {},
  tanstackConfig?: UseInfiniteQueryOptions,
  config?: ApiConfig & { vueRoute: boolean },
): UseCursorPaginationReturnType<DataT> {
  config = deepmerge(
    {
      vueRoute: false,
      immediately: true,
      debounceOptions: {
        enabled: true,
        delay: 300,
      },
    },
    config || {},
  );
  const route = useRoute();
  const router = useRouter();

  if (config?.vueRoute) {
    const routeSearch = route.query.search && String(route.query.search);
    if (routeSearch) paginationConfig.search = routeSearch;
  }

  const paginationConfigReactive =
    reactive<CursorPaginationQuery>(paginationConfig);
  const initialData: CursorPaginatedData<DataT> = {
    data: [],
    meta: {
      cursor: undefined,
      totalItems: 0,
      itemsPerPage: 0,
    },
  };

  const fetchData = ({ pageParam }: any) => {
    const params = {
      ...omit(paginationConfigReactive, "filters"),
      ...transformFilters(paginationConfigReactive.filters),
    };
    return queryFn({ ...params, cursor: pageParam } as any);
  };

  const { debouncedFunction } = useDebouncedFunction(
    fetchData,
    config?.debounceOptions?.delay,
  );

  const queryKeyComputed = computed(() => {
    return [...queryKeys, JSON.stringify(paginationConfigReactive)];
  });

  const tanstack = useInfiniteQuery({
    queryKey: queryKeyComputed,
    queryFn:
      config.debounceOptions?.enabled && process.client
        ? debouncedFunction
        : fetchData,
    getNextPageParam: (lastPage: any) => lastPage?.meta?.nextCursor,
    initialPageParam: undefined,
    enabled: config.immediately,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    ...tanstackConfig,
  }) as UseInfiniteQueryReturnType<CursorPaginatedData<DataT>, AxiosError>;

  // const next = (cursor: string | number, column: string = "id") => {
  //   return tanstack.refetch();
  // };

  const setLimit = (limit: number) => {
    paginationConfigReactive.limit = limit;
    return tanstack.refetch();
  };

  const setSort = (field: string, order: number) => {
    return tanstack.refetch();
  };

  const setFilters = (filters: Record<string, any>) => {
    paginationConfigReactive.filters = filters;
    return tanstack.refetch();
  };

  const setSearch = (search: string) => {
    paginationConfigReactive.cursor = undefined;
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
    ],
    () => tanstack.refetch(),
  );

  onServerPrefetch(async () => {
    await tanstack.suspense();
  });

  const data = computed(() =>
    tanstack.data.value
      ? // @ts-ignore
        tanstack.data.value.pages.flatMap((d) => d.data)
      : initialData,
  );

  return {
    setLimit,
    setSort,
    setFilters,
    setSearch,
    ...tanstack,
    data: data,
  } as any;
}
