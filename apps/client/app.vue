<script lang="ts" setup>
import { ExpandedViewport } from "vue-tg";
</script>

<template>
  <div>
    <ExpandedViewport />
    <Toaster />
    <div>
      <div class="fixed w-full top-0 z-20"></div>
      <div>
        <div>
          <NuxtLayout>
            <NuxtPage />
          </NuxtLayout>
        </div>
      </div>
    </div>
  </div>
</template>
