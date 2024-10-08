<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.frontendMenu.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.frontendMenu.subtitle') }}
      </p>
    </div>
    <div v-if="errMessage" class="mb-8 mt-n2">
      <Alert type="error" :message="errMessage" />
    </div>
    <v-row>
      <v-col
        cols="12"
        v-for="(item, idx) in items"
        :key="idx"
        :draggable="true"
      >
        <v-card color="white" class="pa-6" rounded="xl" variant="flat" border>
          <v-list-item class="pa-0">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
            <template #append>
              <v-btn
                color="black"
                size="small"
                variant="text"
                v-tooltip:bottom="$t('label.delete')"
                icon
                @click="deleteItem(idx)"
              >
                <Icon name="trash" />
              </v-btn>
              <v-btn
                color="black"
                size="small"
                variant="text"
                class="me-n3 cursor-grab"
                v-tooltip:bottom="$t('label.move')"
                icon
                @dragover.prevent
                @dragstart="onDragStart(idx)"
                @drop="onDrop(idx)"
              >
                <Icon name="draggable" />
              </v-btn>
            </template>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-btn
      base-color="primary"
      color="primary"
      rounded="pill"
      size="x-large"
      variant="flat"
      class="text-body-1 mt-7"
      block
    >
      {{ $t('label.saveChanges') }}
    </v-btn>
  </v-sheet>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
})

const { t } = useI18n()
const { appName } = useAppConfig()

useHead({
  title: t('page.frontendMenu.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const draggedItemIndex = ref<number>(-1)
const errMessage = ref<string | null>(null)
const items = ref([
  {
    title: 'Home',
    subtitle: '/',
  },
  {
    title: 'About',
    subtitle: '/page/about',
  },
  {
    title: 'Features',
    subtitle: '/page/features',
  },
  {
    title: 'Pricing',
    subtitle: '/page/pricing',
  },
  {
    title: 'FAQ',
    subtitle: '/page/faq',
  },
])

const deleteItem = (idx: number) => {
  if (items.value.length > 1) {
    items.value.splice(idx, 1)
  }
}

const onDragStart = (idx: number) => {
  draggedItemIndex.value = idx
}

const onDrop = (idx: number) => {
  const draggedItem = items.value[draggedItemIndex.value]
  items.value.splice(draggedItemIndex.value, 1)
  items.value.splice(idx, 0, draggedItem)
}
</script>
