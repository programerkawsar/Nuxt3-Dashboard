<template>
  <NuxtLoadingIndicator :color="indicatorColor || '#000'" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const { indicatorColor } = useAppConfig()
</script>
