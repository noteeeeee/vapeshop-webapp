<script setup lang="ts">
import type { ProductDto } from "~/types";

const { user } = useAuth();
const { getFlavorLabel, getNicotineLabel, getStrengthLabel } = useFilters();
const props = defineProps<ProductDto>();

const maxQuantitySale = computed(() =>
  Math.max(
    props.quantitySales_5 ?? 0,
    props.quantitySales_10 ?? 0,
    props.quantitySales_20 ?? 0,
    props.quantitySales_40 ?? 0,
    props.quantitySales_100 ?? 0,
  ),
);

const totalSale = computed(
  () => (props.sale || 0) + maxQuantitySale.value + (user.value?.discount || 0),
);
const applicableSale = computed(() => Math.min(totalSale.value ?? 0, 99));

const maxPrice = computed(() => Math.max(props.price, props.buyingPrice));

const discountedPrice = computed(() => props.price * (1 - (applicableSale.value / 100)));
const minPrice = computed(() => Math.max(discountedPrice.value, props.buyingPrice));
</script>

<template>
  <div
    class="cursor-pointer opacity-95 hover:opacity-70 transition-opacity text-left"
  >
    <Card
        class="p-4 border-none bg-popover rounded-xl flex justify-center items-center aspect-square"
    >
      <NuxtImg :src="$sourceToUrl(image)" />
    </Card>
    <div class="mt-2">
      <h4 class="font-semibold flex items-end gap-x-1">
        <span>{{ $currency(minPrice) }}</span>
        <div v-if="minPrice != maxPrice" class="flex items-center gap-x-1">
          <div class="w-2 border-b border-b-foreground" />
          <span class="text-xs font-medium">{{ $currency(maxPrice) }}</span>
        </div>
      </h4>
      <div class="truncate text-text-primary my-1">{{ name }}</div>
      <div class="truncate text-sm opacity-60">{{ brand }}</div>
      <div class="text-xs opacity-40 truncate">
        {{ getStrengthLabel(strength) }} / {{ getFlavorLabel(flavor) }} /
        {{ getNicotineLabel(nicotine) }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
