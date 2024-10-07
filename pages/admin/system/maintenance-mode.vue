<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.maintenanceMode.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.maintenanceMode.subtitle') }}
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
            v-model="title"
            :rules="[validationRules.required]"
            base-color="black"
            color="black"
            :label="$t('maintenanceMode.title.placeholder')"
            rounded="pill"
            variant="outlined"
            single-line
          />
        </v-col>
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.content') }}
          </p>
          <v-textarea
            v-model="content"
            :rules="[validationRules.required]"
            base-color="black"
            color="black"
            :label="$t('description.placeholder')"
            rounded="xl"
            variant="outlined"
            :hint="$t('gdprContentInput.hint')"
            single-line
          />
        </v-col>
        <v-col cols="12">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.status') }}
          </p>
          <v-select
            v-model="status"
            :rules="[validationRules.required]"
            :items="statusList"
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
  title: t('page.maintenanceMode.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const form = ref(VForm)
const loading = ref<boolean>(false)
const title = ref<string>('')
const content = ref<string>('')
const status = ref<string>('active')
const errMessage = ref<string | null>(null)

const statusList = ref<{ text: string; value: string }[]>([
  {
    text: t('label.active'),
    value: 'active',
  },
  {
    text: t('label.inactive'),
    value: 'inactive',
  },
])

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
