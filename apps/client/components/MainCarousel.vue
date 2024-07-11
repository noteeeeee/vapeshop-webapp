<script setup lang="ts">
import type { CarouselApi } from "@/components/ui/carousel";
import { type PrimitiveProps, Primitive } from "radix-vue";
import { watchOnce } from "@vueuse/core";
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Autoplay from "embla-carousel-autoplay";

const props = defineProps<
    PrimitiveProps & {
    items: {}[];
    class?: HTMLAttributes["class"];
  }
>();

const emblaMainApi = ref<CarouselApi>();
const emblaThumbnailApi = ref<CarouselApi>();
const selectedIndex = ref(0);

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
}

function onThumbClick(index: number) {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  emblaMainApi.value.scrollTo(index);
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return;

  onSelect();
  emblaMainApi.on("select", onSelect);
  emblaMainApi.on("reInit", onSelect);
});
</script>

<template>
  <Primitive
    v-bind="props"
    :class="cn('w-full sm:w-auto relative', props.class)"
  >
    <Carousel
      class="relative w-full"
      :plugins="[
        Autoplay({
          delay: 5000,
        }) as any,
        WheelGesturesPlugin(),
      ]"
      @init-api="(val) => (emblaMainApi = val)"
    >
      <CarouselContent>
        <CarouselItem v-for="(_, index) in props.items" :key="index">
          <div class="">
            <Card class="bg-secondary rounded-2xl">
              <CardContent
                class="flex items-center justify-center px-6 py-12 text-black"
              >
                <span class="text-4xl font-bold">{{ index + 1 }}</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>

    <Carousel
      class="absolute w-full max-w-14 bottom-2 left-1/2 -translate-x-1/2"
      @init-api="(val) => (emblaThumbnailApi = val)"
    >
      <CarouselContent class="flex gap-1 ml-0">
        <CarouselItem
          v-for="(_, index) in props.items"
          :key="index"
          class="pl-0 basis-1/6 cursor-pointer"
          @click="onThumbClick(index)"
        >
          <div class="p-1" :class="index === selectedIndex ? '' : 'opacity-50'">
            <div class="size-2 rounded-full bg-white"></div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </Primitive>
</template>
