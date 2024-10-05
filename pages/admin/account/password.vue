<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.passwordSetting.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.passwordSetting.subtitle') }}
      </p>
    </div>
    <div v-if="errMessage" class="mb-12">
      <Alert type="error" :message="errMessage" />
    </div>
    <v-form ref="form" :disabled="loading" @submit.prevent="submit">
      <v-row no-gutters>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.currentPassword') }}
          </p>
          <v-text-field
            v-model="currentPassword"
            :rules="[validationRules.required]"
            :type="currentPasswordShow ? 'text' : 'password'"
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
                @click="currentPasswordShow = !currentPasswordShow"
              >
                <Icon :name="currentPasswordShow ? 'eye' : 'eye-slash'" />
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.newPassword') }}
          </p>
          <v-text-field
            v-model="newPassword"
            :rules="[validationRules.required, validationRules.min]"
            :type="newPasswordShow ? 'text' : 'password'"
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
                v-tooltip:bottom="$t('label.generate')"
                rounded
                @click="newPassword = generateRandomPassword()"
              >
                <Icon name="refresh" />
              </v-btn>
              <v-btn
                color="black"
                variant="text"
                :size="35"
                rounded
                @click="newPasswordShow = !newPasswordShow"
              >
                <Icon :name="newPasswordShow ? 'eye' : 'eye-slash'" />
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" class="mb-3">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.confirmPassword') }}
          </p>
          <v-text-field
            v-model="confirmPassword"
            :rules="[validationRules.required, validationRules.matches]"
            :type="confirmPasswordShow ? 'text' : 'password'"
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
                @click="confirmPasswordShow = !confirmPasswordShow"
              >
                <Icon :name="confirmPasswordShow ? 'eye' : 'eye-slash'" />
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
  title: t('page.passwordSetting.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const form = ref(VForm)
const loading = ref<boolean>(false)
const currentPasswordShow = ref<boolean>(false)
const newPasswordShow = ref<boolean>(false)
const confirmPasswordShow = ref<boolean>(false)
const currentPassword = ref<string>('')
const newPassword = ref<string>('')
const confirmPassword = ref<string>('')
const errMessage = ref<string | null>(null)

const validationRules = reactive({
  required: (v: string) => !!v || t('validationMessage.required'),
  min: (v: string) =>
    v.length >= 8 || t('validationMessage.minCharacters', { num: 8 }),
  matches: () =>
    !confirmPassword.value ||
    confirmPassword.value === newPassword.value ||
    t('validationMessage.matches'),
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
