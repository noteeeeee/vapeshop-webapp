<script setup lang="ts">
import {Calendar, BadgePercent, Banknote, PackageSearch, CircleArrowRight} from "lucide-vue-next";

const client = useApiClient();
const { user } = useAuth();
const { url: avatarURL, isLoading: avatarIsLoading } = useBlobImage(
  () => client.bot.botControllerAvatar().then((res) => res.data!),
  "avatar-me",
);
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
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
        <div class="text-sm">Скидка к заказам:</div>
        <div class="flex items-center gap-x-2 text-green-500">
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
      <NuxtLink
          to="/me/orders"
          class="hover:bg-primary bg-card text-foreground/60 hover:text-foreground transition-colors py-4 px-6 flex items-center justify-between rounded-md shadow-md cursor-pointer col-span-2"
      >
        <h4 class="truncate font-semibold">Ваши заказы</h4>
        <CircleArrowRight
            class="transition-opacity size-6 "
        />
      </NuxtLink>
    </div>
    <div class="flex flex-col gap-y-4 mt-20">
      <NuxtLink
          to="/me/orders"
          class="hover:bg-primary bg-card text-foreground/60 hover:text-foreground transition-colors py-4 px-6 flex items-center justify-between rounded-md shadow-md cursor-pointer col-span-2"
      >
        <h4 class="truncate font-semibold">Данные для доставки</h4>
        <CircleArrowRight
            class="transition-opacity size-6 "
        />
      </NuxtLink>
      <NuxtLink
          to="/me/partner"
          class="hover:bg-primary bg-card text-foreground/60 hover:text-foreground transition-colors py-4 px-6 flex items-center justify-between rounded-md shadow-md cursor-pointer col-span-2"
      >
        <h4 class="truncate font-semibold">Реферальная система</h4>
        <CircleArrowRight
            class="transition-opacity size-6 "
        />
      </NuxtLink>
      <Drawer>
        <DrawerTrigger as-child>
          <Button
              to="/me/orders"
              class="h-auto text-base bg-card text-foreground/60 hover:text-foreground transition-colors py-4 px-6 flex items-center justify-between rounded-md shadow-md cursor-pointer col-span-2"
          >
            <h4 class="truncate font-semibold">Активировать промокод</h4>
            <CircleArrowRight
                class="transition-opacity size-6 "
            />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
           <div class="p-4 flex flex-col">
             <FormKit type="text" placeholder="Введите промокод" />
             <Button>Активировать</Button>
           </div>
        </DrawerContent>
      </Drawer>
    </div>
  </div>
</template>
