<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="900">
    <div class="mb-6 mb-md-12 d-flex align-center">
      <div class="text-black">
        <h3 class="text-body-1 font-weight-bold">
          {{ $t('page.countryRestriction.title') }}
        </h3>
        <p class="text-body-2 text-medium-emphasis">
          {{ $t('page.countryRestriction.subtitle') }}
        </p>
      </div>
      <v-spacer />
      <v-btn
        to="/admin/system/country-restriction/add"
        color="primary"
        class="text-body-1 d-none d-sm-flex"
        rounded="pill"
        variant="flat"
      >
        <Icon name="plus" size="22px" /> {{ $t('label.addCountry') }}
      </v-btn>
      <v-btn
        class="d-sm-none"
        to="/admin/system/country-restriction/add"
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
        show-select
        @update:filterBy="sortApiData"
      >
        <template #loading>
          <v-skeleton-loader type="table-row@10" />
        </template>
        <template
          #header.data-table-select="{ allSelected, selectAll, someSelected }"
        >
          <v-checkbox-btn
            :indeterminate="someSelected && !allSelected"
            :model-value="allSelected"
            base-color="black"
            color="black"
            class="icon-opacity-0 ms-n3"
            @update:model-value="selectAll(!allSelected)"
          />
        </template>
        <template
          #item.data-table-select="{ internalItem, isSelected, toggleSelect }"
        >
          <v-checkbox-btn
            :model-value="isSelected(internalItem)"
            color="black"
            class="icon-opacity-0 ms-n3"
            @update:model-value="toggleSelect(internalItem)"
          />
        </template>
        <template #top>
          <AdminTableHeader
            active="search"
            :filters="['timeRange', 'search', 'status', 'location']"
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
        <template #item.active="{ item }">
          <v-sheet
            :color="item.active ? 'success' : 'error'"
            :width="10"
            :height="10"
            class="rounded-circle"
          />
        </template>
        <template #item.country="{ item }">
          <p class="text-body-2 text-black d-flex align-center">
            <Icon
              :name="`circle-flags:${item.country.abbreviation}`"
              size="20px"
              class="me-2"
            />
            {{ item.country.name }}
          </p>
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
          <AdminTableActionMenu
            :editPath="`/admin/system/country-restriction/edit/${item.id}`"
          >
            <template #deleteAction>
              <AdminDialogsConfirmation
                list="users"
                :data="item.id"
                @onSubmit="onDeleteSuccess"
              >
                <template #action>
                  <v-list-item rounded="xl" link>
                    <v-list-item-title>
                      {{ $t('label.delete') }}
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </AdminDialogsConfirmation>
            </template>
          </AdminTableActionMenu>
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
  country: {
    name: string
    abbreviation: string
  }
  label: string
  active: boolean
  createdAt: string
}

const {
  status: apiStatus,
  data: apiData,
  refresh: refreshData,
} = await useFetch('https://dummyjson.com/c/a30a-9cb7-401b-b657', {
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
  title: t('page.countryRestriction.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const loading = ref<boolean>(apiStatus.value === 'pending')
const items = ref<Item[]>(storedItems.value)
const selectedItems = ref<string[]>([])
const tableHeaders = ref<ReadonlyArray<any>>([
  {
    title: t('label.status'),
    align: 'start',
    key: 'active',
  },
  {
    title: t('label.country'),
    align: 'start',
    key: 'country',
  },
  {
    title: t('label.label'),
    align: 'start',
    key: 'label',
  },
  {
    title: t('label.when'),
    align: 'start',
    key: 'createdAt',
  },
  {
    title: t('label.action'),
    align: 'start',
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

const deleteItemByIdentifier = (identifier: string | string[]) => {
  if (typeof identifier === 'string') {
    items.value = items.value.filter((item: Item) => item.id !== identifier)
  } else {
    const identifierSet = new Set(identifier)
    items.value = items.value.filter(
      (item: Item) => !identifierSet.has(item.id)
    )
  }
}

const onDeleteSuccess = (identifier: string | string[]) => {
  if (!Array.isArray(identifier)) {
    deleteItemByIdentifier(identifier)
  } else {
    loading.value = true
    deleteItemByIdentifier(identifier)

    selectedItems.value = []
    loading.value = false
  }
}
</script>
