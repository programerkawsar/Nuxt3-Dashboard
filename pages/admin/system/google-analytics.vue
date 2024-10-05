<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.googleAnalytics.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.googleAnalytics.subtitle') }}
      </p>
    </div>
    <div v-if="errMessage" class="mb-12">
      <Alert type="error" :message="errMessage" />
    </div>
    <v-form ref="form" :disabled="loading" @submit.prevent="submit">
      <v-row no-gutters>
        <v-col cols="12" class="mb-3">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.clientEmail') }}
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
        <v-col cols="12" class="mb-3">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.privateKey') }}
          </p>
          <v-text-field
            v-model="privateKey"
            :rules="[validationRules.required]"
            :type="privateKeyShow ? 'text' : 'password'"
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
                @click="privateKeyShow = !privateKeyShow"
              >
                <Icon :name="privateKeyShow ? 'eye' : 'eye-slash'" />
              </v-btn>
            </template>
          </v-text-field>
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
  title: t('page.googleAnalytics.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const form = ref(VForm)
const loading = ref<boolean>(false)
const privateKeyShow = ref<boolean>(false)
const email = ref<string>('')
const privateKey = ref<string>('')
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
