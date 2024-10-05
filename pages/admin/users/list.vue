<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="1000">
    <div class="mb-6 mb-md-12 d-flex align-center">
      <div class="text-black">
        <h3 class="text-body-1 font-weight-bold">
          {{ $t('page.userList.title') }}
        </h3>
        <p class="text-body-2 text-medium-emphasis">
          {{ $t('page.userList.subtitle') }}
        </p>
      </div>
      <v-spacer />
      <v-btn
        to="/admin/users/add"
        color="primary"
        class="text-body-1 d-none d-sm-flex"
        rounded="pill"
        variant="flat"
      >
        <Icon name="plus" size="22px" /> {{ $t('label.addUser') }}
      </v-btn>
      <v-btn
        class="d-sm-none"
        to="/admin/users/add"
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
            active="role"
            :filters="['location', 'timeRange', 'status', 'role', 'search']"
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
        <template #item.user="{ item }">
          <v-sheet color="transparent" :min-width="200">
            <AdminTableUserItem
              :avatar="item.user.avatar"
              :name="item.user.name"
              :email="item.user.email"
            />
          </v-sheet>
        </template>
        <template #item.role="{ item }">
          <p class="text-black text-capitalize text-body-2">{{ item.role }}</p>
        </template>
        <template #item.status="{ item }">
          <v-chip :color="item.status === 'active' ? 'success' : 'error'">
            <span class="text-capitalize text-body-2">
              {{ $t(`label.${item.status}`) }}
            </span>
          </v-chip>
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
          <AdminTableActionMenu :editPath="`/admin/users/edit/${item.id}`">
            <template #view>
              <AdminDialogsViewTableData show="userData" />
            </template>
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
interface Item {
  id: string
  user: {
    id: number
    name: string
    email: string
    avatar: string
  }
  role: string
  status: string
  createdAt: string
}

const {
  status: apiStatus,
  data: apiData,
  refresh: refreshData,
} = await useFetch('https://dummyjson.com/c/486d-3987-4370-a435', {
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
  title: t('page.userList.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const loading = ref<boolean>(apiStatus.value === 'pending')
const items = ref<Item[]>(storedItems.value)
const selectedItems = ref<string[]>([])
const tableHeaders = ref<ReadonlyArray<any>>([
  {
    title: t('label.user'),
    align: 'start',
    key: 'user',
  },
  {
    title: t('label.role'),
    align: 'start',
    key: 'role',
  },
  {
    title: t('label.country'),
    align: 'start',
    key: 'country',
  },
  {
    title: t('label.status'),
    align: 'start',
    key: 'status',
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
