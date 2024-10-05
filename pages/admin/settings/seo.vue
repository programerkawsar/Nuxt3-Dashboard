<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.seoSettings.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.seoSettings.subtitle') }}
      </p>
    </div>
    <div v-if="errMessage" class="mb-12">
      <Alert type="error" :message="errMessage" />
    </div>
    <v-form ref="form" :disabled="loading" @submit.prevent="submit">
      <v-row no-gutters>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.selectLanguage') }}
          </p>
          <v-select
            v-model="language"
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
            {{ $t('label.metaTitle') }}
          </p>
          <v-text-field
            v-model="metaTitle"
            :rules="[validationRules.required]"
            base-color="black"
            color="black"
            :label="$t('title.placeholder')"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.metaKeywords') }}
          </p>
          <v-combobox
            v-model="metaKeywords"
            :rules="[validationRules.required]"
            base-color="black"
            color="black"
            :label="$t('tags.placeholder')"
            rounded="xl"
            variant="outlined"
            single-line
            chips
            multiple
          />
        </v-col>
        <v-col cols="12">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.metaDescription') }}
          </p>
          <v-textarea
            v-model="metaDescription"
            :rules="[validationRules.required]"
            base-color="black"
            color="black"
            :label="$t('description.placeholder')"
            rounded="xl"
            variant="outlined"
            :hint="$t('gdprContentInput.hint')"
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
  title: t('page.seoSettings.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const { locales } = useAppConfig()
const form = ref(VForm)
const loading = ref<boolean>(false)
const language = ref<string>('en-US')
const metaTitle = ref<string>('')
const metaKeywords = ref<string[]>([])
const metaDescription = ref<string>('')
const errMessage = ref<string | null>(null)
const languages = computed<Locale[]>(() => Object.values(locales) as Locale[])

const validationRules = reactive({
  required: (v: string) => !!v || t('validationMessage.required'),
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
