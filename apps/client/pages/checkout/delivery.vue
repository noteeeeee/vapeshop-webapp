<script setup lang="ts">
import { useMounted } from "@vueuse/core";

const { findOne } = useDeliveryMethods();
const isMounted = useMounted();
const route = useRoute();

const delivery = computed(() => findOne(route.path.split("/").at(-1)));

onMounted(() => {
  if (!delivery.value)
    throw createError({
      statusCode: 404,
    });
});
</script>

<template>
  <div class="mt-6 mb-12">
    <h2 class="flex items-center gap-x-4">
      <div
        :class="
          delivery.imageWithFrame &&
          'size-8 rounded-full bg-white flex justify-center items-center'
        "
      >
        <NuxtImg
          class="rounded-full"
          :class="delivery.imageWithFrame ? 'size-6' : 'size-8'"
          :src="`/images/delivery-logos/${delivery.img}`"
        />
      </div>
      <span class="text-3xl font-semibold">{{ delivery.name }}</span>
    </h2>
    <p class="text-sm mt-4 mb-6 opacity-40">
      Введите данные для последующей отправки.
    </p>

    <NuxtPage />

    <Teleport to="#actionButton" v-if="isMounted">
      <div class="bg-background w-full absolute bottom-0">
        <Button variant="orange" as-child>
          <NuxtLink
            to="/orders/1"
            class="w-full rounded-md font-semibold text-xl h-12"
          >
            Продолжить
          </NuxtLink>
        </Button>
      </div>
    </Teleport>
  </div>
</template>
