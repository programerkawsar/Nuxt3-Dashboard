<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="1000">
    <v-row>
      <v-col
        v-for="(item, idx) in chartItems"
        :key="idx"
        cols="12"
        sm="6"
        md="3"
      >
        <AdminChartItem :data="item" />
      </v-col>
      <v-col cols="12" md="12">
        <AdminChartArea :chartSeries="areaSeries" />
      </v-col>
      <v-col cols="12" md="7">
        <AdminChartPie :chartSeries="pieSeries" />
      </v-col>
      <v-col cols="12" md="5">
        <AdminVisitsByCountry />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts" setup>
interface IChart {
  title: string
  value: number
  percentage?: {
    type: 'increase' | 'decrease'
    value: number
  }
  type?: string
}

definePageMeta({
  layout: 'admin',
})

const { t } = useI18n()
const { appName } = useAppConfig()

useHead({
  title: t('page.userDashboard.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const chartItems = ref<IChart[]>([
  {
    title: t('label.registeredUsers'),
    value: 8637,
    percentage: {
      type: 'increase',
      value: 6.4,
    },
  },
  {
    title: t('label.onlineUsers'),
    value: 1007,
    percentage: {
      type: 'decrease',
      value: 1.9,
    },
  },
  {
    title: t('label.visitorsToday'),
    value: 12,
    percentage: {
      type: 'increase',
      value: 5.0,
    },
  },
  {
    title: t('label.bounceRate'),
    value: 66,
    type: 'bounceRate',
  },
])

const areaSeries = ref<{ name: string; data: number[] }[]>([
  {
    name: t('label.registeredUsers'),
    data: [31, 40, 28, 51, 42, 109, 10000],
  },
  {
    name: t('label.onlineUsers'),
    data: [11, 32, 45, 32, 34, 52, 41],
  },
  {
    name: t('label.visitors'),
    data: [5, 14, 18, 20, 6, 27, 45],
  },
])

const pieSeries = ref<number[]>([44, 55, 41, 17, 15, 7])
</script>
