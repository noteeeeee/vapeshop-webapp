<script setup lang="ts">
import { CircleArrowRight } from "lucide-vue-next";

const { deliveryMethods } = useDeliveryMethods();
</script>

<template>
  <div>
    <div class="mt-6">
      <h2 class="text-3xl font-semibold">Способ доставки</h2>
      <p class="text-sm max-w-60 mt-4 mb-6 opacity-40">
        Выберите способ получения посылки из нижеперечисленных.
      </p>
    </div>
    <div class="flex flex-col gap-y-4">
      <NuxtLink
        :to="`/checkout/delivery/${method.id}`"
        v-for="method in deliveryMethods"
        :key="method.id"
        class="hover:bg-primary transition-colors bg-card py-4 px-6 flex items-center justify-between rounded-md shadow-md cursor-pointer group"
      >
        <div class="flex items-center gap-x-4">
          <div
            :class="method.imageWithFrame && 'size-8 rounded-full bg-white flex justify-center items-center'"
          >
            <NuxtImg
              class="rounded-full" :class="method.imageWithFrame ? 'size-6' : 'size-8'"
              :src="`/images/delivery-logos/${method.img}`"
            />
          </div>

          <h4 class="truncate font-semibold">{{ method.name }}</h4>
        </div>
        <CircleArrowRight
          class="transition-opacity size-6 opacity-60 group-hover:opacity-100"
        />
      </NuxtLink>
    </div>
  </div>
</template>
