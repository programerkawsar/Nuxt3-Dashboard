<template>
  <v-card color="white" variant="flat" rounded="xl" class="fill-height" border>
    <div class="d-flex align-center pa-6">
      <di class="pe-6">
        <h3 class="text-body-1 font-weight-bold">
          {{ $t('visitsByCountry.title') }}
        </h3>
        <p class="text-body-2 text-medium-emphasis">
          {{
            $t('visitsByCountry.subtitle', {
              numOfCountries: 20,
              percentage: 97,
            })
          }}
        </p>
      </di>
      <v-spacer />
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            color="black"
            size="small"
            variant="text"
            class="me-n2"
            v-tooltip:bottom="$t('label.filter')"
            flat
            icon
          >
            <Icon name="menu" />
          </v-btn>
        </template>
        <v-card :width="180" color="white" rounded="xl">
          <v-list
            base-color="black"
            color="primary"
            rounded="xl"
            class="bg-transparent pa-2"
          >
            <v-list-item
              v-for="(item, idx) in filters"
              :key="idx"
              rounded="pill"
              link
            >
              <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
    <v-divider />
    <v-sheet
      color="transparent"
      height="50vh"
      class="overflow-y-auto px-6 py-4"
    >
      <v-list
        v-if="items.length !== 0"
        color="black"
        class="pa-0 bg-transparent"
      >
        <v-list-item v-for="(item, idx) in items" :key="idx" class="pa-0">
          <template #prepend>
            <v-avatar :size="24">
              <Icon :name="`circle-flags:${item.abbreviation.toLowerCase()}`" />
            </v-avatar>
          </template>
          <v-list-item-title>{{ item.countryName }}</v-list-item-title>
          <template #append>
            <h3 class="text-body-1 font-weight-bold">
              {{ abbreviateNumber(item.numOfVisits) }}
            </h3>
          </template>
        </v-list-item>
      </v-list>
      <AdminEmpty v-else />
    </v-sheet>
  </v-card>
</template>

<script lang="ts" setup>
interface Item {
  abbreviation: string
  countryName: string
  numOfVisits: number
}

const filters = ref<{ title: string }[]>([
  { title: 'label.allVisits' },
  { title: 'label.today' },
  { title: 'label.thisWeek' },
  { title: 'label.thisMonth' },
  { title: 'label.lastMonth' },
  { title: 'label.thisYear' },
  { title: 'label.lastYear' },
])

const items = ref<Item[]>([
  {
    abbreviation: 'us',
    countryName: 'United States',
    numOfVisits: 9763,
  },
  {
    abbreviation: 'ca',
    countryName: 'Canada',
    numOfVisits: 5234,
  },
  {
    abbreviation: 'gb',
    countryName: 'United Kingdom',
    numOfVisits: 3421,
  },
  {
    abbreviation: 'au',
    countryName: 'Australia',
    numOfVisits: 2987,
  },
  {
    abbreviation: 'de',
    countryName: 'Germany',
    numOfVisits: 2754,
  },
  {
    abbreviation: 'fr',
    countryName: 'France',
    numOfVisits: 2589,
  },
  {
    abbreviation: 'jp',
    countryName: 'Japan',
    numOfVisits: 2432,
  },
  {
    abbreviation: 'in',
    countryName: 'India',
    numOfVisits: 2218,
  },
  {
    abbreviation: 'br',
    countryName: 'Brazil',
    numOfVisits: 1997,
  },
  {
    abbreviation: 'cn',
    countryName: 'China',
    numOfVisits: 1834,
  },
  {
    abbreviation: 'mx',
    countryName: 'Mexico',
    numOfVisits: 1749,
  },
  {
    abbreviation: 'it',
    countryName: 'Italy',
    numOfVisits: 1610,
  },
  {
    abbreviation: 'es',
    countryName: 'Spain',
    numOfVisits: 1543,
  },
  {
    abbreviation: 'ru',
    countryName: 'Russia',
    numOfVisits: 1398,
  },
  {
    abbreviation: 'kr',
    countryName: 'South Korea',
    numOfVisits: 1284,
  },
  {
    abbreviation: 'nl',
    countryName: 'Netherlands',
    numOfVisits: 1145,
  },
  {
    abbreviation: 'za',
    countryName: 'South Africa',
    numOfVisits: 1023,
  },
  {
    abbreviation: 'se',
    countryName: 'Sweden',
    numOfVisits: 978,
  },
])
</script>
