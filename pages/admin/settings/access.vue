<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.accessSettings.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.accessSettings.subtitle') }}
      </p>
    </div>
    <div class="mb-10">
      <Alert type="info" :message="$t('accessSettings.alert.message')" />
    </div>
    <div v-if="errMessage" class="mb-10 mt-n4">
      <Alert type="error" :message="errMessage" />
    </div>
    <v-list lines="two" class="bg-transparent pa-0 ma-0">
      <v-list-item color="black" class="px-0">
        <v-list-item-title class="text-body-1">
          {{ $t('switch.emailConfirmation.title') }}
        </v-list-item-title>
        <v-list-item-subtitle class="pe-3 mt-1 text-body-2">
          {{ $t('switch.emailConfirmation.subtitle') }}
        </v-list-item-subtitle>
        <template #append>
          <v-switch v-model="emailConfirmation" color="primary" hide-details />
        </template>
      </v-list-item>
      <v-list-item color="black" class="px-0">
        <v-list-item-title class="text-body-1">
          {{ $t('switch.passwordLess.title') }}
        </v-list-item-title>
        <v-list-item-subtitle class="pe-3 mt-1 text-body-2">
          {{ $t('switch.passwordLess.subtitle') }}
        </v-list-item-subtitle>
        <template #append>
          <v-switch v-model="passwordLess" color="primary" hide-details />
        </template>
      </v-list-item>
      <v-list-item color="black" class="px-0">
        <v-list-item-title class="text-body-1">
          {{ $t('switch.registrationActive.title') }}
        </v-list-item-title>
        <v-list-item-subtitle class="pe-3 mt-1 text-body-2">
          {{ $t('switch.registrationActive.subtitle') }}
        </v-list-item-subtitle>
        <template #append>
          <v-switch v-model="registrationActive" color="primary" hide-details />
        </template>
      </v-list-item>
      <v-divider class="my-8" />
      <v-list-item color="black" class="px-0">
        <v-list-item-title class="text-body-1">
          {{ $t('switch.facebookLogin.title') }}
        </v-list-item-title>
        <v-list-item-subtitle class="pe-3 mt-1 text-body-2">
          {{ $t('switch.facebookLogin.subtitle') }}
        </v-list-item-subtitle>
        <template #append>
          <v-switch v-model="facebookLogin" color="primary" hide-details />
        </template>
      </v-list-item>
      <v-list-item color="black" class="px-0">
        <v-list-item-title class="text-body-1">
          {{ $t('switch.googleLogin.title') }}
        </v-list-item-title>
        <v-list-item-subtitle class="pe-3 mt-1 text-body-2">
          {{ $t('switch.googleLogin.subtitle') }}
        </v-list-item-subtitle>
        <template #append>
          <v-switch v-model="googleLogin" color="primary" hide-details />
        </template>
      </v-list-item>
      <v-divider class="my-8" />
      <v-list-item color="black" class="px-0">
        <v-list-item-title class="text-body-1">
          {{ $t('switch.enableLoginRecaptcha.title') }}
        </v-list-item-title>
        <v-list-item-subtitle class="pe-3 mt-1 text-body-2">
          {{ $t('switch.enableLoginRecaptcha.subtitle') }}
        </v-list-item-subtitle>
        <template #append>
          <v-switch
            v-model="enableLoginRecaptcha"
            color="primary"
            hide-details
          />
        </template>
      </v-list-item>
      <v-list-item color="black" class="px-0">
        <v-list-item-title class="text-body-1">
          {{ $t('switch.enableRegisterRecaptcha.title') }}
        </v-list-item-title>
        <v-list-item-subtitle class="pe-3 mt-1 text-body-2">
          {{ $t('switch.enableRegisterRecaptcha.subtitle') }}
        </v-list-item-subtitle>
        <template #append>
          <v-switch
            v-model="enableRegisterRecaptcha"
            color="primary"
            hide-details
          />
        </template>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
})

const { t } = useI18n()
const { appName } = useAppConfig()

useHead({
  title: t('page.accessSettings.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const emailConfirmation = ref<boolean>(false)
const passwordLess = ref<boolean>(false)
const registrationActive = ref<boolean>(true)
const facebookLogin = ref<boolean>(false)
const googleLogin = ref<boolean>(false)
const enableLoginRecaptcha = ref<boolean>(false)
const enableRegisterRecaptcha = ref<boolean>(false)
const errMessage = ref<string | null>(null)
</script>
