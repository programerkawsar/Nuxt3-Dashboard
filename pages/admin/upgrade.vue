<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.upgradeSoftware.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.upgradeSoftware.subtitle') }}
      </p>
    </div>
    <v-card
      color="white"
      rounded="xl"
      class="pa-8 text-center mb-12"
      flat
      border
    >
      <h3 class="text-black text-body-1 font-weight-bold">
        {{ $t('label.currentlyInstalled') }}
        <span class="text-primary">v1.06.02</span>
      </h3>
      <p class="text-body-2 text-medium-emphasis mt-1">
        {{ $t('upgradeSoftware.line1') }}
        <nuxt-link class="text-lowercase text-medium-emphasis" to="/">
          {{ $t('label.documentation') }}
        </nuxt-link>
        {{ $t('upgradeSoftware.line2') }}
      </p>
      <v-btn
        color="primary"
        rounded="pill"
        variant="flat"
        size="large"
        class="mt-6 text-body-2"
      >
        {{ $t('label.checkUpdate') }}
      </v-btn>
    </v-card>
    <v-infinite-scroll
      class="loading-section-resized"
      :items="list"
      :onLoad="loadMore"
    >
      <ul v-for="(item, idx) in list" :key="idx" class="upgrade-list">
        <v-list-subheader class="mb-4 ms-1">
          {{ $t('label.version') }} {{ item.version }} - {{ item.date }}
        </v-list-subheader>
        <li
          v-for="(childItem, childIdx) in item.list"
          :key="childIdx"
          class="d-flex"
        >
          <div class="me-4">
            <v-chip
              :color="getChipColor(childItem.type)"
              size="small"
              class="text-uppercase text-caption font-weight-bold"
            >
              {{ childItem.type }}
            </v-chip>
          </div>
          <p class="text-body-2 text-black mt-1">
            {{ childItem.text }}
          </p>
        </li>
      </ul>
      <template #loading="{ props }">
        <v-skeleton-loader
          v-bind="props"
          class="w-100 bg-transparent"
          type="list-item-two-line"
        />
      </template>
    </v-infinite-scroll>
  </v-sheet>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
})

const { t } = useI18n()
const { appName } = useAppConfig()

useHead({
  title: t('page.upgradeSoftware.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const list = ref([
  {
    version: '6.2.0',
    date: '24 Jun, 2024',
    list: [
      {
        type: 'new',
        text: 'Advanced User & Tool Analytics',
      },
      {
        type: 'new',
        text: 'Detailed Summary - Plans & Pricing Page',
      },
      {
        type: 'fix',
        text: 'Admin Dashboard Issues and Typo',
      },
      {
        type: 'new',
        text: 'Implemented user deletion requests',
      },
      {
        type: 'update',
        text: `Better understanding of origin language in 'Improve Writing' option.`,
      },
      {
        type: 'new',
        text: 'Improved WordPress Functionalities - Users can now schedule posts for future publication and utilize many editor features. Additionally, users can upload images to the WordPress gallery.',
      },
      {
        type: 'fix',
        text: 'Deprecated gpt-4-vision-preview converted to gpt-4o for vision',
      },
      {
        type: 'fix',
        text: 'Margin and Name issues in downloaded documents.',
      },
      {
        type: 'fix',
        text: 'Improved Chat UI when rendering Markdown on mobile.',
      },
      {
        type: 'new',
        text: 'Menu Builder (paid extension).',
      },
    ],
  },
  {
    version: '6.2.0',
    date: '24 Jun, 2024',
    list: [
      {
        type: 'new',
        text: 'Maintenance Extension',
      },
      {
        type: 'new',
        text: 'User Dashboard Tools (Magic Assistant, Shortcuts, Team Invitation)',
      },
      {
        type: 'fix',
        text: 'Margin and Name issues in downloaded documents.',
      },
      {
        type: 'update',
        text: 'Directly open plan checkout if only one gateway is active.',
      },
    ],
  },
  {
    version: '6.2.0',
    date: '24 Jun, 2024',
    list: [
      {
        type: 'update',
        text: 'AI Article Wizard now supports changing image engine (Stable Diffusion, DALL-E, Pexels, and Pixabay).',
      },
      {
        type: 'new',
        text: 'Pexels and Pixabay for AI Article Wizard images engine.',
      },
      {
        type: 'new',
        text: 'User Dashboard Tools (Magic Assistant, Shortcuts, Team Invitation)',
      },
      {
        type: 'fix',
        text: 'Resolved issue with Stable Diffusion 3 errors not displaying.',
      },
    ],
  },
])

const getChipColor = (type: string) => {
  switch (type) {
    case 'new':
      return 'success'
    case 'fix':
      return 'error'
    case 'update':
      return 'warning'
    default:
      return 'primary'
  }
}

const loadMore = () => {}
</script>

<style lang="sass" scoped>
.upgrade-list
  margin: 0
  padding: 0
  margin-bottom: 48px
  list-style: none

  li
    margin-bottom: 16px

  li:last-child
    margin-bottom: 0

.upgrade-list:last-child
  margin-bottom: 0
</style>
