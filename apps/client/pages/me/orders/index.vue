<script setup lang="ts">
import { useMounted } from "@vueuse/core";
import { PackageCheck } from "lucide-vue-next";

const isMounted = useMounted();
</script>

<template>
  <div class="">
    <BackButton />
    <div class="mt-6">
      <h2 class="text-3xl font-semibold">Ваши заказы:</h2>
      <div class="mt-4 text-foreground/60 text-sm">
        Тут можно посмотреть все Ваши заказы и увидеть всю информацию о них.
      </div>
      <div class="mt-8 flex flex-col gap-y-4">
        <Button
          v-for="i in 6"
          class="bg-card p-4 flex items-center gap-x-2 rounded-md shadow-md text-left text-white h-auto text-base"
        >
          <div class="grid grid-cols-12 flex-1">
            <div class="col-span-6">
              <h4 class="truncate">Заказ #2389</h4>
              <h5 class="opacity-60 text-xs truncate">
                {{ $dayjs().format("ll") }}
              </h5>
            </div>
            <div class="col-span-6 flex justify-between items-center gap-x-4">
              <StatusBadge variant="canceled" />
              <h4 class="text-text-primary">20 р</h4>
            </div>
          </div>
        </Button>
      </div>
    </div>
  </div>
</template>
