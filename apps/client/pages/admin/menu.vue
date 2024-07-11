<script setup lang="ts">
import { Text } from "lucide-vue-next";
</script>

<template>
  <div class="px-4">
    <h2 class="text-3xl font-semibold">Компания</h2>
    <div class="flex flex-col mt-6">
      <div class="cursor-pointer flex items-center gap-x-4 group">
        <LucideCog class="size-8" />
        <div
          class="transition-all flex-1 flex justify-between items-center py-3 border-b border-b-border group-hover:border-b-foreground"
        >
          <span class="transition-all text-foreground/60 group-hover:text-foreground/100"
            >Настройки</span
          >
          <LucideArrowRight
            class="size-6 opacity-60 transition-all group-hover:scale-110 group-hover:opacity-100"
          />
        </div>
      </div>
      <NuxtLink to="/admin/users" class="cursor-pointer flex items-center gap-x-4 group">
        <LucidePlus class="size-8" />
        <div
            class="transition-all flex-1 flex justify-between items-center py-3 border-b border-b-border group-hover:border-b-foreground"
        >
          <span class="transition-all text-foreground/60 group-hover:text-foreground/100"
          >Реферы</span
          >
          <LucideArrowRight
              class="size-6 opacity-60 transition-all group-hover:opacity-100 group-hover:scale-110"
          />
        </div>
      </NuxtLink>
      <div class="cursor-pointer flex items-center gap-x-4 group">
        <LucideShieldCheck class="size-8" />
        <div
            class="transition-all flex-1 flex justify-between items-center py-3 border-b border-b-border group-hover:border-b-foreground"
        >
          <span class="transition-all text-foreground/60 group-hover:text-foreground/100"
          >Сотрудники</span
          >
          <LucideArrowRight
              class="size-6 opacity-60 transition-all group-hover:opacity-100 group-hover:scale-110"
          />
        </div>
      </div>
      <div class="cursor-pointer flex items-center gap-x-4 group">
        <LucideUsersRound class="size-8" />
        <div
            class="transition-all flex-1 flex justify-between items-center py-3 border-b border-b-border group-hover:border-b-foreground"
        >
          <span class="transition-all text-foreground/60 group-hover:text-foreground/100"
          >Клиенты</span
          >
          <LucideArrowRight
              class="size-6 opacity-60 transition-all group-hover:opacity-100 group-hover:scale-110"
          />
        </div>
      </div>
      <div class="cursor-pointer flex items-center gap-x-4 group">
        <LucideWalletMinimal class="size-8" />
        <div
            class="transition-all flex-1 flex justify-between items-center py-3 border-b border-b-border group-hover:border-b-foreground"
        >
          <span class="transition-all text-foreground/60 group-hover:text-foreground/100"
          >Счета</span
          >
          <LucideArrowRight
              class="size-6 opacity-60 transition-all group-hover:opacity-100 group-hover:scale-110"
          />
        </div>
      </div>
    </div>
  </div>
</template>
