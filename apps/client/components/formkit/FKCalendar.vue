<script setup lang="ts">
import {cn} from "~/lib/utils";
import type {FormKitFrameworkContext} from "@formkit/core";

const props = defineProps<{
  context: FormKitFrameworkContext["node"]["context"];
}>();

const date = ref(props.context?._value)
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>

      <Button
          :variant="'outline'"
          :class="cn(
          'w-full justify-start text-left font-normal',
          !date && 'text-muted-foreground',
        )"
      >
        <LucideCalendar class="mr-2 h-4 w-4" />
        <span>{{ date ? $dayjs(date, 'PPP - hh:mm') : "" }}</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="date" @update:model-value="props.context?.node.input" mode="datetime" />
    </PopoverContent>
  </Popover>
</template>