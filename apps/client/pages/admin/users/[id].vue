<script setup lang="ts">
import {
  BadgePercent,
  Banknote,
  Calendar,
  PackageSearch,
} from "lucide-vue-next";

definePageMeta({
  layout: "admin",
  middleware: "admin",
});

const client = useApiClient();
const { user } = useAuth();
const { url: avatarURL, isLoading: avatarIsLoading } = useBlobImage(
  () => client.bot.botControllerAvatar().then((res) => res.data!),
  "avatar-me",
);
</script>

<template>
  <div class="px-6">
    <BackButton to="/admin" />
    <div class="mt-6">
      <h2 class="text-3xl font-semibold">Пользователи</h2>
    </div>
    <div class="flex items-center justify-between mt-6">
      <div class="flex items-center gap-x-4">
        <Avatar class="size-14">
          <AvatarImage
            v-if="!avatarIsLoading"
            :src="avatarURL"
            alt="@radix-vue"
          />
          <AvatarFallback>{{ user.firstName.slice(0, 2) }}</AvatarFallback>
        </Avatar>
        <div class="flex flex-col">
          <span>{{ user.firstName }}</span>
          <span class="text-xs opacity-60">@{{ user.username }}</span>
        </div>
      </div>
      <div class="flex flex-col justify-end text-right">
        <h4 class="text-xs opacity-40">Зарегистрирован:</h4>
        <div class="flex justify-end items-center opacity-60 gap-x-2 mt-0.5">
          <span>{{ $dayjs(user.created).format("ll") }}</span>
          <Calendar class="size-4" />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 mt-6">
      <div
        class="bg-card p-4 shadow-md rounded-lg text-sm flex flex-col gap-y-1 text-white/60"
      >
        <div class="text-sm">Ваш баланс:</div>
        <div class="flex items-center gap-x-2">
          <Banknote class="size-5" />
          <span class="font-semibold text-xl">605.20 ₽</span>
        </div>
      </div>
      <div
          class="bg-card p-4 shadow-md rounded-lg text-sm flex flex-col gap-y-1 text-white/60"
      >
        <div class="text-sm">Доход:</div>
        <div class="flex items-center gap-x-2">
          <Banknote class="size-5" />
          <span class="font-semibold text-xl">605.20 ₽</span>
        </div>
      </div>
      <div
          class="bg-card p-4 shadow-md rounded-lg text-sm flex flex-col gap-y-1 text-white/60"
      >
        <div class="text-sm">Кол-во рефералов:</div>
        <div class="flex items-center gap-x-2">
          <LucideUsersRound class="size-5" />
          <span class="font-semibold text-xl">5</span>
        </div>
      </div>
      <div
        class="bg-card p-4 shadow-md rounded-lg text-sm flex flex-col gap-y-1 text-white/60"
      >
        <div class="text-sm">Процент от дохода:</div>
        <div class="flex items-center gap-x-2">
          <BadgePercent class="size-5" />
          <span class="font-semibold text-xl">5%</span>
        </div>
      </div>
      <div
        class="bg-card p-4 shadow-md rounded-lg text-sm flex flex-col gap-y-1 text-white/60"
      >
        <div class="text-sm">Количество заказов:</div>
        <div class="flex items-center gap-x-2">
          <PackageSearch class="size-5" />
          <span class="font-semibold text-xl">204</span>
        </div>
      </div>
      <div
        class="bg-card p-4 shadow-md rounded-lg text-sm flex flex-col gap-y-1 text-white/60"
      >
        <div class="text-sm">Сумма заказов:</div>
        <div class="flex items-center gap-x-2">
          <Banknote class="size-5" />
          <span class="font-semibold text-xl">605.20 ₽</span>
        </div>
      </div>
    </div>
  </div>
</template>
