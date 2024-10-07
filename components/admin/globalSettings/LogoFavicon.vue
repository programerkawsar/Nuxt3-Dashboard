<template>
  <div class="mb-12 text-black">
    <h3 class="text-body-1 mb-1 font-weight-bold">
      {{ $t('page.globalSettings.section.FaviconLogo.title') }}
    </h3>
    <p class="text-body-2 text-medium-emphasis">
      {{ $t('page.globalSettings.section.FaviconLogo.subtitle') }}
    </p>
  </div>
  <div class="mb-8">
    <Alert type="info" :message="$t('favIcon.alert.message')" />
  </div>
  <div v-if="errMessage" class="mb-8 mt-n2">
    <Alert type="error" :message="errMessage" />
  </div>
  <v-form ref="form" :disabled="loading" @submit.prevent="submit">
    <v-row no-gutters>
      <v-col cols="12" class="mb-1">
        <p class="text-black text-body-2 mb-1 ms-4">
          {{ $t('label.favIcon') }}
        </p>
        <v-file-input
          v-model="favIcon"
          color="black"
          base-color="black"
          :label="$t('fileInput.placeholder')"
          :rules="[validationRules.required, validationRules.isImage]"
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
          {{ $t('label.lightLogo') }}
        </p>
        <v-file-input
          v-model="lightLogo"
          color="black"
          base-color="black"
          :label="$t('fileInput.placeholder')"
          :rules="[validationRules.required, validationRules.isImage]"
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
      <v-col cols="12">
        <p class="text-black text-body-2 mb-1 ms-4">
          {{ $t('label.darkLogo') }}
        </p>
        <v-file-input
          v-model="darkLogo"
          color="black"
          base-color="black"
          :label="$t('fileInput.placeholder')"
          :rules="[validationRules.required, validationRules.isImage]"
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
const favIcon = ref<File[] | null>(null)
const lightLogo = ref<File[] | null>(null)
const darkLogo = ref<File[] | null>(null)
const errMessage = ref<string | null>(null)

const validationRules = reactive({
  required: (v: string) => !!v || t('validationMessage.required'),
  isImage: (v: File[]) => {
    const isValidMimeType = v[0].type.startsWith('image/')
    return (
      isValidMimeType ||
      t('validationMessage.invalidFileFormat', { format: 'image' })
    )
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
