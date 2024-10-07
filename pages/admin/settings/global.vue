<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.globalSettings.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.globalSettings.subtitle') }}
      </p>
    </div>
    <AdminGlobalSettingsInfo />
    <div class="pa-12" />
    <AdminGlobalSettingsLogoFavicon />
    <div class="pa-12" />
    <AdminGlobalSettingsSitemapRobotsTxt />
  </v-sheet>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
})

const { t } = useI18n()
const { appName } = useAppConfig()

useHead({
  title: t('page.globalSettings.head.title'),
  titleTemplate: `%s | ${appName}`,
})
</script>
