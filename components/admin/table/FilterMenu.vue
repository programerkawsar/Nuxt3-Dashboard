<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        color="primary"
        variant="flat"
        v-tooltip:bottom="$t('label.filter')"
        :size="36"
        icon
      >
        <Icon name="filter" size="22px" />
      </v-btn>
    </template>
    <v-card color="white" rounded="xl">
      <v-list base-color="black" color="primary" class="pa-2 bg-transparent">
        <v-list-item
          v-if="filters.includes('search')"
          rounded="xl"
          :active="filterBy === 'search'"
          link
          @click="filterBy = 'search'"
        >
          <v-list-item-title>
            {{ $t('text.searchFromTable') }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="filters.includes('role')"
          rounded="xl"
          :active="filterBy === 'role'"
          link
          @click="filterBy = 'role'"
        >
          <v-list-item-title>
            {{ $t('text.filterByRole') }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="filters.includes('status')"
          rounded="xl"
          :active="filterBy === 'status'"
          link
          @click="filterBy = 'status'"
        >
          <v-list-item-title>
            {{ $t('text.filterByStatus') }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="filters.includes('financialStatus')"
          rounded="xl"
          :active="filterBy === 'financialStatus'"
          link
          @click="filterBy = 'financialStatus'"
        >
          <v-list-item-title>
            {{ $t('text.filterByStatus') }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="filters.includes('requestStatus')"
          rounded="xl"
          :active="filterBy === 'requestStatus'"
          link
          @click="filterBy = 'requestStatus'"
        >
          <v-list-item-title>
            {{ $t('text.filterByStatus') }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="filters.includes('priorityStatus')"
          rounded="xl"
          :active="filterBy === 'priorityStatus'"
          link
          @click="filterBy = 'priorityStatus'"
        >
          <v-list-item-title>
            {{ $t('text.filterByPriority') }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="filters.includes('timeRange')"
          rounded="xl"
          :active="filterBy === 'timeRange'"
          link
          @click="filterBy = 'timeRange'"
        >
          <v-list-item-title>
            {{ $t('text.filterByTimeRange') }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="filters.includes('location')"
          rounded="xl"
          :active="filterBy === 'location'"
          link
          @click="filterBy = 'location'"
        >
          <v-list-item-title>
            {{ $t('text.filterByLocation') }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="filters.includes('device')"
          rounded="xl"
          :active="filterBy === 'device'"
          link
          @click="filterBy = 'device'"
        >
          <v-list-item-title>
            {{ $t('text.filterByDevice') }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="filters.includes('browser')"
          rounded="xl"
          :active="filterBy === 'browser'"
          link
          @click="filterBy = 'browser'"
        >
          <v-list-item-title>
            {{ $t('text.filterByBrowser') }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script lang="ts" setup>
interface Props {
  active: string
  filters: string[]
}

const props = defineProps<Props>()
const emit = defineEmits<{ onFilterChange: [value: string] }>()
const filterBy = ref<string>(props.active)

watch(filterBy, (value: string) => {
  emit('onFilterChange', value)
})
</script>
