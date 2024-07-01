<script setup lang="ts">
const client = useApiClient();
const { url, isLoading } = useBlobImage(
  () => client.bot.botControllerAvatar().then((res) => res.data!),
  "avatar-me",
);

</script>

<template>
  <div class="">
    <img width="200" height="200" v-if="!isLoading" :src="url" alt="" />
  </div>
</template>

<style scoped></style>
