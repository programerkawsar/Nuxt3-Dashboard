<template>
  <v-card color="white" variant="flat" rounded="xl" class="fill-height" border>
    <div class="pa-6 d-sm-flex align-center justify-space-between">
      <div class="pe-sm-6 text-black mb-6 mb-sm-0">
        <h3 class="text-body-1 font-weight-bold">
          {{ $t('areaChart.title') }}
        </h3>
        <p class="text-body-2 text-medium-emphasis">
          {{ $t('areaChart.subtitle') }}
        </p>
      </div>
      <div class="d-flex align-center">
        <v-sheet
          color="transparent"
          class="date-range-input expand-icon--black me-3"
        >
          <v-date-input
            v-model="range"
            :label="$t('label.selectRange')"
            color="black"
            base-color="black"
            max-width="368"
            multiple="range"
            rounded="xl"
            variant="outlined"
            append-inner-icon="$calendar"
            density="comfortable"
            prepend-icon=""
            hide-details
            single-line
          />
        </v-sheet>
        <v-menu>
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              color="primary"
              variant="flat"
              :size="42"
              v-tooltip:bottom="$t('label.filter')"
              icon
            >
              <Icon name="filter" size="22px" />
            </v-btn>
          </template>
          <v-card class="filter-menu" color="white" rounded="xl">
            <v-row no-gutters>
              <v-col
                v-for="(item, idx) in dateFilters"
                :key="idx"
                cols="12"
                md="6"
              >
                <v-list
                  base-color="black"
                  color="primary"
                  rounded="xl"
                  class="pa-2 bg-transparent"
                >
                  <v-list-item
                    v-for="(childItem, childIdx) in item"
                    :key="childIdx"
                    rounded="pill"
                    link
                    @click="selectDateRange(childItem.clickAction)"
                  >
                    <v-list-item-title>
                      {{ $t(childItem.title) }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-card>
        </v-menu>
      </div>
    </div>
    <v-divider />
    <div class="pt-1 pb-5 pl-1 pr-5">
      <div class="d-flex justify-end pt-3 pl-3">
        <v-btn
          color="black"
          size="small"
          variant="text"
          v-tooltip:bottom="$t('label.zoomIn')"
          flat
          icon
          @click="chartController('apexcharts-zoomin-icon')"
        >
          <Icon name="magnifer-zoom-in" size="22px" />
        </v-btn>
        <v-btn
          color="black"
          size="small"
          variant="text"
          v-tooltip:bottom="$t('label.zoomOut')"
          flat
          icon
          @click="chartController('apexcharts-zoomout-icon')"
        >
          <Icon name="magnifer-zoom-out" size="22px" />
        </v-btn>
        <v-item-group>
          <v-item v-slot="{ isSelected, toggle }">
            <v-btn
              :color="isSelected ? 'primary' : 'black'"
              size="small"
              variant="text"
              v-tooltip:bottom="
                isSelected ? $t('label.selectionZoom') : $t('label.panning')
              "
              flat
              icon
              @click="
                () => {
                  //@ts-ignore
                  toggle()
                  chartController(
                    !isSelected ? 'apexcharts-pan-icon' : 'apexcharts-zoom-icon'
                  )
                }
              "
            >
              <Icon name="hand-raised" size="22px" />
            </v-btn>
          </v-item>
        </v-item-group>
        <v-btn
          color="black"
          size="small"
          variant="text"
          v-tooltip:bottom="$t('label.resetZoom')"
          flat
          icon
          @click="chartController('apexcharts-reset-icon')"
        >
          <Icon name="refresh" size="22px" />
        </v-btn>
        <v-menu>
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              color="black"
              size="small"
              variant="text"
              v-tooltip:bottom="$t('label.download')"
              flat
              icon
            >
              <Icon name="file-download" size="22px" />
            </v-btn>
          </template>
          <v-card color="white" rounded="xl">
            <v-list color="black" class="pa-2 bg-transparent">
              <v-list-item
                rounded="pill"
                link
                @click="chartController('exportSVG')"
              >
                <v-list-item-title>
                  {{ $t('label.download') }} SVG
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                rounded="pill"
                link
                @click="chartController('exportPNG')"
              >
                <v-list-item-title>
                  {{ $t('label.download') }} PNG
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                rounded="pill"
                link
                @click="chartController('exportCSV')"
              >
                <v-list-item-title>
                  {{ $t('label.download') }} CSV
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
      <ClientOnly>
        <apexchart
          ref="chart"
          class="chart-customized full-width-area-chart hide-apexchart-toolbar"
          :options="chartOptions"
          :series="chartSeries"
        />
      </ClientOnly>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { VDateInput } from 'vuetify/labs/VDateInput'

interface SeriesItem {
  name: string
  data: number[]
}

interface Props {
  chartSeries: SeriesItem[]
}

interface DateFilter {
  title: string
  clickAction: string
}

const props = defineProps<Props>()
const { locales } = useAppConfig()
const { locale } = useI18n()

const currentLocale = computed<string>(() => {
  return (
    (locales as Record<string, { iso: string }>)[locale.value]?.iso || 'en-US'
  )
})

const range = ref<Date[]>([])
const chart = ref<any>(null)
const chartOptions = ref({
  chart: {
    fontFamily: 'Roboto, sans-serif',
    type: 'area',
    animations: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  yaxis: {
    labels: {
      formatter: function (val: number) {
        return new Intl.NumberFormat(currentLocale.value, {
          notation: 'compact',
          maximumFractionDigits: 1,
        }).format(val)
      },
    },
  },
  xaxis: {
    type: 'datetime',
    categories: [
      '2024-08-01T00:00:00.000Z',
      '2024-08-02T01:30:00.000Z',
      '2024-08-03T02:30:00.000Z',
      '2024-08-04T03:30:00.000Z',
      '2024-08-05T04:30:00.000Z',
      '2024-08-06T05:30:00.000Z',
      '2024-08-07T06:30:00.000Z',
    ],
    labels: {
      formatter: function (value: string, timestamp: number) {
        const date = new Date(timestamp)
        const dateRangeType = (): string => {
          const start = new Date(range.value[0])
          const end = new Date(range.value[range.value.length - 1])
          const diffInDays =
            (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)

          if (diffInDays <= 1) {
            return 'day'
          } else if (diffInDays <= 7) {
            return 'week'
          } else if (
            start.getMonth() === end.getMonth() &&
            start.getFullYear() === end.getFullYear()
          ) {
            return 'month'
          } else if (start.getFullYear() === end.getFullYear()) {
            return 'year'
          } else {
            return 'custom'
          }
        }

        if (dateRangeType() === 'day') {
          return date.toLocaleDateString(currentLocale.value, {
            weekday: 'short',
          })
        } else if (dateRangeType() === 'week') {
          return date.toLocaleDateString(currentLocale.value, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })
        } else if (dateRangeType() === 'month') {
          return date.toLocaleDateString(currentLocale.value, {
            month: 'short',
            day: 'numeric',
          })
        } else if (dateRangeType() === 'year') {
          return date.toLocaleDateString(currentLocale.value, {
            month: 'short',
          })
        } else {
          return date.toLocaleDateString()
        }
      },
    },
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm',
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    offsetX: -10,
  },
})

const dateFilters = ref<DateFilter[][]>([
  [
    {
      title: 'label.today',
      clickAction: 'today',
    },
    {
      title: 'text.thisWeekMonToToday',
      clickAction: 'thisWeekMonToToday',
    },
    {
      title: 'text.lastWeekMonToFri',
      clickAction: 'lastWeekMonToFri',
    },
    {
      title: 'text.last7days',
      clickAction: 'last7days',
    },
    {
      title: 'label.thisMonth',
      clickAction: 'thisMonth',
    },
    {
      title: 'label.lastMonth',
      clickAction: 'lastMonth',
    },
  ],
  [
    {
      title: 'label.yesterday',
      clickAction: 'yesterday',
    },
    {
      title: 'text.thisWeekSunToToday',
      clickAction: 'thisWeekSunToToday',
    },
    {
      title: 'text.lastWeekSunToSat',
      clickAction: 'lastWeekSunToSat',
    },
    {
      title: 'text.last14days',
      clickAction: 'last14days',
    },
    {
      title: 'text.last30days',
      clickAction: 'last30days',
    },
    {
      title: 'label.thisYear',
      clickAction: 'thisYear',
    },
    {
      title: 'label.lastYear',
      clickAction: 'lastYear',
    },
  ],
])

onMounted(() => {
  const today = new Date()
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1)
  updateDateRange(firstDayOfYear, today)
})

