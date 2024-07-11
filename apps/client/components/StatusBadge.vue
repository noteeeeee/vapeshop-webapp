<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        awaiting_payment:
          "bg-foreground/30 text-foreground",
        processing:
          "bg-orange text-black hover:bg-primary/80",
        in_delivery:
            "bg-orange text-black hover:bg-primary/80",
        completed:
            "bg-green-400 text-black hover:bg-primary/80",
        canceled:
            "bg-red-600 text-white hover:bg-primary/80",
      },
    },
    defaultVariants: {
      variant: "awaiting_payment",
    },
  },
);

const label = {
  awaiting_payment: "Ожидает оплаты",
  processing: "В процессе",
  in_delivery: "В доставке",
  completed: "Выполнен",
  canceled: "Отменен",
};

type BadgeVariants = VariantProps<typeof badgeVariants>;

const props = defineProps<{
  variant?: BadgeVariants["variant"];
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div :class="cn(badgeVariants({ variant }), props.class)">
    <slot>
      {{ label[variant] }}
    </slot>
  </div>
</template>
