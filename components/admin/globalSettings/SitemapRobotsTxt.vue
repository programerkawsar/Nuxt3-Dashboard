<template>
  <div class="mb-12 text-black">
    <h3 class="text-body-1 mb-1 font-weight-bold">
      {{ $t('page.globalSettings.section.sitemapRobotsTxt.title') }}
    </h3>
    <p class="text-body-2 text-medium-emphasis">
      {{ $t('page.globalSettings.section.sitemapRobotsTxt.subtitle') }}
    </p>
  </div>
  <div v-if="errMessage" class="mb-12">
    <Alert type="error" :message="errMessage" />
  </div>
  <v-form ref="form" :disabled="loading" @submit.prevent="submit">
    <v-row no-gutters>
      <v-col cols="12" class="mb-1">
        <p class="text-black text-body-2 mb-1 ms-4">
          {{ $t('label.xmlSitemap') }}
        </p>
        <v-file-input
          v-model="xmlSitemap"
          color="black"
          base-color="black"
          :label="$t('fileInput.placeholder')"
          :rules="[validationRules.required, validationRules.isXml]"
          rounded="xl"
          variant="outlined"
          class="icon-opacity-0"
          prepend-icon=""
          single-line
        >
          <template #prepend-inner>
            <Icon name="file-send" class="me-1" />
          </template>
        </v-file-input>
      </v-col>
      <v-col cols="12" class="mb-1">
        <p class="text-black text-body-2 mb-1 ms-4">
          {{ $t('label.robotsTxt') }}
        </p>
        <v-file-input
          v-model="robotsTxt"
          color="black"
          base-color="black"
          :label="$t('fileInput.placeholder')"
          :rules="[validationRules.required, validationRules.isTxt]"
          rounded="xl"
          variant="outlined"
          class="icon-opacity-0"
          prepend-icon=""
          single-line
        >
          <template #prepend-inner>
            <Icon name="file-send" class="me-1" />
          </template>
        </v-file-input>
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
</template>

<script lang="ts" setup>
import { VForm } from 'vuetify/components'

const { t } = useI18n()
const form = ref(VForm)
const loading = ref<boolean>(false)
const xmlSitemap = ref<File[] | null>(null)
const robotsTxt = ref<File[] | null>(null)
const errMessage = ref<string | null>(null)

const validationRules = reactive({
  required: (v: string) => !!v || t('validationMessage.required'),
  isXml: (v: File[]) =>
    !!v[0].name.toLowerCase().endsWith('.xml') ||
    t('validationMessage.invalidFileFormat', { format: 'XML' }),
  isTxt: (v: File[]) =>
    !!v[0].name.toLowerCase().endsWith('.txt') ||
    t('validationMessage.invalidFileFormat', { format: 'TXT' }),
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
