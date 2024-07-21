<script setup lang="ts">
import type { CategoryDto, CreateCategoryDto } from "~/types";
import { useToast } from "~/components/ui/toast";
import { useQueryClient } from "@tanstack/vue-query";

definePageMeta({
  layout: "admin",
  middleware: "admin",
});

const queryClient = useQueryClient();
const client = useApiClient();
const router = useRouter();
const route = useRoute();
const { toast } = useToast();

const { isLoading, data } = useApi<CategoryDto[]>(
  () => client.categories.categoriesControllerFindAll().then((res) => res.data),
  ["categories"],
);
const category = computed(() =>
  data.value?.find((value) => value.id == route.params.id),
);

const submit = (data: CreateCategoryDto) =>
  client.categories.categoriesControllerUpdate(route.params.id, data).then(() => {
    toast({
      title: "Кактегория обновлена",
    });
    queryClient.removeQueries({
      queryKey: ["categories"],
    })
    router.push("/admin/categories");
  });
</script>

<template>
  <div class="px-6" v-if="category">
    <BackButton to="/admin" />
    <div class="mt-6">
      <h2 class="text-3xl font-semibold">Редактировать категорию</h2>
    </div>
    <div class="mt-6">
      <FormKit type="form" @submit="submit" :actions="false">
        <FormKit
          type="text"
          validation="required"
          name="name"
          :value="category.name"
          label="Название категории"
        />
        <FormKit
          type="filepond"
          name="image"
          :value="[category.image]"
          validation="required"
          placeholder="Выберите изображение..."
          image-resize-target-width="248"
          image-resize-mode="contain"
          accepted-file-types="image/jpeg, image/png"
        />
        <FormKit type="submit">Редактировать</FormKit>
      </FormKit>
    </div>
  </div>
</template>
