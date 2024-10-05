export default (date: Date | string): string => {
  const { t } = useI18n()
  const now = new Date()
  const past = new Date(date)
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  if (seconds < 60) return t('label.justNow')

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  }

  for (const [unit, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value)
    if (interval >= 1) {
      const translationKey =
        interval === 1 ? `text.${unit}Ago` : `text.${unit}sAgo`
      return t(translationKey, { count: interval })
    }
  }

  return t('text.secondsAgo', { count: seconds })
}
