import { useDate } from 'vuetify'

export default (dateStr: string, type: string = 'fullDateTime'): string => {
  const date = useDate()
  const formatted = date.format(dateStr, type)
  return formatted
}
