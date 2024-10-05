<template>
  <v-menu :width="400" :close-on-content-click="false">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        color="black"
        variant="text"
        v-tooltip:bottom="$t('label.searchLinks')"
        icon
      >
        <Icon name="search" />
      </v-btn>
    </template>
    <v-card color="white" rounded="xl">
      <v-toolbar color="transparent" class="pa-6">
        <v-text-field
          v-model="search"
          base-color="black"
          color="black"
          variant="outlined"
          :label="$t('text.search')"
          rounded="pill"
          density="comfortable"
          :loading="false"
          single-line
          hide-details
        >
          <template #prepend-inner>
            <Icon name="search" size="20px" />
          </template>
        </v-text-field>
      </v-toolbar>
      <v-divider />
      <v-list
        base-color="black"
        color="primary"
        lines="two"
        class="pa-0 bg-transparent"
      >
        <v-sheet v-if="links.length === 0" color="transparent" :height="500">
          <AdminEmpty class="mt-n12" />
        </v-sheet>
        <v-sheet
          color="transparent"
          class="overflow-y-auto"
          :height="500"
          v-else
        >
          <v-list
            class="pa-2 bg-transparent"
            base-color="black"
            color="primary"
            lines="two"
          >
            <template v-for="(item, idx) in links" :key="idx">
              <v-list-item :to="localePath(`${item.href}`)" rounded="xl">
                <v-list-item-title> {{ $t(item.title) }} </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.href }}
                </v-list-item-subtitle>
                <template #append>
                  <Icon name="arrow-long-right" />
                </template>
              </v-list-item>
            </template>
          </v-list>
        </v-sheet>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script lang="ts" setup>
type Link = {
  icon?: string
  title: string
  href?: string
  children?: Link[]
  subtitle?: string
  count?: number
}

type Links = {
  sidebar: Link[]
  account: Link[]
}

const localePath = useLocalePath()
const adminStore = useAdminStore()
const search = ref<string>('')
const links = ref<Link[]>([])
const linksState = computed<Links>(() => adminStore.links || {})

onMounted(() => {
  links.value = flattenLinks(linksState.value)
})

watch(search, (searchTerm: string) => {
  const result = searchLinks(searchTerm)
  links.value = result
})

const flattenLinks = (obj: Links): Link[] => {
  const result: Link[] = []

  const recursiveFlatten = (arr: Link[]) => {
    arr.forEach(({ children, ...rest }) => {
      if (rest.href) result.push(rest)
      if (children) {
        recursiveFlatten(children)
      }
    })
  }

  if (obj.sidebar) recursiveFlatten(obj.sidebar)
  if (obj.account) recursiveFlatten(obj.account)

  return result
}

const searchLinks = (searchTerm: string): Link[] => {
  const result = flattenLinks(linksState.value).filter(
    (link) =>
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.href?.toLowerCase().includes(searchTerm)
  )

  return result
}
</script>
