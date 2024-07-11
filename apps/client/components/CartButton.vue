<script setup lang="ts">
import { ShoppingBag } from "lucide-vue-next";
import { Primitive, type PrimitiveProps } from "radix-vue";
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

const props = defineProps<
  PrimitiveProps & {
    class?: HTMLAttributes["class"];
  }
>();
</script>

<template>
  <Primitive
    v-bind="props"
    :class="cn('bg-background w-full absolute bottom-0', props.class)"
  >
    <Button variant="orange" as-child>
      <NuxtLink
        to="/cart"
        class="w-full rounded-md flex items-center gap-x-4 h-12"
      >
        <div class="flex gap-x-2 items-center">
          <ShoppingBag class="size-6" />
          <span class="font-semibold text-xl">В корзину</span>
        </div>
        <div class="h-4 border-x border-black"></div>
        <span class="font-semibold">8 шт</span>
        <div class="h-4 border-x border-black"></div>
        <span class="font-semibold">9.000 р</span>
      </NuxtLink>
    </Button>
  </Primitive>
</template>
