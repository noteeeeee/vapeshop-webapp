<script setup lang="ts">
import { Home, Phone, ScanFace, Hash, MapPinned, Landmark } from "lucide-vue-next";

const img = useImage();
</script>

<template>
  <div class="">
    <div class="flex flex-col">
      <div class="relative w-full">
        <FormKit
            type="text"
            placeholder="Фамилия Имя Отчетство"
            :classes="{
            inner: {
              '!border-transparent': true,
              '!bg-card': true,
              '!h-12': true,
            },
          }"
        />
        <span
            class="absolute end-0 inset-y-0 flex items-center justify-center px-4 h-12"
        >
          <ScanFace class="size-4 text-muted-foreground" />
        </span>
      </div>
      <div class="relative w-full">
        <FormKit
            type="text"
            placeholder="Номер телефона"
            :classes="{
            inner: {
              '!border-transparent': true,
              '!bg-card': true,
              '!h-12': true,
            },
          }"
        />
        <span
            class="absolute end-0 inset-y-0 flex items-center justify-center px-4 h-12"
        >
          <Phone class="size-4 text-muted-foreground" />
        </span>
      </div>
      <div class="relative w-full">
        <FormKit
            type="text"
            placeholder="Индекс"
            :classes="{
            inner: {
              '!border-transparent': true,
              '!bg-card': true,
              '!h-12': true,
            },
          }"
        />
        <span
            class="absolute end-0 inset-y-0 flex items-center justify-center px-4 h-12"
        >
          <Hash class="size-4 text-muted-foreground" />
        </span>
      </div>
      <div class="relative w-full">
        <FormKit
            type="text"
            placeholder="Область"
            :classes="{
            inner: {
              '!border-transparent': true,
              '!bg-card': true,
              '!h-12': true,
            },
          }"
        />
        <span
            class="absolute end-0 inset-y-0 flex items-center justify-center px-4 h-12"
        >
          <MapPinned class="size-4 text-muted-foreground" />
        </span>
      </div>
      <div class="relative w-full">
        <FormKit
            type="text"
            placeholder="Город"
            :classes="{
            inner: {
              '!border-transparent': true,
              '!bg-card': true,
              '!h-12': true,
            },
          }"
        />
        <span
            class="absolute end-0 inset-y-0 flex items-center justify-center px-4 h-12"
        >
          <Landmark class="size-4 text-muted-foreground" />
        </span>
      </div>
      <div class="relative w-full">
        <FormKit
            type="text"
            placeholder="Адрес отделения (Бел Почта)"
            :classes="{
            inner: {
              '!border-transparent': true,
              '!bg-card': true,
              '!h-12': true,
            },
          }"
        />
        <span
            class="absolute end-0 inset-y-0 flex items-center justify-center px-4 h-12"
        >
          <Home class="size-4 text-muted-foreground" />
        </span>
      </div>
    </div>
    <div
        class="mt-2 text-foreground/60 border-none p-0 flex items-center gap-x-2"
    >
      <div class="">
        <svg
            class="size-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M11.9999 17.001C13.3812 17.001 14.501 18.1208 14.501 19.5021C14.501 20.8834 13.3812 22.0032 11.9999 22.0032C10.6186 22.0032 9.49876 20.8834 9.49876 19.5021C9.49876 18.1208 10.6186 17.001 11.9999 17.001ZM11.9999 18.501C11.447 18.501 10.9988 18.9492 10.9988 19.5021C10.9988 20.055 11.447 20.5032 11.9999 20.5032C12.5528 20.5032 13.001 20.055 13.001 19.5021C13.001 18.9492 12.5528 18.501 11.9999 18.501ZM11.9989 2.00195C14.1392 2.00195 15.8743 3.73701 15.8743 5.87732C15.8743 8.71079 14.8843 12.4313 14.3389 14.2751C14.0293 15.3215 13.0656 16.0034 12.0005 16.0034C10.9331 16.0034 9.96834 15.3186 9.65983 14.2703L9.43737 13.4931C8.88258 11.499 8.12354 8.33061 8.12354 5.87732C8.12354 3.73701 9.85859 2.00195 11.9989 2.00195ZM11.9989 3.50195C10.687 3.50195 9.62354 4.56544 9.62354 5.87732C9.62354 8.43895 10.5511 11.9856 11.0988 13.8468C11.2124 14.2327 11.5729 14.5034 12.0005 14.5034C12.4274 14.5034 12.7868 14.2339 12.9005 13.8496L13.0582 13.3052C13.6087 11.3647 14.3743 8.23303 14.3743 5.87732C14.3743 4.56544 13.3108 3.50195 11.9989 3.50195Z"
              fill="white"
              fill-opacity="0.6"
          />
        </svg>
      </div>
      <div class="!mb-0 !pb-0 text-sm max-w-60">
        К итоговой стоимости заказа будут добавлены +4 ₽.
      </div>
    </div>
  </div>
</template>
