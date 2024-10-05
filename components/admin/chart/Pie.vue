<template>
  <v-card color="white" variant="flat" rounded="xl" class="fill-height" border>
    <div class="pa-6">
      <h3 class="text-body-1 font-weight-bold">
        {{ $t('visitsByContinents.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('visitsByContinents.subtitle') }}
      </p>
    </div>
    <v-divider />
    <div class="h-auto h-sm-75 d-flex align-center justify-center pa-3 pa-sm-6">
      <div class="pie-chart my-16 my-md-0">
        <ClientOnly>
          <apexchart
            class="customized-pie-chart-labels"
            :options="chartOptions"
            :series="chartSeries"
          />
        </ClientOnly>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
interface Props {
  chartSeries: number[]
}

defineProps<Props>()
const { locales } = useAppConfig()
const { locale } = useI18n()
const { t } = useI18n()

const currentLocale = computed<string>(() => {
  return (
    (locales as Record<string, { iso: string }>)[locale.value]?.iso || 'en-US'
  )
})

const chartOptions = ref({
  chart: {
    fontFamily: 'Roboto, sans-serif',
    width: 380,
    type: 'donut',
    animations: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: true,
    formatter: (val: number) => {
      return `${new Intl.NumberFormat(currentLocale.value, {
        notation: 'compact',
        maximumFractionDigits: 1,
      }).format(val)}%`
    },
  },
  labels: [
    `${t('continent.asia')}`,
    `${t('continent.africa')}`,
    `${t('continent.europe')}`,
    `${t('continent.northAmerica')}`,
    `${t('continent.southAmerica')}`,
    `${t('continent.australia')}`,
  ],
  tooltip: {
    y: {
      formatter: (val: number) => {
        return new Intl.NumberFormat(currentLocale.value, {
          notation: 'compact',
          maximumFractionDigits: 1,
        }).format(val)
      },
    },
  },
  responsive: [
    {
      breakpoint: 599,
      options: {
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        legend: {
          position: 'bottom',
          verticalAlign: 'center',
        },
      },
    },
  ],
})
</script>

<style lang="sass" scoped>
@media only screen and (max-width: 599px)
  .pie-chart
    width: 100%

@media only screen and (min-width: 600px)
  .pie-chart
    width: 80%

@media only screen and (min-width: 960px)
  .pie-chart
    width: 85%
</style>
