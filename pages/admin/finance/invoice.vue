<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.invoiceSettings.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.invoiceSettings.subtitle') }}
      </p>
    </div>
    <div v-if="errMessage" class="mb-12">
      <Alert type="error" :message="errMessage" />
    </div>
    <v-form ref="form" :disabled="loading" @submit.prevent="submit">
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="6" class="mb-1 pe-3">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.invoiceCurrency') }}
          </p>
          <v-select
            v-model="invoiceCurrency"
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
        <v-col cols="12" sm="12" md="6" class="mb-1 ps-3">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.invoiceLanguage') }}
          </p>
          <v-select
            v-model="invoiceLanguage"
            :rules="[validationRules.required]"
            :items="languages"
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
            <template #item="{ props, item }">
              <v-list-item
                v-bind="props"
                :item-props="props"
                base-color="black"
                color="primary"
                rounded="xl"
                class="mx-2 py-3"
                link
              >
                <template #prepend>
                  <v-avatar color="transparent" class="me-n2">
                    <Icon
                      :name="`circle-flags:${getCountryCode(item.value)}`"
                    />
                  </v-avatar>
                </template>
                <v-list-item-subtitle>
                  {{ item.raw.country }}
                </v-list-item-subtitle>
              </v-list-item>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.companyName') }}
          </p>
          <v-text-field
            v-model="companyName"
            :rules="[validationRules.required, validationRules.max]"
            base-color="black"
            color="black"
            :label="$t('companyName.placeholder')"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.companyWebsite') }}
          </p>
          <v-text-field
            v-model="companyWebsite"
            :rules="[validationRules.required, validationRules.url]"
            base-color="black"
            color="black"
            label="e.g. https://www.example.com/"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.businessAddress') }}
          </p>
          <v-textarea
            v-model="businessAddress"
            :rules="[validationRules.required]"
            base-color="black"
            color="black"
            :label="$t('businessAddress.placeholder')"
            rounded="xl"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12" sm="12" md="6" class="mb-1 pe-3">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.phoneNumber') }}
          </p>
          <v-text-field
            v-model="phoneNumber"
            :rules="[validationRules.required]"
            type="number"
            base-color="black"
            color="black"
            :label="$t('phoneNumber.placeholder')"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12" sm="12" md="6" class="mb-1 ps-3">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.vatNumber') }}
          </p>
          <v-text-field
            v-model="vatNumber"
            :rules="[validationRules.required]"
            base-color="black"
            color="black"
            :label="$t('vatNumber.placeholder')"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.city') }}
          </p>
          <v-text-field
            v-model="city"
            :rules="[validationRules.required]"
            base-color="black"
            color="black"
            :label="$t('city.placeholder')"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12" sm="12" md="6" class="mb-1 pe-3">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.state') }}
          </p>
          <v-text-field
            v-model="state"
            :rules="[validationRules.required]"
            base-color="black"
            color="black"
            :label="$t('state.placeholder')"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12" sm="12" md="6" class="mb-1 ps-3">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.postalCode') }}
          </p>
          <v-text-field
            v-model="postalCode"
            :rules="[validationRules.required, validationRules.positiveNumber]"
            type="number"
            base-color="black"
            color="black"
            :label="$t('postalCode.placeholder')"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.country') }}
          </p>
          <v-select
            v-model="country"
            :rules="[validationRules.required]"
            :items="countries"
            :label="$t('select.placeholder')"
            base-color="black"
            color="black"
            rounded="pill"
            variant="outlined"
            item-title="country"
            item-value="abbreviation"
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
                link
              >
                <template #prepend>
                  <v-avatar color="transparent">
                    <Icon :name="`circle-flags:${item.value.toLowerCase()}`" />
                  </v-avatar>
                </template>
              </v-list-item>
            </template>
          </v-select>
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
const countryList = await import('~/assets/json/countries.json')

interface Locale {
  code: string
  name: string
  country: string
  iso: string
  default: boolean
  active: boolean
}

definePageMeta({
  layout: 'admin',
})

const { t } = useI18n()
const { appName } = useAppConfig()

useHead({
  title: t('page.invoiceSettings.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const { locales } = useAppConfig()
const form = ref(VForm)
const loading = ref<boolean>(false)
const invoiceCurrency = ref<string>('USD')
const invoiceLanguage = ref<string>('en-US')
const companyName = ref<string>('')
const companyWebsite = ref<string>('')
const businessAddress = ref<string>('')
const phoneNumber = ref<string>('')
const vatNumber = ref<string>('')
const city = ref<string>('')
const state = ref<string>('')
const postalCode = ref<string>('')
const country = ref<string>('US')
const errMessage = ref<string | null>(null)

const currencies = computed<
  { countryName: string; currencyName: string; currencySymbol: string }[]
>(() => {
  return currencyList.default
})

const languages = computed<Locale[]>(() => Object.values(locales) as Locale[])
const countries = computed<{ country: string; abbreviation: string }[]>(() => {
  return countryList.default
})

const validationRules = reactive({
  required: (v: string) => !!v || t('validationMessage.required'),
  max: (v: string) =>
    v.length <= 28 || t('validationMessage.maxCharacters', { num: 28 }),
  url: (v: string) => {
    const urlPattern = new RegExp(
      '^' +
        // Allow optional protocol (http, https, smtp, etc.)
        '(https?:\\/\\/)?' +
        // Optional 'www.' or subdomain like 'smtp.'
        '([a-zA-Z0-9-]+\\.)*' +
        // Main domain and top-level domain (TLD)
        '[a-zA-Z0-9-]+(\\.[a-zA-Z]{2,})+$',
      'i' // case-insensitive
    )

    return urlPattern.test(v) || t('validationMessage.url')
  },
  positiveNumber: (v: string) => {
    const numberPattern = /^[0-9]+$/ // Regular expression to check for positive numbers only
    return numberPattern.test(v) || t('validationMessage.positiveNumber')
  },
})

const getCountryCode = (iso: string): string => {
  const [_, countryCode] = iso.split('-')
  return countryCode ? countryCode.toLowerCase() : 'us'
}

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
