<template>
  <v-divider />
  <div class="d-block d-sm-flex align-center px-6 py-5">
    <div class="d-flex align-center justify-center">
      <p class="text-black text-body-2 me-2">{{ $t('text.itemsPerPage') }}:</p>
      <v-sheet :width="80" color="transparent">
        <v-select
          v-model="itemsPerPage"
          :label="$t('select.placeholder')"
          color="black"
          base-color="black"
          :items="listOfPerPages"
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
    </div>
    <v-spacer />
    <div class="d-flex align-center justify-center mt-3 mt-sm-0">
      <p class="text-black text-body-2 me-2 text-lowercase">
        1-{{ itemsPerPage }} {{ $t('label.of') }} {{ totalItems }}
      </p>
      <v-pagination
        class="pagination--customized"
        active-color="primary"
        color="black"
        density="compact"
        rounded="circle"
        :size="36"
        :total-visible="5"
        :length="totalPages"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  totalItems: number
}

const props = defineProps<Props>()
const { t } = useI18n()
const listOfPerPages = ref<(number | string)[]>([
  5,
  15,
  25,
  50,
  100,
  t('label.all'),
])
const itemsPerPage = ref<number>(5)
const totalPages = computed(() =>
  Math.ceil(props.totalItems / itemsPerPage.value)
)
</script>
