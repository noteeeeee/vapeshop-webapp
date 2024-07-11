<script setup lang="ts">
import type { FormKitFrameworkContext } from "@formkit/core";
import { mergeWithCN } from "~/lib/utils";

const props = defineProps<{
  context: FormKitFrameworkContext["node"]["context"];
}>();

props.context.classes = mergeWithCN({}, props.context.classes);

const html = ref(props.context?._value);
</script>

<template>
  <TiptapEditor
    v-model:html="html"
    @update:html="context?.node.input"
    @blue="context?.handlers.blur"
  />
</template>
