<template>
  <v-card class="bg-transparent" variant="text" rounded="xl" border>
    <v-data-table
      :headers="tableHeaders"
      :items="items"
      :search="search"
      height="65vh"
      class="bg-transparent table-th--black"
      color="black"
      fixed-header
    >
      <template #top>
        <div v-if="!readonlyTable" class="d-flex align-center pa-6">
          <v-checkbox
            v-model="selectAll"
            :indeterminate="selectAllIndeterminate"
            color="black"
            class="icon-opacity-0 ms-n4"
            hide-details
          />
          <v-spacer />
          <v-sheet color="transparent" :width="200">
            <v-text-field
              v-model="search"
              base-color="black"
              color="black"
              variant="outlined"
              :label="$t('label.search')"
              rounded="pill"
              density="compact"
              single-line
              hide-details
            >
              <template #prepend-inner>
                <Icon name="search" size="20px" />
              </template>
            </v-text-field>
          </v-sheet>
        </div>
        <v-divider v-if="!readonlyTable" />
      </template>
      <template #item.capabilities="{ item, index }">
        <div class="mt-4 mb-2">
          <v-checkbox
            v-for="(value, key) in item.capabilities"
            :model-value="value"
            color="black"
            density="compact"
            class="icon-opacity-0 label-opacity-0 mt-n2"
            :disabled="readonlyTable"
            hide-details
            @click="selectCapabilities(index, key)"
          >
            <template #label>
              <p class="text-black text-body-2 text-capitalize ms-1">
                {{ key }}
              </p>
            </template>
          </v-checkbox>
        </div>
      </template>
      <template #bottom />
    </v-data-table>
  </v-card>
</template>

<script lang="ts" setup>
interface Props {
  readonlyTable?: boolean
  propPermissions?: Item[]
}

interface Item {
  feature: string
  capabilities: {
    view: boolean
    create: boolean
    edit: boolean
    delete: boolean
  }
}

const props = defineProps<Props>()
const { t } = useI18n()
const search = ref<string>('')
const selectAll = ref<boolean>(false)
const selectAllIndeterminate = ref<boolean>(false)
const selectCount = ref<number>(0)
const emit = defineEmits<{ onChange: [value: Item[]] }>()

const permissions = [
  {
    feature: 'Contracts',
    capabilities: {
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
  },
  {
    feature: 'Credit Notes',
    capabilities: {
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
  },
  {
    feature: 'Email Templates',
    capabilities: {
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
  },
  {
    feature: 'Items',
    capabilities: {
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
  },
  {
    feature: 'Projects',
    capabilities: {
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
  },
  {
    feature: 'Reports',
    capabilities: {
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
  },
  {
    feature: 'Tasks',
    capabilities: {
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
  },
  {
    feature: 'Goals',
    capabilities: {
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
  },
  {
    feature: 'Surveys',
    capabilities: {
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
  },
]

const tableHeaders = ref<ReadonlyArray<any>>([
  {
    title: t('label.features'),
    align: 'start',
    key: 'feature',
    sortable: false,
  },
  {
    title: t('label.capabilities'),
    align: 'start',
    key: 'capabilities',
    sortable: false,
  },
])

const items = ref<Item[]>(props.propPermissions || permissions)

onMounted(() => emit('onChange', items.value))

watch(selectAll, (value: boolean) => {
  items.value.forEach((item: Item) => {
    item.capabilities.view = value
    item.capabilities.create = value
    item.capabilities.edit = value
    item.capabilities.delete = value
  })

  selectCount.value = value ? items.value.length * 4 : 0
  updateSelectAllIndeterminate()
})

const updateSelectAllIndeterminate = () => {
  const totalCapabilities = items.value.length * 4

  if (selectCount.value === totalCapabilities) {
    selectAllIndeterminate.value = false
  } else if (selectCount.value > 0 && selectCount.value < totalCapabilities) {
    selectAllIndeterminate.value = true
  } else {
    selectAllIndeterminate.value = false
  }

  emit('onChange', items.value)
}

const selectCapabilities = (
  idx: number,
  key: 'view' | 'create' | 'edit' | 'delete'
) => {
  const capability = items.value[idx].capabilities[key]

  if (capability) {
    selectCount.value--
  } else {
    selectCount.value++
  }

  items.value[idx].capabilities[key] = !capability
  updateSelectAllIndeterminate()
}
</script>
