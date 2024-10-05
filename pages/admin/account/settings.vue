<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.accountSettings.profilePicture.section.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.accountSettings.profilePicture.section.subtitle') }}
      </p>
    </div>
    <AdminChangeAvatar avatarImage="/images/default-avatar.jpg" />
    <div class="pa-12" />
    <AdminAccountPersonalInfo />
    <div class="pa-12" />
    <AdminAccountEmailAddress />
  </v-sheet>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
})

const { t } = useI18n()
const { appName } = useAppConfig()

useHead({
  title: t('page.accountSettings.head.title'),
  titleTemplate: `%s | ${appName}`,
})
</script>
