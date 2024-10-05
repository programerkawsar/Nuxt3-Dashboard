<template>
  <div class="mb-12 text-black">
    <h3 class="text-body-1 mb-1 font-weight-bold">
      {{ $t('page.addLanguage.uploadJson.section.title') }}
    </h3>
    <p class="text-body-2 text-medium-emphasis">
      {{ $t('page.addLanguage.uploadJson.section.subtitle') }}
    </p>
  </div>
  <div v-if="alert.message" class="mb-12">
    <Alert :type="alert.type" :message="alert.message" />
  </div>
  <v-form
    ref="form"
    class="position-relative"
    :disabled="loading"
    @submit.prevent="submit"
  >
    <v-row no-gutters>
      <v-col cols="12">
        <p class="text-black text-body-2 mb-1 ms-4">
          {{ $t('label.uploadFile') }} (JSON)
        </p>
        <v-file-input
          v-model="jsonFile"
          color="black"
          base-color="black"
          :label="$t('jsonFileInput.placeholder')"
          :rules="[validationRules.required, validationRules.isJson]"
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
          color="primary"
          variant="flat"
          rounded="pill"
          size="x-large"
          class="text-body-1"
          :loading="loading"
          block
        >
          {{ $t('label.uploadFile') }}
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
const jsonFile = ref<File | null>(null)
const alert = reactive<{
  type: 'error' | 'success'
  message: string | null
}>({
  type: 'error',
  message: null,
})

const validationRules = reactive({
  required: (v: File[]) => v.length > 0 || t('validationMessage.required'),
  isJson: (v: File[]) =>
    !!v[0].name.toLowerCase().endsWith('.json') ||
    t('validationMessage.invalidFileFormat', { format: 'JSON' }),
})

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
