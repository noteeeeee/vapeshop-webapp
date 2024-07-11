<script setup lang="ts">
import { computed, ref } from "vue";
import {
  onClickOutside,
  usePointerSwipe,
  useScroll,
  useWindowScroll,
  watchDebounced,
} from "@vueuse/core";
import type { UseSwipeDirection } from "@vueuse/core";
import { useWheel } from "@vueuse/gesture";

const target = ref<HTMLElement | null>(null);
const container = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);

const containerWidth = computed(() => container.value?.offsetWidth);

const opacity = ref(0);
const right = ref("0");
const isShow = ref(false);
const isWheeling = ref(false);

function reset() {
  if (!isShow.value) return;
  right.value = "0";
  isShow.value = false;
  opacity.value = 0;
}

function swipeHandler(distanceX: number, isSwiping: boolean) {
  if (containerWidth.value) {
    const distance = distanceX;
    if (distance > 0) {
      right.value = `${distance}px`;
      opacity.value = distance / content.value.offsetWidth - 0.25;
    } else if (distance < 0 && isShow.value) {
      right.value = `${distance + content.value.offsetWidth}px`;
      opacity.value = 1.25 - distance / content.value.offsetWidth;
    }
  }
}

useWheel(
  ({ movement: [x], wheeling }) => {
    swipeHandler(x, wheeling);
    isWheeling.value = wheeling;
    if (wheeling === false || Math.abs(x) > content.value.offsetWidth) {
      if (x > 0 && containerWidth.value && x >= content.value.offsetWidth) {
        right.value = `${content.value.scrollWidth}px`;
        opacity.value = 100;
        isShow.value = true;
      } else {
        reset();
      }
    }
  },
  {
    domTarget: target,
  },
);
const { distanceX, isSwiping } = usePointerSwipe(target, {
  disableTextSelect: true,
  onSwipe(e: PointerEvent) {
    swipeHandler(distanceX.value, isSwiping.value);
  },
  onSwipeEnd(e: PointerEvent, direction: UseSwipeDirection) {
    if (
      distanceX.value > 0 &&
      containerWidth.value &&
      Math.abs(distanceX.value) >= content.value.offsetWidth / 2
    ) {
      right.value = `${content.value.scrollWidth}px`;
      isShow.value = true;
      opacity.value = 100;
    } else {
      reset();
    }
  },
});

onClickOutside(container, reset);

onMounted(() =>
  document.getElementById("body").addEventListener("scroll", reset),
);
onUnmounted(() =>
  document.getElementById("body").removeEventListener("scroll", reset),
);
</script>

<template>
  <div
    ref="container"
    class="relative w-full flex items-center justify-end overflow-hidden"
  >
    <div :style="{ opacity }" ref="content">
      <slot name="actions" />
    </div>
    <div
      ref="target"
      class="absolute w-full top-0 right-0"
      :class="{ 'transition-all duration-200 ease-in-out': !isSwiping }"
      :style="{ right }"
    >
      <slot />
    </div>
  </div>
</template>
