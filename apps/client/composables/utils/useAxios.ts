import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import { useToast } from "~/components/ui/toast";
import { useWebApp } from "vue-tg";

function objectToHex(obj) {
  // Convert object to JSON string
  const jsonStr = JSON.stringify(obj);

  // Convert JSON string to Uint8Array
  const uint8Array = new TextEncoder().encode(jsonStr);

  // Convert Uint8Array to hexadecimal string
  const hexString = Array.prototype.map
    .call(uint8Array, (byte) => {
      return ("0" + (byte & 0xff).toString(16)).slice(-2);
    })
    .join("");

  return Array.prototype.map
    .call(uint8Array, (byte) => {
      return ("0" + (byte & 0xff).toString(16)).slice(-2);
    })
    .join("");
}

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
  const { initData, initDataUnsafe } = useWebApp();
  const ready = ref(false);
  const { toast } = useToast();
  const runtimeConfig = useRuntimeConfig();

  const baseURL = runtimeConfig.public.apiBaseurl;

  onNuxtReady(() => (ready.value = true));

  const instance = axios.create({
    baseURL,
    headers: {
      "authorization": objectToHex(initData),
    },
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
