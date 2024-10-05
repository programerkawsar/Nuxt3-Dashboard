import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/script-setup-no-uses-vars': 'off',
    semi: ['error', 'off'],
  },
})
