<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.addUser.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.addUser.subtitle') }}
      </p>
    </div>
    <div v-if="errMessage" class="mb-12">
      <Alert type="error" :message="errMessage" />
    </div>
    <div class="mb-6">
      <AdminChangeAvatar @onFileChange="onAvatarUpload" />
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
        <v-col cols="12" md="6" class="pe-md-3 mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.userRole') }}
          </p>
          <v-select
            v-model="role"
            :rules="[validationRules.required]"
            :items="roles"
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
        <v-col cols="12" md="6" class="ps-md-3 mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.userCountry') }}
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
        <v-col cols="12" class="mb-1">
          <p class="text-black text-body-2 mb-1 ms-4">
            {{ $t('label.password') }}
          </p>
          <v-text-field
            v-model="password"
            :rules="[validationRules.required, validationRules.min]"
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
                v-tooltip:bottom="$t('label.generate')"
                rounded
                @click="password = generateRandomPassword()"
              >
                <Icon name="refresh" />
              </v-btn>
              <v-btn
                color="black"
                variant="text"
                :size="35"
                v-tooltip:bottom="$t('label.copy')"
                rounded
                @click="copyPassword"
              >
                <Icon name="copy" size="22px" />
              </v-btn>
              <v-btn
                color="black"
                variant="text"
                :size="35"
                v-tooltip:bottom="
                  $t(passwordShow ? 'label.hide' : 'label.show')
                "
                rounded
                @click="passwordShow = !passwordShow"
              >
                <Icon :name="passwordShow ? 'eye' : 'eye-slash'" />
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" class="mb-1">
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
                v-tooltip:bottom="
                  $t(confirmPasswordShow ? 'label.hide' : 'label.show')
                "
                rounded
                @click="confirmPasswordShow = !confirmPasswordShow"
              >
                <Icon :name="confirmPasswordShow ? 'eye' : 'eye-slash'" />
              </v-btn>
            </template>
          </v-text-field>
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
            {{ $t('label.createUser') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-sheet>
</template>

<script lang="ts" setup>
import { VForm } from 'vuetify/components'
const countryList = await import('~/assets/json/countries.json')

definePageMeta({
  layout: 'admin',
})

const { t } = useI18n()
const { appName } = useAppConfig()

useHead({
  title: t('page.addUser.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const form = ref(VForm)
const loading = ref<boolean>(false)
const passwordShow = ref<boolean>(false)
const confirmPasswordShow = ref<boolean>(false)
const avatar = ref<File | null>(null)
const firstName = ref<string>('')
const lastName = ref<string>('')
const role = ref<string>('user')
const country = ref<string>('US')
const email = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')
const status = ref<string>('active')
const errMessage = ref<string | null>(null)

const roles = ref<{ text: string; value: string }[]>([
  {
    text: t('label.user'),
    value: 'user',
  },
  {
    text: t('label.admin'),
    value: 'admin',
  },
  {
    text: t('label.custom'),
    value: 'custom',
  },
])

const statusList = ref<{ text: string; value: string }[]>([
  {
    text: t('label.active'),
    value: 'active',
  },
  {
    text: t('label.inactive'),
    value: 'inactive',
  },
  {
    text: t('label.disabled'),
    value: 'disabled',
  },
  {
    text: t('label.deactivated'),
    value: 'deactivated',
  },
])

const countries = computed<{ country: string; abbreviation: string }[]>(() => {
  return countryList.default
})

const validationRules = reactive({
  required: (v: string) => !!v || t('validationMessage.required'),
  email: (v: string) => /.+@.+\..+/.test(v) || t('validationMessage.email'),
  max: (v: string) =>
    v.length <= 28 || t('validationMessage.maxCharacters', { num: 28 }),
  min: (v: string) =>
    v.length >= 8 || t('validationMessage.minCharacters', { num: 8 }),
  matches: () =>
    !confirmPassword.value ||
    confirmPassword.value === password.value ||
    t('validationMessage.matches'),
})

const onAvatarUpload = (file: File | null) => {
  console.log(file)
  avatar.value = file
}

const copyPassword = () => {
  navigator.clipboard.writeText(password.value)
}

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
