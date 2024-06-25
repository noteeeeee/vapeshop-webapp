import { AxiosError } from "axios";
import {
  type QueryFunction,
  useQuery,
  UseQueryOptions,
  type UseQueryReturnType,
} from "@tanstack/vue-query";

export type ApiConfig = {
  immediately?: boolean;
  debounceOptions?: {
    enabled: boolean;
    delay?: number;
  };
  cacheOptions?: {
    enabled: boolean;
    cacheTime: number;
  };
};

export function useApi<T>(
  queryFn: QueryFunction,
  queryKeys: string[],
  tanstackConfig?: Partial<UseQueryOptions>,
  config: ApiConfig = {
    immediately: true,
    debounceOptions: {
      enabled: true,
      delay: 300,
    },
  },
): UseQueryReturnType<T, AxiosError> {
  const { debouncedFunction } = useDebouncedFunction(
    queryFn,
    config.debounceOptions?.delay || 300,
  );

  // Используем useQuery для выполнения запроса и управления данными
  const tanstack = useQuery({
    queryKey: queryKeys,
    queryFn: config.debounceOptions?.enabled ? debouncedFunction : queryFn,
    enabled: config.immediately,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    ...tanstackConfig,
  });

  return tanstack as UseQueryReturnType<T, AxiosError>;
}
