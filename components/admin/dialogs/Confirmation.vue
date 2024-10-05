<template>
  <v-dialog v-model="dialog" :max-width="350" persistent>
    <template #activator="{ props }">
      <span v-bind="props">
        <slot name="action" />
      </span>
    </template>
    <v-card color="white" rounded="xl">
      <div class="pa-6 text-black">
        <h3 class="text-body-1 font-weight-bold">
          {{ $t('dialog.confirmation.title') }}
        </h3>
        <p class="text-body-2 text-medium-emphasis mt-2">
          {{ $t('dialog.confirmation.subtitle') }}
        </p>
      </div>
      <v-divider />
      <div class="pa-6">
        <v-row no-gutters>
          <v-col cols="12" sm="6" class="pe-sm-3 mb-3 mb-sm-0">
            <v-btn
              color="primary"
              variant="tonal"
              rounded="pill"
              class="text-body-1"
              size="large"
              block
              @click="dialog = false"
            >
              {{ $t('label.disagree') }}
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" class="ps-sm-3">
            <v-btn
              color="primary"
              variant="flat"
              rounded="pill"
              class="text-body-1"
              size="large"
              block
              @click="submit"
            >
              {{ $t('label.agree') }}
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
interface Props {
  list: string
  data: string | string[]
}

const props = defineProps<Props>()
const emit = defineEmits<{ onSubmit: [value: string | string[]] }>()
const dialog = ref<boolean>(false)

const submit = () => {
  emit('onSubmit', props.data)
  dialog.value = false
}
</script>
