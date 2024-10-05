export default (bytes: number): string => {
  const { locales } = useAppConfig()
  const { locale } = useI18n()

  const currentLocale =
    (locales as Record<string, { iso: string }>)[locale.value]?.iso || 'en-US' // Fallback to 'en-US' if the locale is not found

  return new Intl.NumberFormat(currentLocale, {
    notation: 'compact',
    style: 'unit',
    unit: 'byte',
    unitDisplay: 'narrow',
  }).format(bytes)
}
