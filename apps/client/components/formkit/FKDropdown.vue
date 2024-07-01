<script setup lang="ts">
import type { FormKitFrameworkContext } from "@formkit/core";
import { mergeWithCN } from "~/lib/utils";

const props = defineProps<{
  context: FormKitFrameworkContext["node"]["context"];
}>();

props.context!.classes = mergeWithCN(
  {
    inner: {
      "bg-black focus-within:ring-white outline outline-2 outline outline-2 outline-black":
        true,
      "group-data-[invalid]:ring-offset-2": true,
      "group-data-[invalid]:ring-2": true,
      "group-data-[invalid]:ring-red-500": true,
      "group-data-[disabled]:bg-neutral-100": true,
      "group-data-[disabled]:!cursor-not-allowed": true,
    },
    label: "!text-white !font-normal !mb-3",
  },
  props.context!.classes,
);

const selected = ref(props.context?._value);
const slots = props.context!.slots.default() || [];
</script>

<template>
  <Select
    v-bind="context?.attrs"
    v-model:model-value="selected"
    @update:model-value="props.context?.node.input"
    :disabled="!!context?.disabled"
    @update:open="(v: string) => !v && context?.handlers.blur"
  >
    <component v-for="(slot, index) in slots" :key="index" :is="slot" />
  </Select>
</template>
