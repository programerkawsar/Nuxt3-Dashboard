<template>
  <v-menu :width="260">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        color="black"
        variant="text"
        v-tooltip:bottom="$t('label.switchLanguage')"
        icon
      >
        <Icon :name="`circle-flags:${currentLocale}`" />
      </v-btn>
    </template>
    <v-card color="white" rounded="xl">
      <v-list
        base-color="black"
        color="primary"
        lines="two"
        class="pa-2 bg-transparent"
      >
        <v-list-item
          v-for="(item, idx) in languages"
          :key="idx"
          rounded="xl"
          :active="currentLocale === getCountryCode(item.iso)"
          link
          @click="switchLanguage(item.code)"
        >
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
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script lang="ts" setup>
import { useLocale } from 'vuetify'

interface Locale {
  code: string
  name: string
  country: string
  iso: string
}

const { locales } = useAppConfig()
const { locale, setLocale } = useI18n()
const { current } = useLocale()

const languages = computed<Locale[]>(() => Object.values(locales) as Locale[])
const currentLocale = computed<string>(() => {
  const iso = (locales as Record<string, Locale>)[locale.value]?.iso || 'en-US'
  return getCountryCode(iso)
})

const getCountryCode = (iso: string): string => {
  const [_, countryCode] = iso.split('-')
  return countryCode ? countryCode.toLowerCase() : 'us'
}

const switchLanguage = (code: string) => {
  setLocale(code)
  current.value = code
}
</script>
