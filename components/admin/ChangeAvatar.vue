<template>
  <div v-if="errMessage" class="mb-12">
    <Alert type="error" :message="errMessage" />
  </div>
  <div class="text-center">
    <v-badge color="transparent" :offset-x="30" :offset-y="10">
      <template #badge>
        <v-btn
          v-if="imageSrc"
          color="white"
          :size="30"
          :loading="removeLoading"
          rounded="circle"
          @click="removeImage"
        >
          <Icon name="close-small" />
        </v-btn>
      </template>
      <div class="user-avatar position-relative w-100 h-100 mx-auto">
        <v-avatar theme="light" color="primary" :size="120">
          <v-img
            v-if="imageSrc"
            :src="!uploadLoading ? imageSrc : ''"
            :lazy-src="imageSrc"
          >
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                  color="grey-lighten-4"
                  :width="3"
                  indeterminate
                />
              </div>
            </template>
          </v-img>
          <h3
            class="text-h6 font-weight-bold"
            v-else-if="!uploadLoading && name"
          >
            {{ getFirstLetters(name, 2) }}
          </h3>
          <Icon v-else-if="!uploadLoading && !name" name="user" size="50px" />
          <v-progress-circular color="white" :width="3" indeterminate v-else />
          <v-card
            variant="flat"
            class="upload w-100 text-center cursor-pointer pa-1"
            link
            @click="openFileUploadDialog"
          >
            <Icon name="camera" size="20px" />
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style="display: none"
              @change="uploadImage"
            />
          </v-card>
        </v-avatar>
      </div>
    </v-badge>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  avatarImage?: string
  name?: string
}

const { t } = useI18n()
const props = defineProps<Props>()
const imageSrc = ref<string | null>(props.avatarImage || null)
const removeLoading = ref<boolean>(false)
const uploadLoading = ref<boolean>(false)
const errMessage = ref<string | null>(null)
const emit = defineEmits<{ onFileChange: [value: File | null] }>()

const removeImage = () => {
  removeLoading.value = true

  if (!props.avatarImage && !props.name) {
    emit('onFileChange', null)
  }

  setTimeout(() => {
    removeLoading.value = false
    imageSrc.value = null
  }, 2000)
}

const openFileUploadDialog = () => {
  document.getElementById('fileInput')?.click()
}

const validateImageFile = (file: File): boolean => {
  const maxSize = 8 * 1024 * 1024

  if (!file.type.startsWith('image/')) {
    errMessage.value = t('validationMessage.invalidImageType')
    return false
  }

  if (file.size > maxSize) {
    errMessage.value = t('validationMessage.fileSizeLimit', { size: '8MB' })
    return false
  }

  errMessage.value = null
  return true
}

const uploadImage = (e: Event) => {
  const input = e.target as HTMLInputElement

  if (input.files && input.files[0]) {
    const file = input.files[0]
    const isValid = validateImageFile(file)
    uploadLoading.value = true

    if (isValid) {
      const previewUrl = URL.createObjectURL(file)

      if (!props.avatarImage && !props.name) {
        emit('onFileChange', file)
      }

      setTimeout(() => {
        uploadLoading.value = false
        errMessage.value = null
        imageSrc.value = previewUrl
      }, 2000)
    } else {
      uploadLoading.value = false
    }
  }

  input.value = ''
}
</script>

<style lang="sass" scoped>
.user-avatar .upload
  position: absolute
  bottom: 0
  background: rgba(0, 0, 0, 0.4)
  color: #fff
</style>
