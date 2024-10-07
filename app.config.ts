export default defineAppConfig({
  appName: 'Aplio',
  logos: {
    light: '',
    dark: '',
  },
  defaultConfig: {
    theme: 'light',
    locale: 'en',
  },
  copyrightYear: 2024,
  themes: {
    light: {
      dark: false,
      colors: {
        primary: '#10A4B0',
        success: '#3DE261',
        info: '#04AAF7',
        warning: '#FFB521',
        error: '#FF342D',
        black: '#151515',
        white: '#FFFFFF',
        thinGrey: '#FAFAFA',
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: '#10A4B0',
        success: '#3DE261',
        info: '#04AAF7',
        warning: '#FFB521',
        error: '#FF342D',
        black: '#EAEAEA',
        white: '#151515',
        thinGrey: '#191919',
      },
    },
  },
  locales: {
    ar: {
      code: 'ar',
      name: 'عربي',
      country: 'Saudi Arabia',
      iso: 'ar-SA',
      file: 'ar-SA.json',
      default: false,
      active: true,
    },
    de: {
      code: 'de',
      name: 'Deutsch',
      country: 'Germany',
      iso: 'de-DE',
      file: 'de-DE.json',
      default: false,
      active: true,
    },
    en: {
      code: 'en',
      name: 'English',
      country: 'United States',
      iso: 'en-US',
      file: 'en-US.json',
      default: true,
      active: true,
    },
    es: {
      code: 'es',
      name: 'Española',
      country: 'Spain',
      iso: 'es-ES',
      file: 'es-ES.json',
      default: false,
      active: true,
    },
    fr: {
      code: 'fr',
      name: 'Français',
      country: 'France',
      iso: 'fr-FR',
      file: 'fr-FR.json',
      default: false,
      active: false,
    },
    pt: {
      code: 'pt',
      name: 'Português',
      country: 'Portugal',
      iso: 'pt-PT',
      file: 'pt-PT.json',
      default: false,
      active: true,
    },
  },
  nuxtIcon: {
    size: '24px',
    class: 'nuxt-icon',
    aliases: {
      menu: 'solar:hamburger-menu-outline',
      search: 'solar:magnifer-linear',
      bell: 'solar:bell-outline',
      sun: 'solar:sun-2-outline',
      moon: 'solar:moon-outline',
      dot: 'ph:dot-outline-fill',
      power: 'f7:power',
      settings: 'solar:settings-outline',
      refresh: 'solar:refresh-outline',
      database: 'solar:database-outline',
      global: 'solar:global-outline',
      checklist: 'solar:checklist-outline',
      camera: 'solar:camera-outline',
      eye: 'heroicons:eye',
      plus: 'material-symbols:add-rounded',
      copy: 'solar:copy-outline',
      trash: 'solar:trash-bin-trash-outline',
      close: 'mingcute:close-line',
      'close-small': 'ion:ios-close',
      'user-circle': 'solar:user-circle-outline',
      'key-minimalistic': 'solar:key-minimalistic-outline',
      'arrow-long-left': 'heroicons:arrow-long-left',
      'arrow-long-right': 'heroicons:arrow-long-right',
      'lock-password': 'solar:lock-password-outline',
      'inbox-unread': 'solar:inbox-unread-outline',
      'menu-dots': 'solar:menu-dots-bold',
      'circle-small': 'fluent:circle-small-20-regular',
      'widget-dashboard': 'solar:widget-5-outline',
      'users-group': 'solar:users-group-rounded-outline',
      'laptop-minimalistic': 'solar:laptop-minimalistic-outline',
      'wallet-money': 'solar:wallet-money-outline',
      'file-text': 'solar:file-text-outline',
      'inbox-line': 'solar:inbox-line-outline',
      'clipboard-check': 'solar:clipboard-check-outline',
      'question-circle': 'bi:question-circle',
      'siren-rounded': 'solar:siren-rounded-outline',
      'globe-warning': 'fluent:globe-warning-20-regular',
      'plug-xmark': 'iconoir:ev-plug-xmark',
      'plug-charging': 'iconoir:ev-plug-charging',
      'eye-slash': 'heroicons:eye-slash',
      'chevron-down': 'heroicons:chevron-down-20-solid',
      'chevron-right': 'heroicons:chevron-right-20-solid',
      'chevron-left': 'heroicons:chevron-left-20-solid',
      'sort-vertical': 'solar:sort-vertical-outline',
      'sort-vertical-duotone': 'solar:sort-vertical-line-duotone',
      'radio-marked': 'mdi:radiobox-marked',
      'radio-blank': 'mdi:radiobox-blank',
      'shield-keyhole': 'solar:shield-keyhole-minimalistic-outline',
      'globe-showing': 'fluent-emoji-flat:globe-showing-americas',
      'trending-up': 'mynaui:trending-up',
      'trending-down': 'mynaui:trending-down',
      calendar: 'solar:calendar-outline',
      filter: 'mage:filter',
      user: 'solar:user-outline',
      'magnifer-zoom-in': 'solar:magnifer-zoom-in-outline',
      'magnifer-zoom-out': 'solar:magnifer-zoom-out-outline',
      'hand-raised': 'heroicons:hand-raised',
      'file-download': 'solar:file-download-outline',
      'checkbox-checked': 'mdi:checkbox-marked',
      'checkbox-unchecked': 'mdi:checkbox-blank-outline',
      'checkbox-indeterminate': 'mdi:checkbox-intermediate',
      'streets-map': 'solar:streets-map-point-outline',
      smartphone: 'solar:smartphone-outline',
      laptop: 'solar:laptop-minimalistic-outline',
      tablet: 'solar:tablet-outline',
      'monitor-smartphone': 'solar:monitor-smartphone-outline',
      'file-send': 'solar:file-send-outline',
      'undo-left': 'solar:undo-left-round-outline',
      'undo-right': 'solar:undo-right-round-outline',
      'heading-1': 'mynaui:heading-one',
      'heading-2': 'mynaui:heading-two',
      'heading-3': 'mynaui:heading-three',
      'heading-4': 'mynaui:heading-four',
      'heading-5': 'mynaui:heading-five',
      'heading-6': 'mynaui:heading-six',
      'color-palette': 'fluent:color-20-regular',
      'chevron-up-down': 'heroicons:chevron-up-down-solid',
      'format-bold': 'material-symbols-light:format-bold-rounded',
      youtube: 'hugeicons:youtube',
      image: 'solar:gallery-outline',
      superscript: 'ph:text-superscript',
      subscript: 'ph:text-subscript',
      code: 'solar:code-outline',
      'text-align-right': 'ph:text-align-right',
      'text-align-center': 'ph:text-align-center',
      'text-align-left': 'ph:text-align-left',
      'link-minimalistic': 'solar:link-minimalistic-2-outline',
      quote: 'ph:quotes',
      strikethrough: 'ph:text-strikethrough',
      'list-numbers': 'ph:list-numbers-light',
      'list-bullets': 'ph:list-bullets',
      'text-underline': 'ph:text-underline',
      'text-italic': 'ph:text-italic',
      highlighter: 'ph:highlighter-light',
      'arrow-up': 'solar:arrow-up-linear',
      'arrow-down': 'solar:arrow-down-linear',
      help: 'solar:help-outline',
    },
  },
})
