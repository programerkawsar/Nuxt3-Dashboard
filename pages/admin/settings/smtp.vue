<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <AdminTestSmtp />
    <div class="pa-12" />
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.smtpSettings.mainForm.section.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.smtpSettings.mainForm.section.subtitle') }}
      </p>
    </div>
    <div v-if="errMessage" class="mb-12">
      <Alert type="error" :message="errMessage" />
    </div>
    <v-form ref="form" :disabled="loading" @submit.prevent="submit">
      <v-row no-gutters>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.smtpHost') }}
          </p>
          <v-text-field
            v-model="smtpHost"
            :rules="[validationRules.required, validationRules.url]"
            base-color="black"
            color="black"
            :label="$t('smtpHost.placeholder')"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.smtpPort') }}
          </p>
          <v-text-field
            v-model="smtpPort"
            :rules="[validationRules.required, validationRules.positiveNumber]"
            type="number"
            base-color="black"
            color="black"
            :label="$t('smtpPort.placeholder')"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.smtpUsername') }}
          </p>
          <v-text-field
            v-model="smtpUsername"
            :rules="[validationRules.required]"
            base-color="black"
            color="black"
            :label="$t('smtpUsername.placeholder')"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.smtpPassword') }}
          </p>
          <v-text-field
            v-model="smtpPassword"
            :rules="[validationRules.required]"
            :type="smtpPasswordShow ? 'text' : 'password'"
            base-color="black"
            color="black"
            label="**********************"
            rounded="pill"
            variant="outlined"
            single-line
          >
            <template #append-inner>
              <v-btn
                color="black"
                variant="text"
                :size="35"
                rounded
                @click="smtpPasswordShow = !smtpPasswordShow"
              >
                <Icon :name="smtpPasswordShow ? 'eye' : 'eye-slash'" />
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.smtpSenderEmail') }}
          </p>
          <v-text-field
            v-model="smtpSenderEmail"
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
            {{ $t('label.smtpSenderName') }}
          </p>
          <v-text-field
            v-model="smtpSenderName"
            :rules="[validationRules.required, validationRules.max]"
            base-color="black"
            color="black"
            :label="$t('firstName.placeholder')"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.smtpEncryption') }}
          </p>
          <v-select
            v-model="smtpEncryption"
            :rules="[validationRules.required]"
            :items="['TLS', 'SSL']"
            :label="$t('select.placeholder')"
            base-color="black"
            color="black"
            rounded="pill"
            variant="outlined"
            item-title="text"
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

definePageMeta({
  layout: 'admin',
})

const { t } = useI18n()
const { appName } = useAppConfig()

useHead({
  title: t('page.smtpSettings.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const form = ref(VForm)
const smtpPasswordShow = ref<boolean>(false)
const loading = ref<boolean>(false)
const smtpHost = ref<string>('')
const smtpPort = ref<string>('')
const smtpUsername = ref<string>('')
const smtpPassword = ref<string>('')
const smtpSenderEmail = ref<string>('')
const smtpSenderName = ref<string>('')
const smtpEncryption = ref<string>('TLS')
const errMessage = ref<string | null>(null)

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
  email: (v: string) => /.+@.+\..+/.test(v) || t('validationMessage.email'),
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
