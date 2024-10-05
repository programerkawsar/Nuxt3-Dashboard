<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.externalCode.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.externalCode.subtitle') }}
      </p>
    </div>
    <div v-if="errMessage" class="mb-12">
      <Alert type="error" :message="errMessage" />
    </div>
    <v-form ref="form" :disabled="loading" @submit.prevent="submit">
      <v-row no-gutters>
        <v-col cols="12">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.codeBefore') + ' </head>' }}
          </p>
          <v-textarea
            v-model="beforeHeadCode"
            base-color="black"
            color="black"
            label="e.g. <style> </style>"
            rounded="xl"
            variant="outlined"
            :hint="$t('codeBeforeInput.hint')"
            single-line
            auto-grow
          />
        </v-col>
        <v-col cols="12">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.codeBefore') + ' </body>' }}
          </p>
          <v-textarea
            v-model="beforeBodyCode"
            base-color="black"
            color="black"
            label="e.g. <script> </script>"
            rounded="xl"
            variant="outlined"
            :hint="$t('codeBeforeInput.hint')"
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
  title: t('page.externalCode.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const form = ref(VForm)
const loading = ref<boolean>(false)
const beforeHeadCode = ref<string>('')
const beforeBodyCode = ref<string>('')
const errMessage = ref<string | null>(null)

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
