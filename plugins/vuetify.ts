import type { IconAliases, IconProps, IconSet } from 'vuetify'
import { createVuetify } from 'vuetify'
import { Icon } from '#components'
import * as locales from 'vuetify/locale'

export default defineNuxtPlugin((nuxtApp) => {
  const localeCookie = useCookieLocale()
  const themeCookie = useCookie('theme')
  const { defaultConfig, themes } = useAppConfig()
  const iconAliases: IconAliases = {
    collapse: h(Icon, { name: 'chevron-down' }),
    expand: h(Icon, { name: 'chevron-down' }),
    search: h(Icon, { name: 'uil:twitter' }),
    complete: h(Icon, { name: 'uil:twitter' }),
    cancel: h(Icon, { name: 'uil:twitter' }),
    close: h(Icon, { name: 'uil:twitter' }),
    delete: h(Icon, { name: 'uil:twitter' }),
    clear: h(Icon, { name: 'close' }),
    success: h(Icon, { name: 'tabler:check' }),
    info: h(Icon, { name: 'uil:twitter' }),
    warning: h(Icon, { name: 'uil:twitter' }),
    error: h(Icon, { name: 'uil:twitter' }),
    prev: h(Icon, { name: 'chevron-left' }),
    next: h(Icon, { name: 'chevron-right' }),
    checkboxOn: h(Icon, { name: 'checkbox-checked' }),
    checkboxOff: h(Icon, { name: 'checkbox-unchecked' }),
    checkboxIndeterminate: h(Icon, { name: 'checkbox-indeterminate' }),
    delimiter: h(Icon, { name: 'uil:twitter' }),
    sort: h(Icon, { name: 'uil:twitter' }),
    menu: h(Icon, { name: 'uil:twitter' }),
    subgroup: h(Icon, { name: 'chevron-down' }),
    dropdown: h(Icon, { name: 'chevron-down' }),
    radioOn: h(Icon, { name: 'radio-marked' }),
    radioOff: h(Icon, { name: 'radio-blank' }),
    edit: h(Icon, { name: 'uil:twitter' }),
    ratingEmpty: h(Icon, { name: 'uil:twitter' }),
    ratingFull: h(Icon, { name: 'uil:twitter' }),
    ratingHalf: h(Icon, { name: 'uil:twitter' }),
    loading: h(Icon, { name: 'uil:twitter' }),
    first: h(Icon, { name: 'uil:twitter' }),
    last: h(Icon, { name: 'uil:twitter' }),
    unfold: h(Icon, { name: 'chevron-up-down' }),
    file: h(Icon, { name: 'uil:twitter' }),
    plus: h(Icon, { name: 'uil:twitter' }),
    minus: h(Icon, { name: 'uil:twitter' }),
    calendar: h(Icon, { name: 'calendar' }),
    sortAsc: h(Icon, { name: 'sort-vertical' }),
    sortDesc: h(Icon, { name: 'sort-vertical-duotone' }),
  }

  const customIconSet: IconSet = {
    component: (props: IconProps) => iconAliases[props.icon],
  }

  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: themeCookie.value || defaultConfig.theme || 'light',
      themes,
    },
    icons: {
      defaultSet: 'custom',
      aliases: iconAliases,
      sets: {
        customIconSet,
      },
    },
    defaults: {
      VTooltip: {
        contentClass: 'bg-black text-white rounded-xl',
      },
    },
    locale: {
      locale: localeCookie.value || defaultConfig.locale || 'en',
      fallback: defaultConfig.locale || 'en',
      messages: locales,
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
