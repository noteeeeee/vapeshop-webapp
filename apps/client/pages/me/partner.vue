<script setup lang="ts">
import { UserRoundPlus, Banknote, Link2 } from "lucide-vue-next";

const client = useApiClient();
const { user } = useAuth();
const { url: avatarURL, isLoading: avatarIsLoading } = useBlobImage(
  () => client.bot.botControllerAvatar().then((res) => res.data!),
  "avatar-me",
);
</script>

<template>
  <div class="">
    <BackButton />
    <div class="flex items-center gap-x-4 mt-6">
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
    <div class="grid grid-cols-2 gap-4 mt-6">
      <div
        class="bg-card p-4 shadow-md rounded-lg text-sm flex flex-col gap-y-1 text-white/60"
      >
        <div class="text-sm">Ваших рефералов:</div>
        <div class="flex items-center gap-x-2">
          <UserRoundPlus class="size-5" />
          <span class="font-semibold text-xl">4</span>
        </div>
      </div>
      <div
        class="bg-card p-4 shadow-md rounded-lg text-sm flex flex-col gap-y-1 text-white/60"
      >
        <div class="text-sm">Заработано:</div>
        <div class="flex items-center gap-x-2">
          <Banknote class="size-5" />
          <span class="font-semibold text-xl">5%</span>
        </div>
      </div>
    </div>
    <div class="bg-card p-4 shadow-md rounded-lg mt-8">
      <div class="text-sm text-white/60">Реферальная ссылка:</div>
      <h4 class="text-lg text-text-primary mt-0.5 font-semibold">
        t.me/vape_bot?start=r_{{ user.id }}
      </h4>
      <p class="mt-4 text-sm opacity-40">
        Приглашайте пользователей по вашей реферальной ссылке и получайте 10% с
        покупок ваших рефералов.
      </p>
      <Button
        variant="secondary"
        class="bg-foreground/40 w-full mt-4 hover:bg-foreground/60"
      >
        <Link2 class="size-5 mr-2" />
        <span>Поделиться</span></Button
      >
    </div>
  </div>
</template>
