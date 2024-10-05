import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    name: '',
    description: '',
  }),
  actions: {
    fetch() {
      /*
      const infos = await $fetch('https://api.nuxt.com/modules/pinia')

      this.name = infos.name
      this.description = infos.description
      */

      this.name = 'name'
      this.description = 'description'
    },
  },
})
