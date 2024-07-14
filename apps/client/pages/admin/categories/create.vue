<script setup lang="ts">
import type { CreateCategoryDto } from "~/types";
import { useToast } from "~/components/ui/toast";

definePageMeta({
  layout: "admin",
  middleware: "admin",
});

const client = useApiClient();
const router = useRouter();
const { toast } = useToast();

const submit = (data: CreateCategoryDto) =>
  client.categories.categoriesControllerCreate(data).then(() => {
    toast({
      title: "Кактегория создана",
    });
    router.push("/admin/categories");
  });
</script>

<template>
  <div class="px-6">
    <BackButton to="/admin" />
    <div class="mt-6">
      <h2 class="text-3xl font-semibold">Создать категорию</h2>
    </div>
    <div class="mt-6">
      <FormKit type="form" @submit="submit" :actions="false">
        <FormKit
          type="text"
          validation="required"
          name="name"
          label="Название категории"
        />
        <FormKit
          type="filepond"
          name="image"
          placeholder="Выберите изображение..."
          image-resize-target-width="248"
          image-resize-mode="contain"
          accepted-file-types="image/jpeg, image/png"
        />
        <FormKit type="submit">Создать</FormKit>
      </FormKit>
    </div>
  </div>
</template>
