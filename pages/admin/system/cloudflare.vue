<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.cloudflare.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.cloudflare.subtitle') }}
      </p>
    </div>
    <div v-if="errMessage" class="mb-12">
      <Alert type="error" :message="errMessage" />
    </div>
    <v-form ref="form" :disabled="loading" @submit.prevent="submit">
      <v-row no-gutters>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.accessKeyId') }}
          </p>
          <v-text-field
            v-model="accessKeyId"
            :rules="[validationRules.required]"
            base-color="black"
            color="black"
            :label="$t('number.placeholder')"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.secretAccessKey') }}
          </p>
          <v-text-field
            v-model="secretAccessKey"
            :rules="[validationRules.required]"
            :type="secretAccessKeyShow ? 'text' : 'password'"
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
                @click="secretAccessKeyShow = !secretAccessKeyShow"
              >
                <Icon :name="secretAccessKeyShow ? 'eye' : 'eye-slash'" />
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.defaultRegion') }}
          </p>
          <v-text-field
            v-model="defaultRegion"
            :rules="[validationRules.required]"
            base-color="black"
            color="black"
            label="e.g. us-east-1"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.bucket') }}
          </p>
          <v-text-field
            v-model="bucket"
            :rules="[validationRules.required]"
            type="number"
            base-color="black"
            color="black"
            :label="$t('number.placeholder')"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.endpoint') }}
          </p>
          <v-text-field
            v-model="endpoint"
            :rules="[validationRules.required, validationRules.url]"
            base-color="black"
            color="black"
            :label="$t('url.placeholder')"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12" class="mb-3">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.domainUrl') }}
          </p>
          <v-text-field
            v-model="domainUrl"
            :rules="[validationRules.required, validationRules.url]"
            base-color="black"
            color="black"
            :label="$t('url.placeholder')"
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
  title: t('page.cloudflare.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const form = ref(VForm)
const loading = ref<boolean>(false)
const secretAccessKeyShow = ref<boolean>(false)
const accessKeyId = ref<string>('')
const secretAccessKey = ref<string>('')
const defaultRegion = ref<string>('')
const bucket = ref<string>('')
const endpoint = ref<string>('')
const domainUrl = ref<string>('')
const errMessage = ref<string | null>(null)

const validationRules = reactive({
  required: (v: string) => !!v || t('validationMessage.required'),
  url: (v: string) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // optional protocol
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
  }
}
</script>
