<template>
  <v-sheet
    color="white"
    height="100vh"
    class="d-flex align-center justify-center pa-6 pa-sm-12"
  >
    <v-card
      :max-width="460"
      color="white"
      rounded="xl"
      class="pa-6 pb-7 pa-sm-12"
      border
      flat
    >
      <div class="mb-12 text-black text-center">
        <h1 class="text-h6 font-weight-bold mb-1">
          {{ $t('page.adminLogin.title') }}
        </h1>
        <p class="text-body-2 text-medium-emphasis">
          {{ $t('page.adminLogin.subtitle') }}
        </p>
      </div>
      <div v-if="errMessage" class="mb-12">
        <Alert type="error" :message="errMessage" />
      </div>
      <v-form ref="form" :disabled="loading" @submit.prevent="submit">
        <v-row no-gutters>
          <v-col cols="12" class="mb-1">
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
            <p class="text-black text-body-2 mb-1 ms-4">
              {{ $t('label.password') }}
            </p>
            <v-text-field
              v-model="password"
              :rules="[validationRules.required]"
              :type="passwordShow ? 'text' : 'password'"
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
                  @click="passwordShow = !passwordShow"
                >
                  <Icon :name="passwordShow ? 'eye' : 'eye-slash'" />
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" class="mt-n2 ps-1">
            <v-checkbox color="black" class="icon-opacity-0" hide-details>
              <template #label>
                <p class="text-black text-body-2">
                  {{ $t('label.rememberMe') }}
                </p>
              </template>
            </v-checkbox>
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
              {{ $t('label.submit') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <p class="text-body-2 text-black ms-4 mt-3 text-center">
        {{ $t('text.forgotPassword') }}
        <nuxt-link to="/admin/reset-password">
          {{ $t('label.resetNow') }}
        </nuxt-link>
      </p>
    </v-card>
  </v-sheet>
</template>

<script lang="ts" setup>
import { VForm } from 'vuetify/components'

definePageMeta({
  layout: false,
})

const { t } = useI18n()
const { appName } = useAppConfig()

useHead({
  title: t('page.adminLogin.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const form = ref(VForm)
const loading = ref<boolean>(false)
const passwordShow = ref<boolean>(false)
const email = ref<string>('')
const password = ref<string>('')
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
