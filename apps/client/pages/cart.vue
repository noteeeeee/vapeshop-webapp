<script setup lang="ts">
import { useMounted } from "@vueuse/core";
import { PackageCheck } from "lucide-vue-next";

const isMounted = useMounted();
</script>

<template>
  <div class="">
    <BackButton />
    <div class="mt-6">
      <h2 class="text-3xl font-semibold">Корзина</h2>
      <div class="flex gap-x-4 mt-4">
        <div
          class="flex-1 bg-card p-4 shadow-md rounded-lg text-sm justify-center flex gap-x-2"
        >
          <span class="opacity-40">Всего товаров:</span>
          <span class="text-text-primary">10</span>
        </div>
        <div
          class="flex-1 bg-card p-4 shadow-md rounded-lg text-sm justify-center flex gap-x-2"
        >
          <span class="opacity-40">Сумма:</span>
          <span class="text-text-primary">100 р</span>
        </div>
      </div>
      <div
        class="mt-8 text-foreground/60 border-none p-0 flex items-center gap-x-2"
      >
        <div class="">
          <svg
            class="size-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9999 17.001C13.3812 17.001 14.501 18.1208 14.501 19.5021C14.501 20.8834 13.3812 22.0032 11.9999 22.0032C10.6186 22.0032 9.49876 20.8834 9.49876 19.5021C9.49876 18.1208 10.6186 17.001 11.9999 17.001ZM11.9999 18.501C11.447 18.501 10.9988 18.9492 10.9988 19.5021C10.9988 20.055 11.447 20.5032 11.9999 20.5032C12.5528 20.5032 13.001 20.055 13.001 19.5021C13.001 18.9492 12.5528 18.501 11.9999 18.501ZM11.9989 2.00195C14.1392 2.00195 15.8743 3.73701 15.8743 5.87732C15.8743 8.71079 14.8843 12.4313 14.3389 14.2751C14.0293 15.3215 13.0656 16.0034 12.0005 16.0034C10.9331 16.0034 9.96834 15.3186 9.65983 14.2703L9.43737 13.4931C8.88258 11.499 8.12354 8.33061 8.12354 5.87732C8.12354 3.73701 9.85859 2.00195 11.9989 2.00195ZM11.9989 3.50195C10.687 3.50195 9.62354 4.56544 9.62354 5.87732C9.62354 8.43895 10.5511 11.9856 11.0988 13.8468C11.2124 14.2327 11.5729 14.5034 12.0005 14.5034C12.4274 14.5034 12.7868 14.2339 12.9005 13.8496L13.0582 13.3052C13.6087 11.3647 14.3743 8.23303 14.3743 5.87732C14.3743 4.56544 13.3108 3.50195 11.9989 3.50195Z"
              fill="white"
              fill-opacity="0.6"
            />
          </svg>
        </div>
        <div class="!mb-0 !pb-0 text-sm">
          В заказе 16 флаконов, дополните корзину еще 4 флаконами, и цена станет
          ниже.
        </div>
      </div>
      <div class="mt-6 flex flex-col gap-y-4">
        <div
          v-for="i in 6"
          class="bg-card p-4 flex items-center gap-x-2 rounded-md shadow-md"
        >
          <Card
            class="p-2 border-none bg-popover rounded-md flex justify-center items-center aspect-square h-12"
          >
          </Card>
          <div class="grid grid-cols-12 flex-1">
            <div class="col-span-5">
              <h4 class="truncate">Protest Liquid</h4>
              <h5 class="opacity-60 text-xs truncate">Grape Soda</h5>
            </div>
            <div class="col-span-7 flex justify-end items-center gap-x-4">
              <NumberField
                :default-value="2"
                class="max-w-24 text-xs h-8 overflow-hidden"
              >
                <NumberFieldContent class="h-8">
                  <NumberFieldDecrement class="scale-75" />
                  <NumberFieldInput class="h-8 text-xs" />
                  <NumberFieldIncrement class="scale-75" />
                </NumberFieldContent>
              </NumberField>
              <h4 class="text-text-primary">20 р</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Teleport to="#actionButton" v-if="isMounted">
      <div class="bg-background w-full absolute bottom-0">
        <Button variant="orange" as-child>
          <NuxtLink
            to="/checkout"
            class="w-full rounded-md flex items-center gap-x-4 h-12"
          >
            <div class="flex gap-x-2 items-center">
              <PackageCheck class="size-6" />
              <span class="font-semibold text-xl">Оформить заказ</span>
            </div>
            <div class="h-4 border-x border-black"></div>
            <span class="font-semibold text-xl">9.000 р</span>
          </NuxtLink>
        </Button>
      </div>
    </Teleport>
  </div>
</template>
