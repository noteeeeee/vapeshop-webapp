<script setup lang="ts">
import {
  Filter,
  Pencil,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-vue-next";

definePageMeta({
  layout: "admin",
  middleware: "admin",
});
</script>

<template>
  <div class="px-6">
    <BackButton to="/admin" />
    <div class="mt-6">
      <h2 class="text-3xl font-semibold flex items-center gap-x-2">
        <LucideUserRound class="size-8" />
        <span>Пользователи</span>
      </h2>
    </div>
    <div class="mt-6 flex gap-x-2">
      <div class="relative flex-1">
        <Input
          @keyup.enter="$router.push('/products')"
          placeholder="Поиск по ID, @username"
          class="pr-10 pl-6 h-12"
        />
        <span
          class="absolute end-0 inset-y-0 flex items-center justify-center px-6"
        >
          <Search class="size-4 text-muted-foreground" />
        </span>
      </div>
      <Sheet>
        <SheetTrigger>
          <Button size="icon" class="size-12">
            <SlidersHorizontal class="size-5 text-white w-auto" />
          </Button>
        </SheetTrigger>
        <SheetContent class="px-0">
          <div class="relative flex flex-col">
            <SheetHeader
              class="text-left static top-0 border-b border-b-border pb-4"
            >
              <SheetTitle class="flex items-center gap-x-2 px-6 bg-transparent">
                <Filter class="size-4" />
                <span class="text-base">Фильтр по параметрам</span>
              </SheetTitle>
            </SheetHeader>
            <div class="overflow-y-auto h-[calc(100vh-140px)]">
              <Accordion
                class="px-6"
                type="multiple"
                collapsible
                :default-value="['sort']"
              >
                <AccordionItem value="sort" class="border-b-0">
                  <AccordionTrigger class="hover:no-underline px-1"
                    >Сортировать
                  </AccordionTrigger>
                  <AccordionContent class="px-1 pt-1">
                    <Select default-value="top">
                      <SelectTrigger>
                        <SelectValue class="text-left" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top">
                          По популярности (возрастанию)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Separator class="my-4" />
              <div class="flex items-center space-x-2 px-6">
                <Checkbox id="inStocks" />
                <label
                  for="inStocks"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Только реферы
                </label>
              </div>
              <Separator class="my-4" />
              <div class="flex items-center space-x-2 px-6">
                <Checkbox id="withSale" />
                <label
                  for="withSale"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Только сотрудники
                </label>
              </div>
              <Separator class="my-4" />
              <div class="flex items-center space-x-2 px-6">
                <Checkbox id="withSale" />
                <label
                  for="withSale"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Заблокированные
                </label>
              </div>
            </div>
            <div
              class="text-left static bottom-0 border-b border-b-border pb-4 bg-background pt-4 px-6 border-t border-t-border"
            >
              <div class="flex gap-x-4">
                <Button class="flex-1">Приминить</Button>
                <Button variant="outline">Очистить</Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
    <div class="mt-6">
      <div class="bg-card shadow-md rounded-md">
        <IOSSwipe class="h-[90px]">
          <div class="flex p-4">
            <div class="flex items-center gap-x-3 col-span-6 flex-1">
              <Avatar class="size-14">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div class="flex flex-col">
                <div class="flex items-center gap-x-2">
                  <span class="truncate">Name</span>
                  <Badge
                    variant="destructive"
                    class="size-6 p-0 flex justify-center items-center"
                  >
                    <LucideBan class="size-4" />
                  </Badge>
                  <Badge class="size-6 p-0 flex justify-center items-center">
                    <LucideShieldCheck class="size-4" />
                  </Badge>
                  <Badge
                    variant="secondary"
                    class="size-6 p-0 flex justify-center items-center"
                  >
                    <LucideHandshake class="size-4" />
                  </Badge>
                </div>
                <span class="text-xs opacity-60">@username</span>
              </div>
            </div>
            <div class="col-span-6 flex flex-col justify-center text-xs">
              <div class="flex justify-between gap-x-4">
                <span class="opacity-60">Доход:</span>
                <span>200 р</span>
              </div>
              <div class="flex justify-between gap-x-4">
                <span class="opacity-60">Заказы:</span>
                <span>12</span>
              </div>
              <div class="flex justify-between gap-x-4">
                <span class="opacity-60 truncate max-w-16">Сумма заказов:</span>
                <span>200 р</span>
              </div>
            </div>
          </div>

          <template #actions>
            <div class="px-4 flex gap-2">
              <Button size="icon" as-child>
                <NuxtLink to="/admin/users/0">
                  <Pencil class="h-6" />
                </NuxtLink>
              </Button>
            </div>
          </template>
        </IOSSwipe>
      </div>
    </div>
  </div>
</template>
