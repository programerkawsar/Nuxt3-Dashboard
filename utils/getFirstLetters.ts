export default (str: string, limit?: number): string => {
  const trimmedStr = str.trim()

  if (trimmedStr === '') return ''
  if (trimmedStr.length < 2) return trimmedStr.charAt(0)

  const words = trimmedStr.split(' ')
  const limitedWords = limit && limit > 0 ? words.slice(0, limit) : words
  const initials = limitedWords.map((word) => word.charAt(0))

  return initials.join('')
}
