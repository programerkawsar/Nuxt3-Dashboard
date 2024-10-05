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
    <div v-if="errMessage" class="mb-12">
      <Alert type="error" :message="errMessage" />
    </div>
    <v-form ref="form" :disabled="loading" @submit.prevent="submit">
      <v-row no-gutters>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.siteName') }}
          </p>
          <v-text-field
            v-model="siteName"
            :rules="[validationRules.required, validationRules.max]"
            base-color="black"
            color="black"
            :label="$t('siteName.placeholder')"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.siteUrl') }}
          </p>
          <v-text-field
            v-model="siteUrl"
            :rules="[validationRules.required, validationRules.url]"
            base-color="black"
            color="black"
            :label="$t('url.placeholder')"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.siteEmail') }}
          </p>
          <v-text-field
            v-model="email"
            :rules="[validationRules.required, validationRules.email]"
            base-color="black"
            color="black"
            :label="$t('email.placeholder')"
            rounded="pill"
            variant="outlined"
            single-line
          />
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
        <v-col cols="12">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.defaultCountry') }}
          </p>
          <v-select
            v-model="defaultCountry"
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
            {{ $t('label.createUser') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-sheet>
</template>

<script lang="ts" setup>
import { VForm } from 'vuetify/components'
const countryList = await import('~/assets/json/countries.json')
const currencyList = await import('~/assets/json/currencies.json')

definePageMeta({
  layout: 'admin',
})

const { t } = useI18n()
const { appName } = useAppConfig()

useHead({
  title: t('page.globalSettings.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const form = ref(VForm)
const loading = ref<boolean>(false)
const siteName = ref<string>('')
const siteUrl = ref<string>('')
const defaultCurrency = ref<string>('USD')
const defaultCountry = ref<string>('US')
const email = ref<string>('')
const errMessage = ref<string | null>(null)

const countries = computed<{ country: string; abbreviation: string }[]>(() => {
  return countryList.default
})

const currencies = computed<
  { countryName: string; currencyName: string; currencySymbol: string }[]
>(() => {
  return currencyList.default
})

const validationRules = reactive({
  required: (v: string) => !!v || t('validationMessage.required'),
  email: (v: string) => /.+@.+\..+/.test(v) || t('validationMessage.email'),
  max: (v: string) =>
    v.length <= 28 || t('validationMessage.maxCharacters', { num: 28 }),
  url: (v: string) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)' + // optional protocol
        '(www\\.)?' + // optional www.
        '[a-zA-Z0-9-]+(\\.[a-zA-Z]{2,})+$', // domain name and TLD
      'i' // case insensitive
    )

    return urlPattern.test(v) || t('validationMessage.url')
  },
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
