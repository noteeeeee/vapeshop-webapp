import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { useToast } from "~/components/ui/toast";
import { useWebApp } from 'vue-tg'

declare module "axios" {
  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;

    get<T = any>(
      url: string,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>>;

    delete<T = any>(
      url: string,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>>;

    head<T = any>(
      url: string,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>>;

    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>>;

    put<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>>;

    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>>;
  }
}

export const useAxiosInstance = () => {
  const { initData, initDataUnsafe} = useWebApp()
  const ready = ref(false);
  const { toast } = useToast();
  const runtimeConfig = useRuntimeConfig();

  const baseURL = runtimeConfig.public.apiBaseurl;

  onNuxtReady(() => (ready.value = true));

  const instance = axios.create({
    baseURL,
    headers: {
      "x-telegram-init-data": encodeURIComponent(initData)
    }
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (!ready.value) return Promise.reject(error);
      if (error.response) {
        const { status, data } = error.response;
        if (status == 401) return Promise.reject(error);
        if (status >= 400 && status < 500) {
          toast({
            title: "Uh oh! Client error occurred.",
            description: data.message || "An error occurred.",
            variant: "destructive",
          });
        } else if (status >= 500) {
          // Server errors (5xx)
          toast({
            title: "Oops! Server error occurred.",
            description: "Please try again later.",
            variant: "destructive",
          });
        }
      } else if (error.request) {
        toast({
          title: "Network error.",
          description: "Please check your internet connection and try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Request error.",
          description: "An error occurred while processing your request.",
          variant: "destructive",
        });
      }

      return Promise.reject(error);
    },
  );

  return instance;
};
