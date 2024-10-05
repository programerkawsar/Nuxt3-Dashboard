<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.updateEmailTemplate.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.updateEmailTemplate.subtitle') }}
      </p>
    </div>
    <div v-if="errMessage" class="mb-12">
      <Alert type="error" :message="errMessage" />
    </div>
    <v-form ref="form" :disabled="loading" @submit.prevent="submit">
      <v-row no-gutters>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.title') }}
          </p>
          <v-text-field
            v-model="emailTitle"
            :rules="[validationRules.required]"
            base-color="black"
            color="black"
            :label="$t('emailTitle.placeholder')"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.subject') }}
          </p>
          <v-text-field
            v-model="emailSubject"
            :rules="[validationRules.required]"
            base-color="black"
            color="black"
            :label="$t('emailSubject.placeholder')"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12">
          <p class="text-black text-body-2 mb-1 ms-4">
            HTML {{ $t('label.code') }}
          </p>
          <v-textarea
            v-model="htmlCode"
            :rules="[validationRules.required]"
            base-color="black"
            color="black"
            label="e.g. <html> </html>"
            rounded="xl"
            variant="outlined"
            :hint="$t('gdprContentInput.hint')"
            single-line
            auto-grow
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
            {{ $t('label.updateTemplate') }}
          </v-btn>
        </v-col>
      </v-row>
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
  title: t('page.updateEmailTemplate.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const form = ref(VForm)
const loading = ref<boolean>(false)
const emailTitle = ref<string>('')
const emailSubject = ref<string>('')
const htmlCode = ref<string>('')
const errMessage = ref<string | null>(null)

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
