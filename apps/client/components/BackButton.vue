<script setup lang="ts">
import { type PrimitiveProps, Primitive } from "radix-vue";
import type { HTMLAttributes } from "vue";
import { Undo2 } from "lucide-vue-next";
import { useGesture } from "@vueuse/gesture";

const props = defineProps<
  PrimitiveProps & {
    class?: HTMLAttributes["class"];
    to?: string
  }
>();
</script>

<template>
  <Primitive v-bind="props">
    <div class="flex justify-between items-center">
      <NuxtLink
        class="flex items-center gap-x-2 opacity-60 hover:opacity-100 transition-opacity flex-1 cursor-pointer"
        @click="$routeBackOrPush(to || '/')"
      >
        <div class="bg-white p-0.5 rounded-md">
          <Undo2 class="size-4 text-black" />
        </div>
        <span>Назад</span>
      </NuxtLink>
    </div>
  </Primitive>
</template>
