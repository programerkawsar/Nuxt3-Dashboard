<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.gatewaySettings.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.gatewaySettings.subtitle') }}
      </p>
    </div>
    <div v-if="errMessage" class="mb-12">
      <Alert type="error" :message="errMessage" />
    </div>
    <v-card
      color="info"
      rounded="xl"
      variant="outlined"
      class="pa-6 mb-12 text-body-2"
    >
      <p class="d-flex align-center">
        <Icon name="info" size="20px" class="me-2" /> What happens when you
        save?
      </p>
      <ul class="ms-5 my-3">
        <li>Save your settings.</li>
        <li>Check all membership plans for this gateway.</li>
        <li>Remove all products and prices defined before for old settings.</li>
        <li>Cancel all old subscriptions. Acquired amounts do not reset.</li>
        <li>Generate new product definitions in your new gateway account.</li>
        <li>Generate new price definitions in your new gateway account.</li>
        <li>Remove all webhooks defined before and create new webhook.</li>
      </ul>
      <p class="mb-1">
        <b>Note:</b> that we do not store old keys. So every save action is new.
      </p>
      <p>
        This process will take time. So, please be patient and wait until
        success message appears.
      </p>
    </v-card>
    <v-form ref="form" :disabled="loading" @submit.prevent="submit">
      <v-row no-gutters>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.gatewayMode') }}
          </p>
          <v-select
            v-model="gatewayMode"
            :rules="[validationRules.required]"
            :items="['Sandbox', 'Live']"
            :label="$t('select.placeholder')"
            base-color="black"
            color="black"
            rounded="pill"
            variant="outlined"
            item-title="name"
            item-value="iso"
            class="expand-icon--black"
            single-line
          >
            <template #item="{ props }">
              <v-list-item
                v-bind="props"
                :item-props="props"
                base-color="black"
                color="primary"
                rounded="xl"
                class="mx-2"
                link
              />
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.defaultCurrency') }}
          </p>
          <v-select
            v-model="defaultCurrency"
            :rules="[validationRules.required]"
            :items="currencies"
            :label="$t('select.placeholder')"
            base-color="black"
            color="black"
            rounded="pill"
            variant="outlined"
            item-title="currencyName"
            item-value="currencyName"
            class="expand-icon--black"
            single-line
          >
            <template #item="{ item, props }">
              <v-list-item
                v-bind="props"
                :item-props="props"
                base-color="black"
                color="primary"
                rounded="xl"
                class="mx-2"
                title=""
                link
              >
                <v-list-item-title>
                  {{ item?.raw?.countryName }}
                  -
                  {{ item?.raw?.currencyName }}
                  ({{ item?.raw?.currencySymbol }})
                </v-list-item-title>
              </v-list-item>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.apiKey') }} / {{ $t('label.clientId') }}
          </p>
          <v-text-field
            v-model="apiKeyOrClientId"
            :rules="[validationRules.required]"
            type="password"
            base-color="black"
            color="black"
            label="***********************************************"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.apiSecret') }} / {{ $t('label.secretKey') }}
          </p>
          <v-text-field
            v-model="apiSecretOrSecretKey"
            :rules="[validationRules.required]"
            type="password"
            base-color="black"
            color="black"
            label="***********************************************"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12" class="mt-3">
          <v-btn
            type="submit"
            base-color="primary"
            color="primary"
            rounded="pill"
            size="x-large"
            variant="flat"
            class="text-body-1"
            :loading="loading"
            block
          >
            {{ $t('label.saveChanges') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-sheet>
</template>

<script lang="ts" setup>
import { VForm } from 'vuetify/components'
const currencyList = await import('~/assets/json/currencies.json')

definePageMeta({
  layout: 'admin',
})

const { t } = useI18n()
const { appName } = useAppConfig()

useHead({
  title: t('page.gatewaySettings.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const form = ref(VForm)
const loading = ref<boolean>(false)
const gatewayMode = ref<string>('Sandbox')
const defaultCurrency = ref<string>('USD')
const apiKeyOrClientId = ref<string>('')
const apiSecretOrSecretKey = ref<string>('')
const errMessage = ref<string | null>(null)

const currencies = computed<
  { countryName: string; currencyName: string; currencySymbol: string }[]
>(() => {
  return currencyList.default
})

const validationRules = reactive({
  required: (v: string) => !!v || t('validationMessage.required'),
})

const submit = async () => {
  try {
    const { valid } = await form.value.validate()

    if (valid) {
    }
  } finally {
    loading.value = false
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
}
</script>
