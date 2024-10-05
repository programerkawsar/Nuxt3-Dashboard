<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <AdminUploadLanguageFile />
    <div class="pa-12" />
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.addLanguage.writeTranslations.section.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.addLanguage.writeTranslations.section.subtitle') }}
      </p>
    </div>
    <div v-if="errMessage" class="mb-12">
      <Alert type="error" :message="errMessage" />
    </div>
    <div class="mb-12">
      <v-text-field
        v-model="search"
        color="black"
        base-color="black"
        rounded="pill"
        :label="$t('label.searchStrings')"
        variant="outlined"
        single-line
        hide-details
      >
        <template #prepend-inner>
          <Icon name="search" />
        </template>
      </v-text-field>
    </div>
    <v-form
      ref="form"
      class="position-relative"
      :disabled="loading"
      @submit.prevent="submit"
    >
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12" md="6">
              <p class="text-uppercase text-body-2 text-medium-emphasis">
                {{ $t('label.string') }}
              </p>
            </v-col>
            <v-col cols="12" md="6">
              <p class="text-uppercase text-body-2 text-medium-emphasis">
                {{ $t('label.translation') }}
              </p>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-divider />
        </v-col>
        <v-col v-for="(item, idx) in items" :key="idx" cols="12">
          <v-row>
            <v-col cols="12" md="6">
              <p class="text-body-2 text-black">
                {{ item.value }}
              </p>
            </v-col>
            <v-col cols="12" md="6">
              <v-textarea
                color="black"
                base-color="black"
                rounded="xl"
                rows="1"
                row-height="15"
                max-rows="10"
                variant="outlined"
                :label="`${$t('writeString.placeholder')}...`"
                single-line
                hide-details
                auto-grow
                @input="handleInput(item.key, $event)"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="ma-3" />
      <v-sheet
        color="white"
        :class="`save-btn--section pt-6 ${
          !showSaveBtn
            ? 'save-btn-section--show pb-12'
            : 'save-btn-section--hide'
        }`"
      >
        <v-btn
          type="submit"
          color="primary"
          variant="flat"
          rounded="pill"
          size="x-large"
          class="text-body-1"
          :loading="loading"
          block
        >
          {{ $t('label.addLanguage') }}
        </v-btn>
      </v-sheet>
    </v-form>
  </v-sheet>
</template>

<script lang="ts" setup>
import { VForm } from 'vuetify/components'

definePageMeta({
  layout: 'admin',
})

const { t } = useI18n()
const { appName } = useAppConfig()

useHead({
  title: t('page.addLanguage.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const storedItems = computed<{ key: string; value: string }[]>(() => [
  {
    key: 'page.addBlockedCountry.subtitle',
    value:
      'Add disabled country to the list to prevent unauthorized access & ensure the security of the network from potential threats.',
  },
  {
    key: 'page.updateBlockedCountry.title',
    value: 'Update Blocked Country',
  },
  {
    key: 'page.updateBlockedCountry.subtitle',
    value:
      'Update disabled country to the list to prevent unauthorized access & ensure the security of the network from potential threats.',
  },
  {
    key: 'label.updateCountry',
    value: 'Update Country',
  },
  {
    key: 'page.globalSettings.title',
    value: 'Global Settings',
  },
  {
    key: 'page.globalSettings.subtitle',
    value:
      'Configuration options for managing and customizing global settings across the entire system to ensure optimal performance & functionality.',
  },
  {
    key: 'siteName.placeholder',
    value: 'e.g. Example App',
  },
  {
    key: 'label.default',
    value: 'Default',
  },
  {
    key: 'page.addLanguage.head.title',
    value: 'Add Language',
  },
  {
    key: 'page.addLanguage.subtitle',
    value:
      'Add a new language to the system by configuring the necessary details and preferences for seamless integration.',
  },
  {
    key: 'page.accountSettings.email.section.subtitle',
    value:
      'Updating your email address is quick and easy. Simply enter your new email address, and the server will send you a verification email.',
  },
  {
    key: 'page.updateBlockedIp.head.title',
    value: 'Update Blocked IP',
  },
  {
    key: 'page.updateBlockedIp.subtitle',
    value:
      'Update disabled ip addresses to the list to prevent unauthorized access & ensure the security of the network from potential threats.',
  },
  {
    key: 'page.countryRestriction.title',
    value: 'Allowed Countries',
  },
  {
    key: 'page.countryRestriction.subtitle',
    value: 'Authorized List of Permitted to Access',
  },
  {
    key: 'page.accountSettings.email.section.subtitle',
    value:
      'Updating your email address is quick and easy. Simply enter your new email address, and the server will send you a verification email.',
  },
])

const items = ref<{ key: string; value: string }[]>(storedItems.value || [])
const form = ref(VForm)
const showSaveBtn = ref<boolean>(false)
const lastScrollPosition = ref<number>(0)
const loading = ref<boolean>(false)
const search = ref<string>('')
const formData = ref<{ [key: string]: string }>({})
const errMessage = ref<string | null>(null)

onMounted(() => {
  window.addEventListener('scroll', scrollFunction)
})

watch(search, (value: string) => {
  items.value = searchData(value)
})

const searchData = (searchTerm: string) =>
  storedItems.value.filter((item: { key: string; value: string }) =>
    item.value.toLowerCase().includes(searchTerm.toLowerCase())
  )

const handleInput = (key: string, e: Event) => {
  if (e instanceof InputEvent) {
    const inputValue = (e.target as HTMLInputElement).value
    formData.value[key] = inputValue
  }
}

const scrollFunction = () => {
  const scrollTop = window.scrollY || 0

  if (scrollTop > lastScrollPosition.value && scrollTop > 700) {
    showSaveBtn.value = true
  } else {
    showSaveBtn.value = false
  }

  lastScrollPosition.value = scrollTop
}

const submit = async () => {
  try {
    loading.value = true
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

<style lang="sass" scoped>
.upload-box
  border: 2px dashed #000

.save-btn--section
  position: sticky
  bottom: 0

.save-btn-section--show
  animation: slideUp 0.5s forwards

.save-btn-section--hide
  animation: slideDown 0.5s forwards

@keyframes slideUp
  from
    transform: translateY(0)

  to
    transform: translateY(100%)

@keyframes slideDown
  from
    transform: translateY(100%)

  to
    transform: translateY(0)
</style>
