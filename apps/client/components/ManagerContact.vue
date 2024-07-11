<script setup lang="ts">
import { Clock, NotebookPen } from "lucide-vue-next";
import { Primitive, type PrimitiveProps } from "radix-vue";
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

const img = useImage();
const props = defineProps<
  PrimitiveProps & {
    class?: HTMLAttributes["class"];
  }
>();
</script>

<template>
  <Primitive v-bind="props" :class="cn('bg-card rounded-md p-4', props.class)">
    <div class="flex items-end justify-between">
      <span class="opacity-60 text-sm">
        <slot>
          Менеджер
        </slot>
      </span>
      <div class="flex items-center gap-x-2 text-green-500">
        <Clock class="size-4" />
        <span>08:00 - 20:00</span>
      </div>
    </div>
    <div class="flex justify-between mt-6 items-center">
      <div class="flex items-center gap-x-3">
        <Avatar>
          <AvatarImage
            :src="
              img('/images/manager-avatar.png', {
                width: 256,
              })
            "
          />
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
        <div class="">
          <h4 class="font-bold text-lg text-text-primary">ninjaBY</h4>
          <h5 class="text-xs opacity-40">@ninjaBY</h5>
        </div>
      </div>
      <NuxtLink
        class="text-sm opacity-60 hover:underline flex items-center gap-x-1"
      >
        <NotebookPen class="size-4" />
        <span>Написать</span></NuxtLink
      >
    </div>
  </Primitive>
</template>
