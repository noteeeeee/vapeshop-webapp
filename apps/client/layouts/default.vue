<script setup lang="ts">
import { Home, BookUser, UserRound } from "lucide-vue-next";
</script>

<template>
  <div class="relative">
    <div
      class="pt-8 px-6 pb-32 overflow-auto max-h-screen relative"
      vaul-drawer-wrapper
    >
      <slot />
    </div>
    <div class="fixed bottom-0 w-full">
      <div id="actionButton" class="mb-2 flex justify-center relative mx-4" v-auto-animate />
      <div
        class="flex justify-between bg-card/70 backdrop-blur-md border-t-border border-t p-6"
      >
        <NuxtLink
          to="/"
          class="transition-opacity flex justify-center items-center gap-x-2 opacity-60 hover:opacity-100 [&.router-link-active]:opacity-100"
        >
          <Home class="size-4" />
          <span class="text-sm font-medium">Главная</span>
        </NuxtLink>
        <NuxtLink
          to="/contacts"
          class="transition-opacity flex justify-center items-center gap-x-2 opacity-60 hover:opacity-100 [&.router-link-active]:opacity-100"
        >
          <BookUser class="size-4" />
          <span class="text-sm font-medium">Контакты</span>
        </NuxtLink>
        <NuxtLink
          to="/me"
          class="transition-opacity flex justify-center items-center gap-x-2 opacity-60 hover:opacity-100 [&.router-link-active]:opacity-100"
        >
          <UserRound class="size-4" />
          <span class="text-sm font-medium">Профиль</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
