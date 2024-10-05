<template>
  <div class="mb-12 text-black">
    <h3 class="text-body-1 mb-1 font-weight-bold">
      {{ $t('page.accountSettings.personalInfo.section.title') }}
    </h3>
    <p class="text-body-2 text-medium-emphasis">
      {{ $t('page.accountSettings.personalInfo.section.subtitle') }}
    </p>
  </div>
  <div v-if="errMessage" class="mb-12">
    <Alert type="error" :message="errMessage" />
  </div>
  <v-form ref="form" :disabled="loading" @submit.prevent="submit">
    <v-row no-gutters>
      <v-col cols="12" class="mb-1">
        <p class="text-black text-body-2 mb-1 ms-4">
          {{ $t('label.firstName') }}
        </p>
        <v-text-field
          v-model="firstName"
          :rules="[validationRules.required, validationRules.max]"
          base-color="black"
          color="black"
          :label="$t('firstName.placeholder')"
          rounded="pill"
          variant="outlined"
          single-line
        />
      </v-col>
      <v-col cols="12" class="mb-1">
        <p class="text-black text-body-2 mb-1 ms-4">
          {{ $t('label.lastName') }}
        </p>
        <v-text-field
          v-model="lastName"
          :rules="[validationRules.required, validationRules.max]"
          base-color="black"
          color="black"
          :label="$t('lastName.placeholder')"
          rounded="pill"
          variant="outlined"
          single-line
        />
      </v-col>
      <v-col cols="12" class="mb-3">
        <p class="text-black text-body-2 mb-1 ms-4">
          {{ $t('label.yourCountry') }}
        </p>
        <v-select
          v-model="country"
          :rules="[validationRules.required]"
          :items="countries"
          :label="$t('select.placeholder')"
          base-color="black"
          color="black"
          rounded="pill"
          variant="outlined"
          item-title="country"
          item-value="abbreviation"
          class="expand-icon--black"
          single-line
        >
          <template #item="{ item, props }">
            <v-list-item
              v-bind="props"
              :item-props="props"
              base-color="black"
              color="primary"
              rounded="xl"
              class="mx-2"
              link
            >
              <template #prepend>
                <v-avatar color="transparent">
                  <Icon :name="`circle-flags:${item.value.toLowerCase()}`" />
                </v-avatar>
              </template>
            </v-list-item>
          </template>
        </v-select>
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
</template>

<script lang="ts" setup>
import { VForm } from 'vuetify/components'
const countryList = await import('~/assets/json/countries.json')

const { t } = useI18n()
const form = ref(VForm)
const loading = ref<boolean>(false)
const firstName = ref<string>('')
const lastName = ref<string>('')
const country = ref<string>('US')
const errMessage = ref<string | null>(null)

const countries = computed<{ country: string; abbreviation: string }[]>(() => {
  return countryList.default
})

const validationRules = reactive({
  required: (v: string) => !!v || t('validationMessage.required'),
  max: (v: string) =>
    v.length <= 28 || t('validationMessage.maxCharacters', { num: 28 }),
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
