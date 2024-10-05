import { useDate } from 'vuetify'

export default (dateStr: string): string => {
  const date = useDate()
  const formatted = date.format(dateStr, 'fullDateTime')
  return formatted
}
