<script setup lang="ts">
import { Text, Package, Store, UserCircle, ArrowRight, Pencil, Trash2 } from "lucide-vue-next";

definePageMeta({
  layout: "admin",
  middleware: "admin",
});
</script>

<template>
  <div class="">
    <h2 class="text-3xl font-semibold flex items-center gap-x-2 px-6">
      <Text class="size-8" />
      <span>Журнал</span>
    </h2>
    <div class="mt-6">
      <h4 class="opacity-60 px-6 font-semibold">16 февраля</h4>
      <div class="flex flex-col gap-y-1 mt-2">
        <IOSSwipe class="bg-white/5 h-16">
          <template #actions>
            <div class="px-4 flex gap-2">
              <Button size="icon" as-child>
                <NuxtLink to="/admin/audit/0">
                  <Pencil class="h-6" />
                </NuxtLink>
              </Button>
            </div>
          </template>
          <div class="w-full bg-card">
            <div class="px-6 py-2 ">
              <div class="flex justify-between items-center">
                <h5 class="text-xl flex items-center gap-x-2">
                  <Package class="h-6 text-green-500" />
                  <span>Продажа #3315</span>
                </h5>
                <span class="text-lg">128,7 р</span>
              </div>
              <div class="flex items-center gap-x-2 opacity-60 text-xs mt-2">
                <div class="flex items-center gap-x-1">
                  <Store class="size-3" />
                  <span>Мой магазин</span>
                </div>
                <ArrowRight class="size-3" />
                <div class="flex items-center gap-x-1">
                  <UserCircle class="size-3" />
                  <span>Розничный покупатель</span>
                </div>
              </div>
            </div>
          </div>
        </IOSSwipe>
        <div class="bg-card px-6 py-2">
          <div class="flex justify-between items-center">
            <h5 class="text-xl flex items-center gap-x-2">
              <Package class="h-6 text-green-500" />
              <span>Продажа #3315</span>
            </h5>
            <span class="text-lg">128,7 р</span>
          </div>
          <div class="flex items-center gap-x-2 opacity-60 text-xs mt-2">
            <div class="flex items-center gap-x-1">
              <Store class="size-3" />
              <span>Мой магазин</span>
            </div>
            <ArrowRight class="size-3" />
            <div class="flex items-center gap-x-1">
              <UserCircle class="size-3" />
              <span>Розничный покупатель</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
