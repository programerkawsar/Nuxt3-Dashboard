<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.updateLicense.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.upgradeSoftware.subtitle') }}
      </p>
    </div>
    <Alert type="info" :message="$t('updateLicense.alert.message')" />
    <v-card
      color="transparent"
      variant="flat"
      rounded="xl"
      class="pa-12 mt-12 text-center"
      border
    >
      <v-avatar color="primary" variant="tonal" class="mb-6" :size="80">
        <Icon name="shield-keyhole" size="38px" />
      </v-avatar>
      <h2 class="text-black text-body-1 font-weight-bold">
        {{ $t('text.activateLicense') }}
      </h2>
      <p class="text-body-2 text-medium-emphasis mt-1">
        {{ $t('activateLicense.line1') }}
        <nuxt-link class="text-medium-emphasis" to="/">
          {{ $t('label.portal') }}
        </nuxt-link>
        {{ $t('activateLicense.line2') }}
      </p>
      <div class="mt-6">
        <v-radio-group
          v-model="environment"
          :rules="[validationRules.required]"
          color="black"
          :max-width="262"
          class="mx-auto"
          inline
        >
          <v-radio
            :label="$t('label.development')"
            value="development"
            class="me-2"
          />
          <v-radio :label="$t('label.production')" value="production" />
        </v-radio-group>
      </div>
      <v-btn
        color="primary"
        rounded="pill"
        variant="flat"
        size="large"
        class="mt-2 text-body-1"
      >
        {{ $t('text.connectPortal') }}
      </v-btn>
    </v-card>
    <p class="text-black text-center text-body-2 mt-6">
      {{ $t('text.havingTrouble') }}
      <nuxt-link class="text-black" to="/">
        {{ $t('label.checkDocumentations') }}
      </nuxt-link>
    </p>
  </v-sheet>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
})

const { t } = useI18n()
const { appName } = useAppConfig()

useHead({
  title: t('page.updateLicense.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const environment = ref('development')
const validationRules = reactive({
  required: (v: string) => !!v || t('validationMessage.required'),
})
</script>
