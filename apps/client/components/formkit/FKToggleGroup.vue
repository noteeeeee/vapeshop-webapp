<script setup lang="ts">
import type { FormKitFrameworkContext } from "@formkit/core";
import { mergeWithCN } from "~/lib/utils";

const props = defineProps<{
  context: FormKitFrameworkContext["node"]["context"];
}>();

props.context.classes = mergeWithCN(
    {
      label: "!text-white !font-normal !mb-3",
    },
    props.context.classes,
);

const slots = props.context.slots.default() || [];
const model = ref(props.context?._value);

watch(model, (updated, old) => {
  if (!updated) {
    nextTick(() => (model.value = old));
  } else {
    props.context?.node.input(updated);
    setTimeout(() => {
      props.context?.handlers.blur();
    }, 50);
  }
});
</script>

<template>
  <ToggleGroup
      v-bind="context?.attrs"
      :type="context?.attrs?.multiple ? 'multiple' : 'single'"
      v-model:model-value="model"
      :disabled="!!context?.disabled"
      class="flex-wrap justify-start"
  >
    <component v-for="(slot, index) in slots" :key="index" :is="slot" />
  </ToggleGroup>
</template>