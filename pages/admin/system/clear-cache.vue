<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.clearCache.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.clearCache.subtitle') }}
      </p>
    </div>
    <Alert type="info" :message="$t('clearAll.text')" />
    <v-btn
      color="primary"
      rounded="pill"
      variant="flat"
      size="x-large"
      class="mt-6 text-body-1"
      block
    >
      {{ $t('label.clearAll') }}
    </v-btn>
  </v-sheet>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
})

const { t } = useI18n()
const { appName } = useAppConfig()

useHead({
  title: t('page.clearCache.head.title'),
  titleTemplate: `%s | ${appName}`,
})
</script>
