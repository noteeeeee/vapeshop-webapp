import isEmpty from "lodash/isEmpty";

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const runtimeConfig = useRuntimeConfig();

  const sourceToUrl = (sourceId?: string) => {
    return sourceId
        ? `${runtimeConfig.public.apiBaseurl}/storage/filepond/load?source=${sourceId}`
        : undefined;
  };

  const currency = (sourceId?: string) => {
    return sourceId
        ? `${runtimeConfig.public.apiBaseurl}/storage/filepond/load?source=${sourceId}`
        : undefined;
  };

  const routeBackOrPush = (path: string) =>
      window.history.length > 2 ? router.back() : router.push(path);

  return {
    provide: {
      sourceToUrl,
      routeBackOrPush,
    },
  };
});