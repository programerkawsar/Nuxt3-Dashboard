<template>
  <v-menu :width="300">
    <template #activator="{ props }">
      <v-btn v-bind="props" color="black" variant="text" class="ms-1" icon>
        <v-avatar :size="38" color="primary">
          <NuxtImg
            :width="40"
            :height="40"
            preset="avatar"
            src="/images/default-avatar.jpg"
          />
        </v-avatar>
      </v-btn>
    </template>
    <v-card color="white" rounded="xl">
      <div class="pa-6">
        <v-list-item base-color="black" lines="one" class="pa-0">
          <template #prepend>
            <v-avatar :size="60" color="primary">
              <NuxtImg
                :width="80"
                :height="80"
                preset="avatar"
                src="/images/default-avatar.jpg"
              />
            </v-avatar>
          </template>
          <v-list-item-title class="font-weight-bold">
            John Deo
          </v-list-item-title>
          <v-list-item-subtitle>user@example.com</v-list-item-subtitle>
        </v-list-item>
      </div>
      <v-divider />
      <v-list
        base-color="black"
        color="primary"
        lines="two"
        class="pa-2 bg-transparent"
      >
        <v-list-item
          v-for="(item, idx) in links"
          :key="idx"
          rounded="xl"
          :to="localePath(`${item.href}`)"
          :active="isActive(localePath(`${item.href}`))"
          link
        >
          <template #prepend>
            <v-avatar
              color="primary"
              :variant="isActive(localePath(`${item.href}`)) ? 'flat' : 'tonal'"
            >
              <Icon :name="item.icon" />
            </v-avatar>
          </template>
          <v-list-item-title>
            {{ $t(item.title) }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $t(item.subtitle) }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <div class="pa-6 pt-2">
        <v-btn
          class="text-body-1"
          color="primary"
          variant="flat"
          rounded="pill"
          size="large"
          block
        >
          <Icon name="power" size="22px" class="me-2" />
          {{ $t('label.signOut') }}
        </v-btn>
      </div>
    </v-card>
  </v-menu>
</template>

<script lang="ts" setup>
interface Link {
  icon: string
  title: string
  subtitle: string
  href: string
}

const localePath = useLocalePath()
const route = useRoute()
const adminStore = useAdminStore()

const links = computed<Link[]>(() => adminStore.links.account || [])
const isActive = (path: string) => route.path === path
</script>
