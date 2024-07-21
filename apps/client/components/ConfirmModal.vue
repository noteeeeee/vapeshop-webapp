<template>
  <Drawer :open="isOpen">
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{{ title }}</DrawerTitle>
        <DrawerDescription v-if="description">{{ description }}</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <Button :variant="variant" @click="handleConfirm"
          >{{ confirmLabel || "Подтвердить" }}
        </Button>
        <Button variant="outline" @click="handleClose"> Отмена </Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>

<script setup lang="ts">
import type {ConfirmOptions} from "~/composables/utils/useConfirm";

const props = defineProps<ConfirmOptions>()
const isOpen = ref(true)

const handleConfirm = () => {
  if (props.onConfirm) {
    props.onConfirm();
  }
  isOpen.value = false
};

const handleClose = () => {
  isOpen.value = false
};
</script>
