<script setup lang="ts">
import { Package } from "lucide-vue-next";
import type { CategoryDto, ProductDto } from "~/types";
import { useToast } from "~/components/ui/toast";
import {useQueryClient} from "@tanstack/vue-query";

definePageMeta({
  layout: "admin",
  middleware: "admin",
});

const queryClient = useQueryClient();
const router = useRouter();
const route = useRoute();
const { toast } = useToast();
const client = useApiClient();
const { flavors, nicotine, strength } = useFilters();

const { data } = useApi<ProductDto>(
  () =>
    client.products
      .productsControllerFindOne(route.params.id)
      .then((res) => res.data),
  ["product", route.params.id],
);
const { data: categories } = useApi<CategoryDto[]>(
  () => client.categories.categoriesControllerFindAll().then((res) => res.data),
  ["categories"],
);

function submit(credentials: any) {
  client.products.productsControllerUpdate(route.params.id, credentials).then(() => {
    toast({
      title: "Товар обновлен",
    });
    queryClient.removeQueries({
      queryKey: ["products"],
    })
    router.push("/admin/categories/products");
  });
}
</script>

<template>
  <div class="px-6">
    <BackButton to="/admin" />
    <FormKit type="form" @submit="submit" :actions="false" v-if="data">
      <div class="mt-6">
        <h2 class="text-3xl font-semibold flex items-center gap-x-2">
          <Package class="size-8" />
          <span>Товар</span>
        </h2>
      </div>
      <div class="mt-6">
        <FormKit
          name="name"
          type="text"
          :value="data.name"
          validation="required"
          label="Название товара"
        />
        <FormKit :value="data.brand" name="brand" type="text" label="Название бренда" />
        <FormKit
          type="filepond"
          class="mb-0"
          name="image"
          :value="[data.image]"
          placeholder="Выберите изображение..."
          image-resize-target-width="248"
          image-resize-mode="contain"
          validation="required"
          accepted-file-types="image/jpeg, image/png"
        />
      </div>
      <div class="mt-6">
        <h2 class="text-3xl font-semibold">Цены</h2>
        <div class="grid grid-cols-2 mt-4 gap-x-4">
          <div class="">
            <FormKit
              type="numberfiled"
              :value="data.quantitySales_5"
              name="quantitySales_5"
              :default-value="0"
              :step="0.01"
              :format-options="{
                style: 'percent',
              }"
              label="Скидка от 5"
            >
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </FormKit>
            <FormKit
              type="numberfiled"
              :value="data.quantitySales_10"
              name="quantitySales_10"
              :default-value="0"
              :step="0.01"
              :format-options="{
                style: 'percent',
              }"
              label="Скидка от 10"
            >
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </FormKit>
            <FormKit
              type="numberfiled"
              :value="data.quantitySales_20"
              name="quantitySales_20"
              :default-value="0"
              :step="0.01"
              :format-options="{
                style: 'percent',
              }"
              label="Скидка от 20"
            >
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </FormKit>
            <FormKit
              type="numberfiled"
              :value="data.quantitySales_40"
              name="quantitySales_40"
              :default-value="0"
              :step="0.01"
              :format-options="{
                style: 'percent',
              }"
              label="Скидка от 40"
            >
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </FormKit>
            <FormKit
              type="numberfiled"
              name="quantitySales_100"
              :value="data.quantitySales_100"
              :default-value="0"
              :step="0.01"
              :format-options="{
                style: 'percent',
              }"
              label="Скидка от 100"
              :floating-label="true"
            >
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </FormKit>
          </div>
          <div class="">
            <FormKit
              type="numberfiled"
              name="price"
              :value="data.price"
              :default-value="0"
              :step="0.1"
              validation="required"
              :format-options="{
                style: 'currency',
                currency: 'RUB',
                currencyDisplay: 'code',
                currencySign: 'accounting',
              }"
              label="Цена продажи"
            >
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </FormKit>
            <FormKit
              type="numberfiled"
              name="buyingPrice"
              :value="data.buyingPrice"
              validation="required"
              :default-value="0"
              :step="0.1"
              :format-options="{
                style: 'currency',
                currency: 'RUB',
                currencyDisplay: 'code',
                currencySign: 'accounting',
              }"
              label="Цена закупки"
              :floating-label="true"
            >
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </FormKit>
            <FormKit
              type="numberfiled"
              name="sale"
              :value="data.sale"
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
          </div>
        </div>
      </div>
      <div class="mt-6">
        <h2 class="text-3xl font-semibold">Фильтры</h2>
        <div class="mt-4">
          <FormKit :value="data.flavor" type="dropdown" name="flavor" label="Вкус">
            <SelectTrigger>
              <SelectValue placeholder="Не выбрана" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="flavor in flavors"
                :key="flavor.value"
                :value="flavor.value"
              >
                {{ flavor.label }}
              </SelectItem>
            </SelectContent>
          </FormKit>
          <FormKit :value="data.nicotine" type="dropdown" name="nicotine" label="Неконтин">
            <SelectTrigger>
              <SelectValue placeholder="Не выбрана" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="n in nicotine" :key="n.value" :value="n.value">
                {{ n.label }}
              </SelectItem>
            </SelectContent>
          </FormKit>
          <FormKit :value="data.strength" type="dropdown" name="strength" label="Крепость">
            <SelectTrigger>
              <SelectValue placeholder="Не выбрана" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="s in strength" :key="s.value" :value="s.value">
                {{ s.label }}
              </SelectItem>
            </SelectContent>
          </FormKit>
        </div>
      </div>
      <div class="mt-6">
        <h2 class="text-3xl font-semibold mb-4">Основная информация</h2>
        <FormKit
          v-if="categories"
          :value="String(data.category?.id)"
          type="dropdown"
          name="categoryID"
          label="Категория"
          validation="required"
        >
          <SelectTrigger>
            <SelectValue placeholder="Не выбрана" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="cat in categories" :value="String(cat.id)">
              {{ cat.name }}
            </SelectItem>
          </SelectContent>
        </FormKit>
        <FormKit type="submit">Редактировать</FormKit>
      </div>
    </FormKit>
  </div>
</template>
