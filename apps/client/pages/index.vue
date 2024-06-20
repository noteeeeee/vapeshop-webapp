<script setup lang="ts">
import {useQuery} from "@tanstack/vue-query";

const client = useApiClient()
const { data } = useApi(() => client.auth.authControllerMe().then(res => res.data), ["me"])
</script>

<template>
<div class="">
  {{ data }}
</div>
</template>

<style scoped>

</style>