import type { ColorDto, ProductResponseDto } from "~/types";

declare module "*.svg" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent;
  export default component;
}

declare module "#app" {
  interface NuxtApp {
    $tls(localeObject: object): string;

    $sourceToUrl(sourceId: string): string | undefined;

    $routeBackOrPush(sourceId: string): void;

    $productPreviewImage(
      product?: ProductResponseDto,
      color?: string,
    ): { src: string } | undefined;

    $idToColor(id: string): ColorDto | undefined;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $tls(localeObject: object): string;

    $sourceToUrl(sourceId: string): string | undefined;

    $routeBackOrPush(sourceId: string): void;

    $productPreviewImage(
      product?: ProductResponseDto,
      color?: string,
    ): { src: string } | undefined;

    $idToColor(id: string): ColorDto | undefined;
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $tls(localeObject: object): string;

    $sourceToUrl(sourceId: string): string | undefined;

    $routeBackOrPush(sourceId: string): void;

    $productPreviewImage(
      product?: ProductResponseDto,
      color?: string,
    ): { src: string } | undefined;

    $idToColor(id: string): ColorDto | undefined;
  }
}

export {};
