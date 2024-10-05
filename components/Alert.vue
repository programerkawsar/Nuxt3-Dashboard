<template>
  <v-alert variant="tonal" border="start" :type="type" rounded="xl" closable>
    <template #prepend>
      <Icon :name="icon" size="28px" />
    </template>
    <v-alert-title class="text-body-1 font-weight-bold">
      {{ alertTitle }}
    </v-alert-title>
    <p class="text-body-2">
      {{ message }}
    </p>
    <template #close="{ props }">
      <div class="ma-n2">
        <v-btn v-bind="props" variant="text" size="small">
          <Icon name="close-small" size="30px" />
        </v-btn>
      </div>
    </template>
  </v-alert>
</template>

<script lang="ts" setup>
interface Props {
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
}

const props = defineProps<Props>()
const { t } = useI18n()

const icon = computed<string>(() => {
  switch (props.type) {
    case 'success':
      return 'plug-charging'
    case 'error':
      return 'plug-xmark'
    case 'warning':
      return 'globe-warning'
    case 'info':
      return 'siren-rounded'
    default:
      return 'question-circle'
  }
})

const alertTitle = computed<string>(() => {
  if (props.title) return props.title

  switch (props.type) {
    case 'success':
      return t('label.actionSuccessful')
    case 'error':
      return t('label.errorOccurred')
    case 'warning':
      return t('label.proceedCautiously')
    case 'info':
      return t('label.importantNotice')
    default:
      return t('label.unexpectedOutcome')
  }
})
</script>
