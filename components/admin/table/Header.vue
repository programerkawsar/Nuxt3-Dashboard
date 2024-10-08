<template>
  <v-toolbar color="thinGrey" class="px-6 py-3">
    <v-spacer />
    <v-sheet v-if="filters" color="transparent" :width="200">
      <v-text-field
        v-if="filters.includes('search') && filterBy === 'search'"
        v-model="search"
        base-color="black"
        color="black"
        variant="outlined"
        :label="$t('label.search')"
        rounded="pill"
        density="compact"
        :loading="false"
        single-line
        hide-details
      >
        <template #prepend-inner>
          <Icon name="search" size="20px" />
        </template>
      </v-text-field>
      <v-select
        v-if="filters.includes('role') && filterBy === 'role'"
        v-model="rule"
        :label="$t('select.placeholder')"
        color="black"
        base-color="black"
        :items="sortableRoles"
        item-title="text"
        rounded="pill"
        variant="outlined"
        density="compact"
        class="expand-icon--black"
        hide-details
        single-line
      >
        <template #item="{ props }">
          <v-list-item
            v-bind="props"
            :item-props="props"
            base-color="black"
            color="primary"
            rounded="xl"
            class="mx-2"
            link
          />
        </template>
      </v-select>
      <v-select
        v-if="filters.includes('status') && filterBy === 'status'"
        v-model="status"
        :label="$t('select.placeholder')"
        color="black"
        base-color="black"
        :items="sortableStatus"
        rounded="pill"
        item-title="text"
        variant="outlined"
        density="compact"
        class="expand-icon--black"
        hide-details
        single-line
      >
        <template #item="{ props }">
          <v-list-item
            v-bind="props"
            :item-props="props"
            base-color="black"
            color="primary"
            rounded="xl"
            class="mx-2"
            link
          />
        </template>
      </v-select>
      <v-select
        v-if="
          filters.includes('financialStatus') && filterBy === 'financialStatus'
        "
        v-model="status"
        :label="$t('select.placeholder')"
        color="black"
        base-color="black"
        :items="financialStatus"
        rounded="pill"
        item-title="text"
        variant="outlined"
        density="compact"
        class="expand-icon--black"
        hide-details
        single-line
      >
        <template #item="{ props }">
          <v-list-item
            v-bind="props"
            :item-props="props"
            base-color="black"
            color="primary"
            rounded="xl"
            class="mx-2"
            link
          />
        </template>
      </v-select>
      <v-select
        v-if="filters.includes('requestStatus') && filterBy === 'requestStatus'"
        v-model="status"
        :label="$t('select.placeholder')"
        color="black"
        base-color="black"
        :items="requestStatus"
        rounded="pill"
        item-title="text"
        variant="outlined"
        density="compact"
        class="expand-icon--black"
        hide-details
        single-line
      >
        <template #item="{ props }">
          <v-list-item
            v-bind="props"
            :item-props="props"
            base-color="black"
            color="primary"
            rounded="xl"
            class="mx-2"
            link
          />
        </template>
      </v-select>
      <v-select
        v-if="
          filters.includes('priorityStatus') && filterBy === 'priorityStatus'
        "
        v-model="status"
        :label="$t('select.placeholder')"
        color="black"
        base-color="black"
        :items="priorityStatus"
        rounded="pill"
        item-title="text"
        variant="outlined"
        density="compact"
        class="expand-icon--black"
        hide-details
        single-line
      >
        <template #item="{ props }">
          <v-list-item
            v-bind="props"
            :item-props="props"
            base-color="black"
            color="primary"
            rounded="xl"
            class="mx-2"
            link
          />
        </template>
      </v-select>
      <v-date-input
        v-if="filters.includes('timeRange') && filterBy === 'timeRange'"
        v-model="timeRange"
        :label="$t('label.selectRange')"
        color="black"
        base-color="black"
        multiple="range"
        rounded="xl"
        variant="outlined"
        prepend-inner-icon="$calendar"
        density="compact"
        prepend-icon=""
        hide-details
        single-line
      />
      <v-select
        v-if="filters.includes('location') && filterBy === 'location'"
        v-model="location"
        :label="$t('select.placeholder')"
        color="black"
        base-color="black"
        :items="countries"
        item-title="country"
        item-value="abbreviation"
        rounded="pill"
        variant="outlined"
        density="compact"
        class="expand-icon--black"
        hide-details
        single-line
      >
        <template #item="{ item, props }">
          <v-list-item
            v-bind="props"
            :item-props="props"
            base-color="black"
            color="primary"
            rounded="xl"
            class="mx-2"
            link
          >
            <template #prepend>
              <v-avatar v-if="item?.value === 'all'" color="transparent">
                <Icon name="streets-map" />
              </v-avatar>
              <v-avatar color="transparent" v-else>
                <Icon :name="`circle-flags:${item?.value?.toLowerCase()}`" />
              </v-avatar>
            </template>
            <v-list-item-title>
              {{ item?.value?.country }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-select>
      <v-select
        v-if="filters.includes('device') && filterBy === 'device'"
        v-model="device"
        :label="$t('select.placeholder')"
        color="black"
        base-color="black"
        :items="devices"
        item-title="text"
        rounded="pill"
        variant="outlined"
        density="compact"
        class="expand-icon--black"
        hide-details
        single-line
      >
        <template #item="{ item, props }">
          <v-list-item
            v-bind="props"
            :item-props="props"
            base-color="black"
            color="primary"
            rounded="xl"
            class="mx-2"
            link
          >
            <template #prepend>
              <Icon
                v-if="item?.value === 'all'"
                name="monitor-smartphone"
                class="me-4"
              />
              <Icon :name="getDeviceIcon(item?.value)" class="me-4" v-else />
            </template>
            <v-list-item-title>
              {{ item?.value?.text }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-select>
      <v-select
        v-if="filters.includes('browser') && filterBy === 'browser'"
        v-model="browser"
        :label="$t('select.placeholder')"
        color="black"
        base-color="black"
        :items="browsers"
        rounded="pill"
        variant="outlined"
        density="compact"
        class="expand-icon--black"
        hide-details
        single-line
      >
        <template #item="{ props }">
          <v-list-item
            v-bind="props"
            :item-props="props"
            base-color="black"
            color="primary"
            rounded="xl"
            class="mx-2"
            link
          />
        </template>
      </v-select>
    </v-sheet>
    <div v-if="filters !== null" class="ms-3">
      <AdminTableFilterMenu
        :active="active"
        :filters="filters || []"
        @onFilterChange="onFilterChange"
      />
    </div>
    <AdminTableExportMenu v-if="export" />
    <slot name="deleteBtn" />
    <slot name="refreshBtn" />
  </v-toolbar>
  <v-divider />
</template>

<script lang="ts" setup>
import { VDateInput } from 'vuetify/labs/VDateInput'

interface Props {
  active: string
  filters: string[] | null
  export: boolean
}

const props = defineProps<Props>()
const countryList = await import('~/assets/json/countries.json')
const { t } = useI18n()

const filterBy = ref<string>(props.active)
const rule = ref<string>('all')
const status = ref<string>('all')
const timeRange = ref<Date[]>([])
const location = ref<string>('all')
const search = ref<string>('')
const device = ref<string>('all')
const browser = ref<string>('all')

const sortableRoles = ref<{ text: string; value: string }[]>([
  {
    text: t('label.allRoles'),
    value: 'all',
  },
  {
    text: t('label.user'),
    value: 'user',
  },
  {
    text: t('label.admin'),
    value: 'admin',
  },
  {
    text: t('label.custom'),
    value: 'custom',
  },
])

const sortableStatus = ref<{ text: string; value: string }[]>([
  {
    text: t('label.allStatus'),
    value: 'all',
  },
  {
    text: t('label.active'),
    value: 'active',
  },
  {
    text: t('label.inactive'),
    value: 'inactive',
  },
  {
    text: t('label.disabled'),
    value: 'disabled',
  },
])

const financialStatus = ref<{ text: string; value: string }[]>([
  {
    text: t('label.allStatus'),
    value: 'all',
  },
  {
    text: t('label.completed'),
    value: 'completed',
  },
  {
    text: t('label.pending'),
    value: 'pending',
  },
])

const requestStatus = ref<{ text: string; value: string }[]>([
  {
    text: t('label.allStatus'),
    value: 'all',
  },
  {
    text: t('label.open'),
    value: 'open',
  },
  {
    text: t('label.pending'),
    value: 'pending',
  },
])

const priorityStatus = ref<{ text: string; value: string }[]>([
  {
    text: t('label.allPriorities'),
    value: 'all',
  },
  {
    text: t('label.high'),
    value: 'high',
  },
  {
    text: t('label.medium'),
    value: 'medium',
  },
  {
    text: t('label.low'),
    value: 'low',
  },
])

const devices = ref<{ text: string; value: string }[]>([
  {
    text: t('label.allDevices'),
    value: 'all',
  },
  {
    text: t('label.mobile'),
    value: 'mobile',
  },
  {
    text: t('label.tablet'),
    value: 'tablet',
  },
  {
    text: t('label.computer'),
    value: 'computer',
  },
])

const browsers = ref<{ title: string; value: string }[]>([
  {
    title: 'All Browsers',
    value: 'all',
  },
  { title: 'Chrome', value: 'chrome' },
  { title: 'Safari', value: 'safari' },
  { title: 'Edge', value: 'edge' },
  { title: 'Firefox', value: 'firefox' },
  { title: 'Opera', value: 'opera' },
  { title: 'Brave', value: 'brave' },
  { title: 'Arc Browser', value: 'arc' },
  {
    title: 'Samsung Internet',
    value: 'samsungInternet',
  },
  { title: 'Other', value: 'other' },
])

const countries = computed<{ country: string; abbreviation: string }[]>(() => {
  return [
    {
      country: t('label.allCountries'),
      abbreviation: 'all',
    },
    ...countryList.default,
  ]
})

const onFilterChange = (value: string) => {
  filterBy.value = value
}

const getDeviceIcon = (type: string) => {
  switch (type) {
    case 'mobile':
      return 'smartphone'
    case 'computer':
      return 'laptop'
    case 'tablet':
      return 'tablet'
    default:
      return 'smartphone'
  }
}
</script>
