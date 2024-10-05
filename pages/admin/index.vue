<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="1000">
    <div class="d-flex align-center">
      <v-list-item class="pa-0 ma-0" color="black">
        <template #prepend>
          <v-avatar theme="light" color="primary" :size="80">
            <v-img
              v-if="avatarImage"
              :src="avatarImage"
              :lazy-src="avatarImage"
            >
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular
                    color="grey-lighten-4"
                    :width="3"
                    indeterminate
                  />
                </div>
              </template>
            </v-img>
            <h3 class="text-h6 font-weight-bold" v-else>
              {{ getFirstLetters('Erik Kovalsky', 2) }}
            </h3>
          </v-avatar>
        </template>
        <v-list-item-title class="text-h6 mb-1">
          {{ $t('dashboardWelcome.title', { name: 'Erik Kovalsky' }) }}
        </v-list-item-title>
        <v-list-item-subtitle class="text-body-1">
          {{ $t('dashboardWelcome.subtitle') }}
        </v-list-item-subtitle>
      </v-list-item>
      <v-spacer />
      <v-btn
        color="primary"
        rounded="pill"
        variant="flat"
        size="large"
        class="text-body-2"
        to="/admin/account/activity"
      >
        {{ $t('label.viewActivity') }}
      </v-btn>
    </div>
  </v-sheet>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
})

const { t } = useI18n()
const { appName } = useAppConfig()

useHead({
  title: t('page.dashboard.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const avatarImage = ref<string>('https://i.pravatar.cc/150?img=19')
</script>
