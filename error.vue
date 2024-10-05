<template>
  <v-sheet
    color="white"
    height="100vh"
    class="d-flex align-center justify-center pa-6"
  >
    <v-empty-state>
      <template #media>
        <div class="empty-state-media mb-6">
          <h1 class="status-code text-primary font-weight-black">
            {{ error?.statusCode }}
          </h1>
          <NuxtImg
            fit="cover"
            class="vector-img ms-1"
            loading="lazy"
            :src="skylineVectorImage"
          />
        </div>
      </template>
      <template #title>
        <h3 class="text-app-black text-h6 text-sm-h5 font-weight-bold mb-2">
          {{ errorMessage.title }}
        </h3>
      </template>
      <template #text>
        <p class="text-body-2 text-sm-body-1 text-medium-emphasis">
          {{ errorMessage.subtitle }}
        </p>
      </template>
      <template #actions>
        <v-btn
          variant="flat"
          color="primary"
          rounded="lg"
          size="x-large"
          class="text-body-1 mt-8 px-8"
          @click="handleError"
        >
          <Icon name="arrow-long-left" class="me-1" size="26px" />
          {{ $t('button.getBack') }}
        </v-btn>
      </template>
    </v-empty-state>
  </v-sheet>
</template>

<script lang="ts" setup>
const { appName } = useAppConfig()
const { t } = useI18n()

const props = defineProps<{
  error?: {
    statusCode?: number
  }
}>()

useHead({
  title: t('text.anErrorOccurred'),
  titleTemplate: `%s | ${appName}`,
})
const theme = useTheme()

const isDarkTheme = computed<boolean>(() => {
  return theme?.global?.current?.value?.dark || false
})

const skylineVectorImage = computed<string>(() => {
  return isDarkTheme.value
    ? '/images/city-skyline-dark.svg'
    : '/images/city-skyline-light.svg'
})

const errorMessage = computed<{ title: string; subtitle: string }>(() => {
  const statusCode = Number(props.error?.statusCode)

  if (statusCode >= 300 && statusCode <= 399) {
    return {
      title: t('redirectionError.title'),
      subtitle: t('redirectionError.subtitle'),
    }
  } else if (statusCode === 404) {
    return {
      title: t('pageNotFoundError.title'),
      subtitle: t('pageNotFoundError.subtitle'),
    }
  } else if (statusCode >= 400 && statusCode <= 499) {
    return {
      title: t('clientError.title'),
      subtitle: t('clientError.subtitle'),
    }
  }

  return {
    title: t('serverError.title'),
    subtitle: t('serverError.subtitle'),
  }
})

const handleError = () => clearError({ redirect: '/' })
</script>

<style lang="sass" scoped>
.empty-state-media
  position: relative
  margin-top: -100px

  .status-code
    letter-spacing: 10px

  .vector-img
    position: absolute
    width: 100%
    height: 100%
    left: 0
    right: 0
    opacity: 0.8

@media only screen and (max-width: 599px)
  .status-code
    font-size: 7rem

  .vector-img
    top: -10px

@media only screen and (min-width: 600px)
  .status-code
    font-size: 14rem

  .vector-img
    top: -25px

@media only screen and (min-width: 960px)
  .status-code
    font-size: 18.5rem

  .vector-img
    top: -20px
</style>
