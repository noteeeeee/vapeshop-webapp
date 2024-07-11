<script setup lang="ts">
import { MapPin, NotebookPen } from "lucide-vue-next";

const img = useImage();
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <ManagerContact />
    <div class="bg-card rounded-md p-4">
      <span class="opacity-60 text-sm">
        <slot> Telegram канал: </slot>
      </span>
      <div class="flex justify-between mt-6 items-center">
        <div class="flex items-center gap-x-3">
          <Avatar>
            <AvatarImage
              :src="
                img('/images/logo.png', {
                  width: 256,
                })
              "
            />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <div class="">
            <h4 class="font-bold text-lg text-text-primary max-w-32 truncate">Оптовый ниндзя</h4>
            <h5 class="text-xs opacity-40">@byopt</h5>
          </div>
        </div>
        <NuxtLink
          class="text-sm opacity-60 hover:underline flex items-center gap-x-1"
        >
          <MapPin class="size-4" />
          <span>Перейти</span></NuxtLink
        >
      </div>
    </div>
    <div class="bg-card rounded-md p-4">
      <span class="opacity-60 text-sm">
        <slot> Telegram канал: </slot>
      </span>
      <div class="flex justify-between mt-6 items-center">
        <div class="flex items-center gap-x-3">
          <Avatar>
            <AvatarImage
                :src="
                img('/images/logo.png', {
                  width: 256,
                })
              "
            />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <div class="">
            <h4 class="font-bold text-lg text-text-primary max-w-32 truncate">Отзывы</h4>
            <h5 class="text-xs opacity-40">@otzivibyopt</h5>
          </div>
        </div>
        <NuxtLink
            class="text-sm opacity-60 hover:underline flex items-center gap-x-1"
        >
          <MapPin class="size-4" />
          <span>Перейти</span></NuxtLink
        >
      </div>
    </div>
  </div>
</template>
