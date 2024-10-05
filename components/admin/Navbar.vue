<template>
  <v-app-bar
    class="pe-4 ps-2 border-b"
    color="white"
    :height="80"
    :order="1"
    flat
  >
    <template #prepend>
      <v-btn
        color="black"
        variant="text"
        v-tooltip:bottom="$t('label.toggleMenu')"
        icon
        @click="adminStore.toggleSidebar()"
      >
        <Icon name="menu" size="28px" />
      </v-btn>
      <AdminNavbarSearchMenu />
    </template>
    <template #append>
      <AdminNavbarLanguageMenu />
      <AdminNavbarNotificationMenu />
      <v-btn
        color="black"
        variant="text"
        v-tooltip:bottom="$t('label.switchTheme')"
        icon
        @click="switchTheme"
      >
        <Icon :name="isDarkTheme ? 'moon' : 'sun'" />
      </v-btn>
      <AdminNavbarUserMenu />
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
const theme = useTheme()
const themeCookie = useCookie('theme')
const adminStore = useAdminStore()

const isDarkTheme = computed<boolean>(() => {
  return theme?.global?.current?.value?.dark || false
})

const switchTheme = () => {
  theme.global.name.value = isDarkTheme.value ? 'light' : 'dark'
  themeCookie.value = theme.global.name.value
}
</script>
