<script setup lang="ts">
import { Search, SlidersHorizontal, Filter } from "lucide-vue-next";
import BackButton from "~/components/BackButton.vue";
import ProductCard from "~/components/ProductCard.vue";
import type { CategoryDto, ProductDto } from "~/types";
import { useConfirm } from "~/composables/utils/useConfirm";

definePageMeta({
  layout: "admin",
  middleware: "admin",
});

const priceRange = ref([0, 2000]);
const client = useApiClient();
const { data, isLoading, refetch } = usePagination<ProductDto>(
  () => client.products.productsControllerPaginate().then((res) => res.data),
  "products",
);

const { $confirm: $delete } = useConfirm({
  title: "Вы уверенны?",
  variant: "destructive",
});

async function onDelete(id: number) {
  await client.products.productsControllerDelete(id);
  refetch();
}
</script>

<template>
  <div class="px-6">
    <BackButton to="/admin" />
    <div class="mt-6 flex gap-x-2">
      <div class="relative flex-1">
        <Input
          @keyup.enter="$router.push('/products')"
          placeholder="Поиск по названию"
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
              <Separator class="mt-4" />
              <Accordion
                class="px-6"
                type="multiple"
                collapsible
                :default-value="['price']"
              >
                <AccordionItem value="price" class="border-b-0">
                  <AccordionTrigger class="hover:no-underline px-1"
                    >Цена
                  </AccordionTrigger>
                  <AccordionContent class="py-2 px-1">
                    <div class="">
                      <div
                        class="flex justify-between mb-4 opacity-60 text-xs gap-x-2 items-center"
                      >
                        <Input placeholder="0.00" />
                        <div class="border-b-2 border-b-border w-16"></div>
                        <Input placeholder="2000.00" />
                      </div>
                      <div class="flex justify-between mb-2 opacity-60 text-xs">
                        <span>{{ priceRange[0].toFixed(2) }}</span>
                        <span>{{ priceRange[1].toFixed(2) }}</span>
                      </div>
                      <Slider
                        :min-steps-between-thumbs="1"
                        v-model="priceRange"
                        :max="2000"
                        :step="1"
                      />
                    </div>
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
                  В наличии
                </label>
              </div>
              <Separator class="my-4" />
              <div class="flex items-center space-x-2 px-6">
                <Checkbox id="withSale" />
                <label
                  for="withSale"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Товар по акции
                </label>
              </div>
              <Separator class="mt-4" />
              <Accordion type="multiple" collapsible :default-value="['brand']">
                <AccordionItem value="brand">
                  <AccordionTrigger class="hover:no-underline px-6"
                    >Бренд
                  </AccordionTrigger>
                  <AccordionContent class="px-6 flex flex-col gap-y-2">
                    <div class="flex items-center space-x-2">
                      <Checkbox id="brand-1" />
                      <label
                        for="brand-1"
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Бренд 1
                      </label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <Checkbox id="brand-1" />
                      <label
                        for="brand-1"
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Бренд 2
                      </label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="brand">
                  <AccordionTrigger class="hover:no-underline px-6"
                    >Тип некотина
                  </AccordionTrigger>
                  <AccordionContent class="px-6 flex flex-col gap-y-2">
                    <div class="flex items-center space-x-2">
                      <Checkbox id="brand-1" />
                      <label
                        for="brand-1"
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Солевой
                      </label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <Checkbox id="brand-1" />
                      <label
                        for="brand-1"
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Гибритный
                      </label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="brand" class="last-of-type:border-b-0">
                  <AccordionTrigger class="hover:no-underline px-6"
                    >Вкус
                  </AccordionTrigger>
                  <AccordionContent class="px-6 flex flex-col gap-y-2">
                    <div class="flex items-center space-x-2">
                      <Checkbox id="brand-1" />
                      <label
                        for="brand-1"
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Выпечка
                      </label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <Checkbox id="brand-1" />
                      <label
                        for="brand-1"
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Ягодный
                      </label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
    <div class="mt-8 grid grid-cols-3 gap-x-3 gap-y-6">
      <ContextMenu v-for="product in data.data" :key="product.id">
        <ContextMenuTrigger as-child>
         <NuxtLink :to="`/admin/categories/products/${product.id}`">
           <ProductCard v-bind="product" />
         </NuxtLink>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            @click="
              $delete({
                onConfirm: () => onDelete(product.id),
              })
            "
            class="text-destructive"
            >Удалить
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  </div>
</template>
