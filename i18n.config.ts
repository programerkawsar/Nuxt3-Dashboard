export default defineI18nConfig(() => {
  const { defaultConfig } = useAppConfig()

  return {
    legacy: true,
    defaultLocale: defaultConfig.locale || 'en',
    fallbackLocale: defaultConfig.locale || 'en',
  }
})
