<script setup lang="ts">
import { Home, Package, FileClock, LayoutGrid, CirclePlus } from "lucide-vue-next"
</script>

<template>
  <div>
    <div id="body" vaul-drawer-wrapper class="pt-8 pb-32 overflow-auto max-h-screen">
      <slot />
    </div>
    <div class="fixed bottom-0 w-full bg-card/70 backdrop-blur-md border-t-border border-t p-6">
      <div class="flex justify-between">
        <NuxtLink to="/admin" class="transition-opacity flex flex-col justify-center items-center gap-y-2 opacity-60 hover:opacity-100 [&.router-link-active]:opacity-100">
          <Home class="size-8" />
          <span class="text-xs font-medium">Главная</span>
        </NuxtLink>
        <NuxtLink to="/admin/categories/" class="transition-opacity flex flex-col justify-center items-center gap-y-2 opacity-60 hover:opacity-100 [&.router-link-active]:opacity-100">
          <Package class="size-8" />
          <span class="text-xs font-medium">Товары</span>
        </NuxtLink>
        <NuxtLink class="transition-opacity flex flex-col justify-center items-center gap-y-2 opacity-60 hover:opacity-100 [&.router-link-active]:opacity-100">
          <CirclePlus class="size-12" />
        </NuxtLink>
        <NuxtLink to="/admin/audit" class="transition-opacity flex flex-col justify-center items-center gap-y-2 opacity-60 hover:opacity-100 [&.router-link-active]:opacity-100">
          <FileClock class="size-8" />
          <span class="text-xs font-medium">Журнал</span>
        </NuxtLink>
        <NuxtLink to="/admin/menu" class="transition-opacity flex flex-col justify-center items-center gap-y-2 opacity-60 hover:opacity-100 [&.router-link-active]:opacity-100">
          <LayoutGrid class="size-8" />
          <span class="text-xs font-medium">Меню</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
