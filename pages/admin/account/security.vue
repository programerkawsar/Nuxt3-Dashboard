<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.2fa.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.2fa.subtitle') }}
      </p>
    </div>
    <v-timeline
      align="start"
      truncate-line="start"
      dot-color="primary"
      side="end"
      line-color="rgb(var(--v-theme-primary), 0.2)"
      class="ms-n6"
      hide-opposite
      fill-dot
    >
      <v-timeline-item size="small">
        <template #icon>
          <p class="text-body-1 font-weight-bold">1</p>
        </template>
        <div class="text-black mb-6">
          <h3 class="text-body-1 font-weight-bold mb-1">
            {{ $t('2fa.stepOne.title') }}
          </h3>
          <p class="text-body-2 text-medium-emphasis">
            {{ $t('2fa.stepOne.subtitle') }}
          </p>
        </div>
      </v-timeline-item>
      <v-timeline-item size="small">
        <template #icon>
          <p class="text-body-1 font-weight-bold">2</p>
        </template>
        <div class="text-black mb-6">
          <h3 class="text-body-1 font-weight-bold mb-1">
            {{ $t('2fa.stepTwo.title') }}
          </h3>
          <p class="text-body-2 text-medium-emphasis">
            {{ $t('2fa.stepTwo.subtitle') }}
          </p>
          <div class="my-4">
            <p class="text-body-2 font-weight-bold">
              {{ $t('label.manualKey') }}:
            </p>
            <div class="d-flex align-center">
              <p class="text-body-2">{{ key }}</p>
              <v-btn
                color="primary"
                variant="text"
                :size="30"
                v-tooltip:bottom="$t('label.copy')"
                rounded
                @click="copyKey"
              >
                <Icon name="solar:copy-outline" size="18px" />
              </v-btn>
            </div>
          </div>
          <v-card
            color="white"
            theme="light"
            :width="250"
            :height="250"
            variant="flat"
            class="text-center d-flex align-center justify-center"
            rounded="xl"
            border
          >
            <QrcodeVue :value="key" :size="200" level="H" />
          </v-card>
        </div>
      </v-timeline-item>
      <v-timeline-item size="small">
        <template #icon>
          <p class="text-body-1 font-weight-bold">3</p>
        </template>
        <div class="text-black">
          <h3 class="text-body-1 font-weight-bold mb-1">
            {{ $t('2fa.stepThree.title') }}
          </h3>
          <p class="text-body-2 text-medium-emphasis">
            {{ $t('2fa.stepThree.subtitle') }}
          </p>
          <div class="mt-2">
            <v-otp-input
              v-model="otp"
              class="otp-input-rounded justify-start ms-n2"
              base-color="black"
              :loading="loading"
              :error="message.type === 'error'"
              :disabled="message.type === 'success'"
            />
            <p
              v-if="message.type && message.text"
              :class="`text-caption text-${message.type} mt-n2`"
            >
              {{ message.text }}
            </p>
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </v-sheet>
</template>

<script lang="ts" setup>
import QrcodeVue from 'qrcode.vue'

definePageMeta({
  layout: 'admin',
})

const { t } = useI18n()
const { appName } = useAppConfig()

useHead({
  title: t('page.securitySettings.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const key = ref<string>('JLIVJNZY54RHZB6N')
const otp = ref<string>('')
const loading = ref<boolean>(false)
const message = reactive<{
  type: 'success' | 'error' | null
  text: string | null
}>({
  type: null,
  text: null,
})

watch(otp, (value: string) => {
  if (value.length > 0 && value.length < 6) {
    message.type = null
    message.text = null
  }

  if (value.length === 6) submit()
})

const copyKey = async () => {
  try {
    await navigator.clipboard.writeText(key.value)
  } catch (_) {}
}

const submit = async () => {
  try {
    loading.value = true

    setTimeout(() => {
      message.type = 'error'
      message.text = t('2fa.errorMessage')
    }, 2000)
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 2000)

    message.type = null
    message.text = null
  }
}
</script>
