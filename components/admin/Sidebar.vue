<template>
  <v-navigation-drawer
    v-model="sidebar"
    color="white"
    :width="320"
    :scrim="false"
  >
    <template #prepend>
      <v-sheet
        color="transparent"
        class="d-flex align-center justify-center"
        :height="80"
      >
        <NuxtImg loading="lazy" :src="logo" />
      </v-sheet>
    </template>
    <v-list
      class="px-6 py-0"
      base-color="black"
      color="primary"
      bg-color="transparent"
    >
      <template v-for="(item, idx) in links" :key="idx">
        <v-list-group
          v-if="item.children && item.children.length > 0"
          class="expand-icon--black"
          fluid
        >
          <template #activator="{ props }">
            <v-list-item v-bind="props" rounded="xl">
              <template #prepend>
                <Icon :name="item.icon" class="me-4" />
              </template>
              <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
            </v-list-item>
          </template>
          <div class="ms-8">
            <template
              v-for="(childItem, childIdx) in item.children"
              :key="childIdx"
            >
              <v-list-item rounded="xl" :to="localePath(`${childItem.href}`)">
                <template #prepend>
                  <Icon name="circle-small" class="me-3" />
                </template>
                <v-list-item-title>{{ $t(childItem.title) }}</v-list-item-title>
                <template #append>
                  <v-badge
                    v-if="childItem.count && childItem.count > 0"
                    color="primary"
                    :content="abbreviateNumber(childItem.count)"
                    inline
                  />
                </template>
              </v-list-item>
            </template>
          </div>
        </v-list-group>
        <v-list-item rounded="xl" :to="localePath(`${item.href}`)" v-else>
          <template #prepend>
            <Icon :name="item.icon" class="me-4" />
          </template>
          <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
          <template #append>
            <v-badge
              v-if="item.count && item.count > 0"
              color="primary"
              :content="abbreviateNumber(item.count)"
              inline
            />
          </template>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
interface Link {
  icon: string
  title: string
  href?: string
  children?: Array<{ title: string; href: string; count?: number }>
  count?: number
}

const localePath = useLocalePath()
const theme = useTheme()
const adminStore = useAdminStore()
const sidebar = ref<boolean>(true)

const isDarkTheme = computed<boolean>(() => {
  return theme?.global?.current?.value?.dark || false
})

const logo = computed<string>(() => {
  return isDarkTheme.value ? '/images/logo-dark.svg' : '/images/logo-light.svg'
})

const links = computed<Link[]>(() => adminStore.links.sidebar || [])
const sidebarState = computed<boolean>(() => adminStore.sidebar)

watch(sidebarState, () => (sidebar.value = !sidebar.value))
</script>
