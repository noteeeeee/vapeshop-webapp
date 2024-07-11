<script setup lang="ts">
import { Package, Percent } from "lucide-vue-next";

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
        <Package class="size-8" />
        <span>Товар</span>
      </h2>
    </div>
    <div class="mt-6">
      <FormKit type="text" label="Название товара" />
      <FormKit
        type="numberfiled"
        :default-value="0"
        :format-options="{
          style: 'currency',
          currency: 'RUB',
          currencyDisplay: 'code',
          currencySign: 'accounting',
        }"
        label="Цена закупки"
      >
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </FormKit>
      <FormKit
        type="filepond"
        class="mb-0"
        name="image"
        placeholder="Выберите изображение..."
        image-resize-target-width="248"
        image-resize-mode="contain"
        accepted-file-types="image/jpeg, image/png"
      />
    </div>
    <div class="mt-6">
      <h2 class="text-3xl font-semibold">Цены</h2>
      <div class="grid grid-cols-2 mt-4 gap-x-4">
        <div class="">
          <FormKit
            type="numberfiled"
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
            :default-value="0"
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
        <FormKit
          type="dropdown"
          name="categoryID"
          label="Вкус"
          validation="required"
        >
          <SelectTrigger>
            <SelectValue placeholder="Не выбрана" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="000"> Дессертный</SelectItem>
            <SelectItem value="000"> Жвачка</SelectItem>
            <SelectItem value="000"> Йогурт</SelectItem>
            <SelectItem value="000"> Мята/Ментол</SelectItem>
            <SelectItem value="000"> Мороженое</SelectItem>
            <SelectItem value="000"> Конфеты/мармелад</SelectItem>
            <SelectItem value="000"> Напитки/лимонады</SelectItem>
            <SelectItem value="000"> Фрукты/Ягоды</SelectItem>
            <SelectItem value="000"> Табачный</SelectItem>
            <SelectItem value="000"> Хвойный</SelectItem>
            <SelectItem value="000"> Цитрус</SelectItem>
            <SelectItem value="000"> Чай</SelectItem>
            <SelectItem value="000"> Другое</SelectItem>
          </SelectContent>
        </FormKit>
        <FormKit
          type="dropdown"
          name="categoryID"
          label="Неконтин"
          validation="required"
        >
          <SelectTrigger>
            <SelectValue placeholder="Не выбрана" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="000"> Солевой</SelectItem>
            <SelectItem value="000"> Щелочный</SelectItem>
            <SelectItem value="000"> Гибритный</SelectItem>
          </SelectContent>
        </FormKit>
        <FormKit
          type="dropdown"
          name="categoryID"
          label="Крепость"
          validation="required"
        >
          <SelectTrigger>
            <SelectValue placeholder="Не выбрана" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="000"> 0 MG</SelectItem>
            <SelectItem value="000"> 3 MG</SelectItem>
            <SelectItem value="000"> 6 MG</SelectItem>
            <SelectItem value="000"> 9 MG</SelectItem>
            <SelectItem value="000"> 12 MG</SelectItem>
            <SelectItem value="000"> 18 MG</SelectItem>
            <SelectItem value="000"> 20 MG</SelectItem>
            <SelectItem value="000"> 20 MG Strong</SelectItem>
            <SelectItem value="000"> 20 MG Ultra</SelectItem>
            <SelectItem value="000"> 20 MG Hard</SelectItem>
          </SelectContent>
        </FormKit>
        <FormKit
          type="numberfiled"
          :step="1"
          :min="1"
          label="Количество затяжек"
        >
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </FormKit>
      </div>
    </div>
    <div class="mt-6">
      <h2 class="text-3xl font-semibold mb-4">Основная информация</h2>
      <FormKit
        type="dropdown"
        name="categoryID"
        label="Категория"
        validation="required"
      >
        <SelectTrigger>
          <SelectValue placeholder="Не выбрана" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="000"> Солевой</SelectItem>
          <SelectItem value="000"> Щелочный</SelectItem>
          <SelectItem value="000"> Гибритный</SelectItem>
        </SelectContent>
      </FormKit>
<!--      <FormKit type="tiptap" label="Описание"></FormKit>-->
    </div>
  </div>
</template>
