import type { ColorDto, ProductResponseDto } from "~/types";

declare module "*.svg" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent;
  export default component;
}

declare module "#app" {
  interface NuxtApp {
    $sourceToUrl(sourceId: string): string | undefined;
    $currency(value: number): string;
    $routeBackOrPush(sourceId: string): void;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $sourceToUrl(sourceId: string): string | undefined;
    $currency(value: number): string;
    $routeBackOrPush(sourceId: string): void;
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $sourceToUrl(sourceId: string): string | undefined;
    $currency(value: number): string;
    $routeBackOrPush(sourceId: string): void;
  }
}

export {};
