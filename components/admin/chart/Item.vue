<template>
  <v-card color="white" variant="flat" rounded="xl" class="fill-height" border>
    <div class="text-black pa-6">
      <h4 class="text-body-2">{{ data.title }}</h4>
      <h2 class="text-h4 font-weight-bold my-3">
        <span v-if="data.type === 'bounceRate'">{{ data.value }}%</span>
        <span v-else>{{ abbreviateNumber(data.value) }}</span>
      </h2>
      <p
        v-if="data.type === 'bounceRate'"
        class="text-caption text-medium-emphasis"
      >
        {{ $t('chart.item.bounceRate.subtitle') }}
      </p>
      <p class="text-caption text-medium-emphasis text-lowercase" v-else>
        <span :class="`text-${isIncrease ? 'success' : 'error'} me-1`">
          {{
            `${isIncrease ? '+' : '-'}${abbreviateNumber(
              data?.percentage?.value || 0
            )}`
          }}%
          <Icon
            :name="`trending-${isIncrease ? 'up' : 'down'}`"
            class="ms-1 mb-n1"
            size="18px"
          />
        </span>
        {{ $t('chart.item.subtitle') }}
      </p>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
interface Props {
  data: {
    title: string
    value: number
    percentage?: {
      type: string
      value: number
    }
    type?: string
  }
}

const props = defineProps<Props>()
const isIncrease = computed<boolean>(() => {
  return props?.data?.percentage?.type === 'increase'
})
</script>
