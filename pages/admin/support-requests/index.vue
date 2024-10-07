<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="1000">
    <div class="mb-6 mb-md-12 text-black">
      <h3 class="text-body-1 font-weight-bold">
        {{ $t('page.supportRequests.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.supportRequests.subtitle') }}
      </p>
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
            active="financialStatus"
            :filters="['timeRange', 'financialStatus', 'search']"
            :export="true"
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
            <template #deleteBtn>
              <AdminDialogsConfirmation
                list="users"
                :data="selectedItems"
                @onSubmit="onDeleteSuccess"
              >
                <template #action>
                  <v-btn
                    v-if="selectedItems.length >= 1"
                    color="primary"
                    class="ms-2"
                    variant="flat"
                    v-tooltip:bottom="$t('label.delete')"
                    :size="36"
                    icon
                  >
                    <Icon name="trash" />
                  </v-btn>
                </template>
              </AdminDialogsConfirmation>
            </template>
          </AdminTableHeader>
        </template>
        <template #item.status="{ item }">
          <v-chip :color="item.status === 'open' ? 'success' : 'warning'">
            <span class="text-capitalize text-body-2">
              {{ $t(`label.${item.status}`) }}
            </span>
          </v-chip>
        </template>
        <template #item.subject="{ item }">
          <v-sheet color="transparent" :width="150">
            <p class="text-body-2 text-truncate">{{ item.subject }}</p>
          </v-sheet>
        </template>
        <template #item.priority="{ item }">
          <p
            :class="`text-body-2 text-truncate ${priorityTextColor(
              item.priority
            )}`"
          >
            {{ item.priority }}
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
          <AdminTableActionMenu :editPath="null">
            <template #view>
              <v-list-item
                rounded="xl"
                :to="`/admin/support-requests/${item.tickedId}`"
                link
              >
                <v-list-item-title>
                  {{ $t('label.view') }}
                </v-list-item-title>
              </v-list-item>
            </template>
            <template #deleteAction>
              <AdminDialogsConfirmation
                list="users"
                :data="item.tickedId"
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
interface Item {
  tickedId: string
  category: string
  subject: string
  priority: string
  status: string
  createdAt: string
}

const {
  status: apiStatus,
  data: apiData,
  refresh: refreshData,
} = await useFetch('https://dummyjson.com/c/d042-a240-4c04-8a1a', {
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
  title: t('page.supportRequests.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const loading = ref<boolean>(apiStatus.value === 'pending')
const items = ref<Item[]>(storedItems.value)
const selectedItems = ref<string[]>([])
const tableHeaders = ref<ReadonlyArray<any>>([
  {
    title: t('label.tickedId'),
    align: 'start',
    key: 'tickedId',
  },
  {
    title: t('label.status'),
    align: 'start',
    key: 'status',
  },
  {
    title: t('label.category'),
    align: 'start',
    key: 'category',
  },
  {
    title: t('label.subject'),
    align: 'start',
    key: 'subject',
  },
  {
    title: t('label.priority'),
    align: 'start',
    key: 'priority',
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

const priorityTextColor = (priority: string): string => {
  if (priority.toLowerCase() === 'low') {
    return 'text-error'
  } else if (priority.toLowerCase() === 'medium') {
    return 'text-warning'
  } else {
    return 'text-success'
  }
}

const sortApiData = (val: { key: string; order: string }[]) => {
  console.log(val)
}

const deleteItemByIdentifier = (identifier: string | string[]) => {
  if (typeof identifier === 'string') {
    items.value = items.value.filter(
      (item: Item) => item.tickedId !== identifier
    )
  } else {
    const identifierSet = new Set(identifier)
    items.value = items.value.filter(
      (item: Item) => !identifierSet.has(item.tickedId)
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
