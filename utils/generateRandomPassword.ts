export default (length: number = 12): string => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const digits = '0123456789'
  const specialChars = '!@#$%&*?'

  const allChars = uppercase + lowercase + digits + specialChars
  let generatedPassword = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length)
    generatedPassword += allChars[randomIndex]
  }

  return generatedPassword
}
