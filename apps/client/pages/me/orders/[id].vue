<script setup lang="ts">
import { ListTodo, Replace } from "lucide-vue-next";

const { findOne } = useDeliveryMethods();
const dayjs = useDayjs();
const { countdown } = useCountdown(computed(() => dayjs().add(24, "h")));
const yandex = computed(() => findOne("yandex_post_minsk"));
</script>

<template>
  <div class="">
    <BackButton />
    <div class="mt-6">
      <h2 class="text-3xl font-semibold">Заказ #2389</h2>
    </div>
    <div class="mt-8">
      <Table>
        <TableBody class="text-white/60 text-left">
          <TableRow class="border-b-0">
            <TableCell class="font-medium"> Трек номер:</TableCell>
            <TableCell class="underline text-white text-right"
              >BY080032513319
            </TableCell>
          </TableRow>
          <TableRow class="border-b-0">
            <TableCell class="font-medium"> Стоимость заказа:</TableCell>
            <TableCell class="text-right">100 р (BYN)</TableCell>
          </TableRow>
          <TableRow class="border-b-0">
            <TableCell class="font-medium"> Статус заказа:</TableCell>
            <TableCell class="text-right">100 р (BYN)</TableCell>
          </TableRow>
          <TableRow class="border-b-0">
            <TableCell class="font-medium"> Время на оплату:</TableCell>
            <TableCell class="text-right">{{ countdown }}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="font-medium"> Заказ создан:</TableCell>
            <TableCell class="text-right"
              >{{ dayjs().format("lll") }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table class="mt-4">
        <TableBody class="text-white/60 text-left">
          <TableRow>
            <TableCell class="font-medium"> Способ доставки:</TableCell>
            <TableCell class="flex justify-end items-center gap-x-1.5">
              <div
                :class="
                  yandex.imageWithFrame &&
                  'size-4 rounded-full bg-white flex justify-center items-center'
                "
              >
                <NuxtImg
                  class="rounded-full"
                  :class="yandex.imageWithFrame ? 'size-3' : 'size-4'"
                  :src="`/images/delivery-logos/${yandex.img}`"
                />
              </div>
              <span>{{ yandex.name }}</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <div class="flex gap-x-4 mt-6">
      <Button
        variant="secondary"
        class="flex-1 bg-card p-4 shadow-md rounded-lg text-sm flex items-center gap-x-4 text-white/60 text-wrap text-left h-auto"
      >
        <ListTodo class="size-8" />
        <span class="font-semibold">Скачать накладную</span>
      </Button>
      <Button
        variant="secondary"
        class="flex-1 bg-card p-4 shadow-md rounded-lg text-sm flex items-center gap-x-4 text-white/60 text-wrap text-left h-auto"
      >
        <Replace class="size-8" />
        <span class="font-semibold">Повторить заказ</span>
      </Button>
    </div>
    <div class="mt-16 flex flex-col gap-y-4">
      <div
          v-for="i in 6"
          class="bg-card p-4 flex items-center gap-x-2 rounded-md shadow-md"
      >
        <Card
            class="p-2 border-none bg-popover rounded-md flex justify-center items-center aspect-square h-12"
        >
        </Card>
        <div class="grid grid-cols-12 flex-1">
          <div class="col-span-7">
            <h4 class="truncate">Protest Liquid</h4>
            <h5 class="opacity-60 text-xs truncate">Grape Soda</h5>
          </div>
          <div class="col-span-5 flex justify-between items-center gap-x-4">
            <h4 class="text-text-primary">10 шт</h4>
            <h4 class="text-text-primary">20 р</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
