<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.paymentGateways.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.paymentGateways.subtitle') }}
      </p>
    </div>
    <v-list lines="two" base-color="black" class="pa-0 ma-0 bg-transparent">
      <v-list-item class="px-0">
        <template #prepend>
          <v-avatar color="primary" :size="50">
            <Icon name="tabler:brand-paypal-filled" size="28px" />
          </v-avatar>
        </template>
        <v-list-item-title>PayPal</v-list-item-title>
        <v-list-item-subtitle>January 1, 2024</v-list-item-subtitle>
        <template #append>
          <v-switch color="primary" class="me-2" hide-details />
          <v-btn
            color="black"
            size="small"
            variant="text"
            to="/admin/finance/gateways/paypal"
            icon
          >
            <Icon name="solar:settings-outline" />
          </v-btn>
        </template>
      </v-list-item>
      <v-list-item class="px-0">
        <template #prepend>
          <v-avatar color="primary" :size="50">
            <Icon name="tabler:brand-stripe" size="28px" />
          </v-avatar>
        </template>
        <v-list-item-title>Stripe</v-list-item-title>
        <v-list-item-subtitle>February 8, 2024</v-list-item-subtitle>
        <template #append>
          <v-switch color="primary" class="me-2" hide-details />
          <v-btn
            color="black"
            size="small"
            variant="text"
            to="/admin/finance/gateways/stripe"
            icon
          >
            <Icon name="solar:settings-outline" />
          </v-btn>
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
  title: t('page.paymentGateways.head.title'),
  titleTemplate: `%s | ${appName}`,
})
</script>