const updateDateRange = (startDate: Date, endDate: Date) => {
  range.value = []
  const current = new Date(startDate)
  while (current <= endDate) {
    range.value.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }
}

const selectDateRange = async (type: string) => {
  const today = new Date()

  switch (type) {
    case 'today':
      range.value = [today]
      break
    case 'yesterday':
      const yesterday = new Date(today)
      yesterday.setDate(today.getDate() - 1)
      range.value = [yesterday]
      break
    case 'thisWeekMonToToday':
      updateRangeForWeek(today, 1)
      break
    case 'lastWeekMonToFri':
      updateRangeForLastWeek(today)
      break
    case 'thisWeekSunToToday':
      updateRangeForWeek(today, 0)
      break
    case 'last7days':
      updateDateRangeForDays(today, 6)
      break
    case 'last14days':
      updateDateRangeForDays(today, 13)
      break
    case 'lastWeekSunToSat':
      updateRangeForWeek(today, 0, 7)
      break
    case 'thisMonth':
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      updateDateRange(firstDayOfMonth, today)
      break
    case 'lastMonth':
      const firstDayOfLastMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
      )
      const lastDayOfLastMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      )
      updateDateRange(firstDayOfLastMonth, lastDayOfLastMonth)
      break
    case 'last30days':
      updateDateRangeForDays(today, 29)
      break
    case 'thisYear':
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1)
      updateDateRange(firstDayOfYear, today)
      break
    case 'lastYear':
      const firstDayOfLastYear = new Date(today.getFullYear() - 1, 0, 1)
      const lastDayOfLastYear = new Date(today.getFullYear() - 1, 11, 31)
      updateDateRange(firstDayOfLastYear, lastDayOfLastYear)
      break
  }

  chart.value.updateSeries(props.chartSeries)
}

