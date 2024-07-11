<script setup lang="ts">
import type { FormKitFrameworkContext } from "@formkit/core";
import { mergeWithCN } from "~/lib/utils";

const props = defineProps<{
  context: FormKitFrameworkContext["node"]["context"];
}>();

props.context.classes = mergeWithCN({}, props.context.classes);

const slots = props.context.slots.default() || [];
const model = ref(props.context?._value);
</script>

<template>
  <NumberField
    class="mt-1"
    v-bind="context?.attrs"
    v-model:model-value="model"
    :disabled="!!context?.disabled"
  >
    <NumberFieldContent>
      <component v-for="(slot, index) in slots" :key="index" :is="slot" />
    </NumberFieldContent>
  </NumberField>
</template>
