<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.systemOverview.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.systemOverview.subtitle') }}
      </p>
    </div>
    <v-list color="black" class="pa-0 mt-n6 bg-transparent">
      <template v-for="(item, idx) in items" :key="idx">
        <div class="py-6" v-if="item.type">
          <v-divider />
          <v-list-subheader class="text-uppercase text-caption ms-n4">
            {{ item.title }}
          </v-list-subheader>
          <v-divider />
        </div>
        <v-list-item class="px-0" v-else>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <template #append>
            <p class="text-black text-body-1">{{ item.value }}</p>
          </template>
        </v-list-item>
      </template>
    </v-list>
  </v-sheet>
</template>

<script lang="ts" setup>
type Item = {
  type?: 'subheader'
  title: string
  value?: string
}

definePageMeta({
  layout: 'admin',
})

const { t } = useI18n()
const { appName } = useAppConfig()

useHead({
  title: t('page.systemOverview.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const items = ref<Item[]>([
  { type: 'subheader', title: 'Application' },
  {
    title: 'Name',
    value: 'App Name',
  },
  {
    title: 'Version',
    value: 'v1.8',
  },
  {
    title: 'Time Zone',
    value: 'America/New_York',
  },
  { type: 'subheader', title: 'Server Details' },
  {
    title: 'Software',
    value: 'LiteSpeed',
  },
  {
    title: 'Node JS',
    value: 'v11.8.1',
  },
  {
    title: 'IP Address',
    value: '162.0.229.168',
  },
  {
    title: 'Protocol',
    value: 'HTTP/1.1',
  },
  {
    title: 'HTTP Host',
    value: 'example.com',
  },
  {
    title: 'Port',
    value: '443',
  },
])
</script>
