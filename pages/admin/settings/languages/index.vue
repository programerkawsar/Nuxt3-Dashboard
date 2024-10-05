<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="500">
    <div class="mb-12 text-black">
      <h3 class="text-body-1 mb-1 font-weight-bold">
        {{ $t('page.languageSettings.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.languageSettings.subtitle') }}
      </p>
    </div>
    <div class="mb-8">
      <Alert
        type="info"
        :title="$t('backupWarning.alert.title')"
        :message="$t('backupWarning.alert.subtitle')"
      />
    </div>
    <div v-if="errMessage" class="mb-8 mt-n2">
      <Alert type="error" :message="errMessage" />
    </div>
    <v-list
      base-color="black"
      color="primary"
      lines="two"
      class="pa-0 bg-transparent"
    >
      <v-list-item v-for="(item, idx) in languages" :key="idx" class="pa-0">
        <template #prepend>
          <v-avatar color="transparent">
            <Icon :name="`circle-flags:${getCountryCode(item.iso)}`" />
          </v-avatar>
        </template>
        <v-list-item-title>
          {{ item.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ item.country }}
        </v-list-item-subtitle>
        <template #append>
          <v-chip v-if="item.default" color="primary" class="me-3">
            {{ $t('label.default') }}
          </v-chip>
          <v-switch
            :model-value="item.active"
            color="primary"
            class="me-1"
            hide-details
          />
          <v-menu>
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                color="black"
                variant="text"
                size="small"
                v-tooltip:bottom="$t('label.menu')"
                icon
              >
                <Icon name="menu-dots" />
              </v-btn>
            </template>
            <v-card color="white" rounded="xl">
              <v-list base-color="black" class="pa-2 bg-transparent">
                <v-list-item
                  rounded="xl"
                  :to="`/admin/settings/languages/edit/${item.code}`"
                  link
                >
                  <v-list-item-title>{{ $t('label.edit') }}</v-list-item-title>
                </v-list-item>
                <v-list-item rounded="xl" link>
                  <v-list-item-title>
                    {{ $t('label.download') }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </template>
      </v-list-item>
    </v-list>
    <v-btn
      base-color="primary"
      color="primary"
      rounded="pill"
      size="x-large"
      variant="flat"
      class="text-body-1 mt-7"
      to="/admin/settings/languages/add"
      block
    >
      <Icon name="plus" size="22px" />
      {{ $t('label.addLanguage') }}
    </v-btn>
  </v-sheet>
</template>

<script lang="ts" setup>
interface Locale {
  code: string
  name: string
  country: string
  iso: string
  default: boolean
  active: boolean
}

definePageMeta({
  layout: 'admin',
})

const { t } = useI18n()
const { appName } = useAppConfig()

useHead({
  title: t('page.languageSettings.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const { locales } = useAppConfig()
const languages = computed<Locale[]>(() => Object.values(locales) as Locale[])
const errMessage = ref<string | null>(null)

const getCountryCode = (iso: string): string => {
  const [_, countryCode] = iso.split('-')
  return countryCode ? countryCode.toLowerCase() : 'us'
}
</script>
