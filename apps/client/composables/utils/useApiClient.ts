import { Api, ContentType, type FullRequestParams } from "~/types";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

export const useApiClient = () => {
  const instance = useAxiosInstance();

  class MyApi extends Api<any> {
    public request = async <T = any, _E = any>({
      path,
      type,
      query,
      format,
      body,
      ...params
    }: FullRequestParams & AxiosRequestConfig): Promise<AxiosResponse<T>> => {
      const instance = useAxiosInstance();

      if (type === ContentType.FormData && body && typeof body === "object") {
        body = this.createFormData(body as Record<string, unknown>);
      }

      if (type === ContentType.Text && body && typeof body !== "string") {
        body = JSON.stringify(body);
      }

      return instance.request({
        ...params,
        params: query,
        data: body,
        url: path,
      });
    };
  }

  return new MyApi();
};
