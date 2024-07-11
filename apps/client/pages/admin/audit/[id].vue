<script setup lang="ts">
import { Package, Pencil, Trash2 } from "lucide-vue-next";

definePageMeta({
  layout: "admin",
  middleware: "admin",
});

const client = useApiClient();
const { findOne } = useDeliveryMethods();
const dayjs = useDayjs();
const { countdown } = useCountdown(computed(() => dayjs().add(24, "h")));
const yandex = computed(() => findOne("yandex_post_minsk"));
const { user } = useAuth();
const { url: avatarURL, isLoading: avatarIsLoading } = useBlobImage(
  () => client.bot.botControllerAvatar().then((res) => res.data!),
  "avatar-me",
);
</script>

<template>
  <div class="px-6">
    <BackButton to="/admin" />
    <div class="mt-6">
      <h2 class="text-3xl font-semibold flex items-center justify-between">
        <div class="flex items-center gap-x-2">
          <Package class="size-8" />
          <div class="flex flex-col">
            <span>Продажа</span>
            <span class="text-sm font-medium opacity-60">Документ</span>
          </div>
        </div>
        <div class="flex gap-x-2 mt-4">
          <Button size="icon" variant="outline">
            <LucidePrinter class="size-5" />
          </Button>
          <Drawer>
            <DrawerTrigger as-child>
              <Button size="icon" variant="outline">
                <LucidePen class="size-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div class="p-4">
                <FormKit type="text" label="Трек номер" />
                <FormKit
                    type="numberfiled"
                    :default-value="0"
                    :format-options="{
                    style: 'currency',
                    currency: 'RUB',
                    currencyDisplay: 'code',
                    currencySign: 'accounting',
                  }"
                    label="Цена"
                    :floating-label="true"
                >
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </FormKit>
                <FormKit
                  type="numberfiled"
                  :default-value="0"
                  :step="0.01"
                  :format-options="{
                    style: 'percent',
                  }"
                  label="Скидка"
                >
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </FormKit>
                <FormKit
                  type="dropdown"
                  name="categoryID"
                  label="Статус"
                  validation="required"
                >
                  <SelectTrigger>
                    <StatusBadge variant="in_delivery" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="awaiting_payment">
                      <StatusBadge variant="awaiting_payment" />
                    </SelectItem>
                    <SelectItem value="processing">
                      <StatusBadge variant="processing" />
                    </SelectItem>
                    <SelectItem value="in_delivery">
                      <StatusBadge variant="in_delivery" />
                    </SelectItem>
                    <SelectItem value="completed">
                      <StatusBadge variant="completed" />
                    </SelectItem>
                    <SelectItem value="canceled">
                      <StatusBadge variant="canceled" />
                    </SelectItem>
                  </SelectContent>
                </FormKit>
                <FormKit type="calendar" label="Заказ создан" />
                <Button class="w-full"> Сохранить</Button>
              </div>
            </DrawerContent>
          </Drawer>
          <Button size="icon" variant="destructive">
            <LucideTicketX class="size-5" />
          </Button>
        </div>
      </h2>
      <div class="mt-6">
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
      <div class="mt-10">
        <h3 class="text-3xl font-semibold">Контрагенты</h3>
        <div
          class="mt-6 bg-card p-4 rounded-md flex justify-between items-center"
        >
          <div class="flex items-center gap-x-4">
            <Avatar class="size-14">
              <AvatarImage
                v-if="!avatarIsLoading"
                :src="avatarURL"
                alt="@radix-vue"
              />
              <AvatarFallback>{{ user.firstName.slice(0, 2) }}</AvatarFallback>
            </Avatar>
            <div class="flex flex-col">
              <span>@{{ user.username }}</span>
              <span class="text-xs opacity-60">Клиент</span>
            </div>
          </div>
          <div class="flex">
            <Drawer>
              <DrawerTrigger as-child>
                <Button size="icon" variant="ghost">
                  <LucideArrowDownUp class="size-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div class="p-4">
                  <FormKit type="text" label="ID контрагента" />
                  <Button class="w-full"> Передать заказ</Button>
                </div>
              </DrawerContent>
            </Drawer>
            <Button size="icon" variant="ghost">
              <LucideCircleArrowRight class="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div class="mt-10">
        <h3 class="text-3xl font-semibold flex justify-between items-center">
          <span>Товары</span>
          <Drawer>
            <DrawerTrigger as-child>
              <Button size="icon" variant="ghost">
                <LucideCirclePlus class="size-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div class="p-4">
                <FormKit type="text" label="ID товара" />
                <FormKit
                  type="numberfiled"
                  :default-value="1"
                  :step="1"
                  label="Количество"
                >
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </FormKit>
                <FormKit
                  type="numberfiled"
                  :default-value="0"
                  :format-options="{
                    style: 'currency',
                    currency: 'RUB',
                    currencyDisplay: 'code',
                    currencySign: 'accounting',
                  }"
                  label="Цена"
                  :floating-label="true"
                >
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </FormKit>
                <FormKit
                  type="numberfiled"
                  :default-value="0"
                  :step="0.01"
                  :format-options="{
                    style: 'percent',
                  }"
                  label="Скидка"
                  :floating-label="true"
                >
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </FormKit>
                <Button class="w-full"> Добавить товар</Button>
              </div>
            </DrawerContent>
          </Drawer>
        </h3>
        <div class="bg-card p-4 flex flex-col gap-y-4 mt-6">
          <IOSSwipe
            v-for="i in 6"
            class="flex items-center gap-x-2 [&:not(:last-of-type)]:border-b border-b-border [&:not(:last-of-type)]:pb-4"
          >
            <div class="grid grid-cols-12 flex-1">
              <div class="col-span-8">
                <h4 class="truncate">Protest Liquid</h4>
                <h5 class="opacity-60 text-xs truncate">Grape Soda</h5>
              </div>
              <div class="col-span-4 flex justify-between items-center gap-x-4">
                <h4 class="text-text-primary">10 шт</h4>
                <h4 class="text-text-primary">20 р</h4>
              </div>
            </div>

            <template #actions>
              <div class="pl-4 flex gap-2 h-full">
                <Drawer>
                  <DrawerTrigger as-child>
                    <Button size="icon">
                      <Pencil class="h-6" />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div class="p-4">
                      <div class="flex items-center mb-6 gap-x-4">
                        <Card
                          class="p-2 border-none bg-popover rounded-md flex justify-center items-center aspect-square h-14"
                        >
                        </Card>
                        <div class="flex flex-col">
                          <h4 class="truncate text-3xl font-bold">
                            Protest Liquid
                          </h4>
                          <h5 class="opacity-60 text-sm truncate">
                            Grape Soda
                          </h5>
                        </div>
                      </div>
                      <FormKit
                        type="numberfiled"
                        :default-value="1"
                        :step="1"
                        label="Количество"
                      >
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                      </FormKit>
                      <FormKit
                        type="numberfiled"
                        :default-value="0"
                        :format-options="{
                          style: 'currency',
                          currency: 'RUB',
                          currencyDisplay: 'code',
                          currencySign: 'accounting',
                        }"
                        label="Цена"
                        :floating-label="true"
                      >
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                      </FormKit>
                      <FormKit
                        type="numberfiled"
                        :default-value="0"
                        :step="0.01"
                        :format-options="{
                          style: 'percent',
                        }"
                        label="Скидка"
                        :floating-label="true"
                      >
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                      </FormKit>
                      <Button class="w-full"> Добавить товар</Button>
                    </div>
                  </DrawerContent>
                </Drawer>
                <Drawer>
                  <DrawerTrigger as-child>
                    <Button size="icon" variant="destructive">
                      <Trash2 class="h-6" />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div class="flex flex-col gap-y-2 p-4">
                      <h3 class="text-xl font-semibold text-center">
                        Вы уверенны?
                      </h3>
                      <Button variant="destructive">Удалить</Button>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
            </template>
          </IOSSwipe>
        </div>
      </div>
    </div>
  </div>
</template>
