<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="1000">
    <div class="mb-6 mb-md-12 d-flex align-center">
      <div class="text-black">
        <h3 class="text-body-1 font-weight-bold">
          {{ $t('page.emailTemplates.title') }}
        </h3>
        <p class="text-body-2 text-medium-emphasis">
          {{ $t('page.emailTemplates.subtitle') }}
        </p>
      </div>
      <v-spacer />
      <v-btn
        to="/admin/email-templates/add"
        color="primary"
        class="text-body-1 d-none d-sm-flex"
        rounded="pill"
        variant="flat"
      >
        <Icon name="plus" size="22px" /> {{ $t('label.addTemplate') }}
      </v-btn>
      <v-btn
        class="d-sm-none"
        to="/admin/email-templates/add"
        :size="36"
        color="primary"
        variant="flat"
        icon
      >
        <Icon name="plus" size="22px" />
      </v-btn>
    </div>
    <v-card variant="text" rounded="xl" border>
      <v-data-table-server
        v-model="selectedItems"
        :headers="tableHeaders"
        :items="items"
        :items-length="0"
        :loading="loading"
        item-value="id"
        class="data-table--customized bg-transparent"
        color="black"
        @update:filterBy="sortApiData"
      >
        <template #loading>
          <v-skeleton-loader type="table-row@10" />
        </template>
        <template #top>
          <AdminTableHeader
            active="search"
            :filters="['timeRange', 'search']"
            :export="false"
          >
            <template #refreshBtn>
              <v-btn
                v-if="apiStatus === 'error'"
                color="primary"
                class="ms-2"
                variant="flat"
                :size="36"
                v-tooltip:bottom="$t('label.refresh')"
                icon
                @click="refreshData"
              >
                <Icon name="refresh" />
              </v-btn>
            </template>
          </AdminTableHeader>
        </template>
        <template #item.createdAt="{ item }">
          <v-sheet color="transparent" :min-width="120">
            <p class="text-body-2 text-black">
              <b>{{ timeAgo(item.createdAt) }}</b>
              <br />
              <span class="text-medium-emphasis">
                {{ formatDate(item.createdAt) }}
              </span>
            </p>
          </v-sheet>
        </template>
        <template #item.action="{ item }">
          <v-btn
            color="primary"
            variant="text"
            rounded="pill"
            size="small"
            class="text-body-2 text-uppercase"
            :to="`/admin/email-templates/edit/${item.id}`"
          >
            {{ $t('label.edit') }}
          </v-btn>
        </template>
        <template #bottom>
          <AdminTableFooter :totalItems="items.length || 0" />
        </template>
      </v-data-table-server>
    </v-card>
  </v-sheet>
</template>

<script lang="ts" setup>
type Item = {
  id: string
  title: string
  subject: string
  createdAt: string
}

const {
  status: apiStatus,
  data: apiData,
  refresh: refreshData,
} = await useFetch('https://dummyjson.com/c/3f3a-c8df-47fe-8417', {
  lazy: true,
})

const storedItems = computed<Item[]>(() => {
  if (apiStatus.value === 'success') {
    return (apiData.value as any).data
  } else {
    return []
  }
})

definePageMeta({
  layout: 'admin',
})

const { t } = useI18n()
const { appName } = useAppConfig()

useHead({
  title: t('page.emailTemplates.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const loading = ref<boolean>(apiStatus.value === 'pending')
const items = ref<Item[]>(storedItems.value)
const selectedItems = ref<string[]>([])
const tableHeaders = ref<ReadonlyArray<any>>([
  {
    title: t('label.title'),
    align: 'start',
    key: 'title',
  },
  {
    title: t('label.subject'),
    align: 'start',
    key: 'subject',
  },
  {
    title: t('label.when'),
    align: 'start',
    key: 'createdAt',
  },
  {
    title: t('label.action'),
    align: 'center',
    key: 'action',
    sortable: false,
  },
])

watch(storedItems, (value: Item[]) => {
  items.value = value
})

const sortApiData = (val: { key: string; order: string }[]) => {
  console.log(val)
}
</script>
