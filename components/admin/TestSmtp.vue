<template>
  <div class="mb-12 text-black">
    <h3 class="text-body-1 mb-1 font-weight-bold">
      {{ $t('page.smtpSettings.testSmtp.section.title') }}
    </h3>
    <p class="text-body-2 text-medium-emphasis">
      {{ $t('page.smtpSettings.testSmtp.section.subtitle') }}
    </p>
  </div>
  <div v-if="errMessage" class="mb-12">
    <Alert type="error" :message="errMessage" />
  </div>
  <v-form ref="form" :disabled="loading" @submit.prevent="submit">
    <v-row no-gutters>
      <v-col cols="12" class="mb-3">
        <p class="text-black text-body-2 mb-1 ms-4">
          {{ $t('label.emailAddress') }}
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
      <v-col cols="12">
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
          {{ $t('label.testSmtp') }}
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
const email = ref<string>('')
const errMessage = ref<string | null>(null)

const validationRules = reactive({
  required: (v: string) => !!v || t('validationMessage.required'),
  email: (v: string) => /.+@.+\..+/.test(v) || t('validationMessage.email'),
})

const submit = async () => {
  try {
    const { valid } = await form.value.validate()

    if (valid) {
    }
  } finally {
    loading.value = false
  }
}
</script>