const updateRangeForWeek = (
  currentDate: Date,
  startDay: number,
  offset = 0
) => {
  const dayOfWeek = currentDate.getDay()
  const startOfWeek = new Date(currentDate)
  startOfWeek.setDate(
    currentDate.getDate() -
      (dayOfWeek === 0 ? 7 - startDay : dayOfWeek - startDay) -
      offset
  )
  updateDateRange(startOfWeek, currentDate)
}

const updateRangeForLastWeek = (currentDate: Date) => {
  const lastFriday = new Date(currentDate)
  lastFriday.setDate(
    currentDate.getDate() -
      (currentDate.getDay() === 0 ? 2 : currentDate.getDay() + 1)
  )
  const lastMonday = new Date(lastFriday)
  lastMonday.setDate(lastFriday.getDate() - 4)
  updateDateRange(lastMonday, lastFriday)
}

const updateDateRangeForDays = (currentDate: Date, days: number) => {
  const startDate = new Date(currentDate)
  startDate.setDate(currentDate.getDate() - days)
  updateDateRange(startDate, currentDate)
}

const chartController = (className: string) => {
  const elements = document.getElementsByClassName(className)
  if (elements.length > 0) {
    ;(elements[0] as HTMLElement).click()
  }
}
</script>

<style lang="sass" scoped>
@media only screen and (max-width: 599px)
  .date-range-input
    width: 100%

    .v-input
      max-width: 100% !important

  .filter-menu
    width: 100%

@media only screen and (min-width: 600px)
  .date-range-input
    width: 260px

  .filter-menu
    width: 500px
</style>
