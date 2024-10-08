<template>
  <div v-if="data.self" class="d-flex align-end justify-end pa-3">
    <div class="w-100 me-4 d-flex align-end flex-column">
      <div
        class="chat-text bg-primary pa-3 rounded-xl rounded-be-lg text-body-2 text-end"
        style="color: white"
      >
        {{ data.message }}
      </div>
      <span class="text-body-2 text-black d-flex align-center justify-end mt-1">
        <span class="text-medium-emphasis">
          {{ formatDate(data.date, 'keyboardDateTime12h') }}
        </span>
        <Icon
          size="16px"
          name="dot"
          class="text-medium-emphasis mx-1 d-none d-sm-flex"
        />
        <v-sheet
          color="transparent"
          :max-width="100"
          class="text-truncate d-none d-sm-flex"
        >
          {{ data.name }}
        </v-sheet>
      </span>
    </div>
    <v-avatar color="primary">
      <v-img
        v-if="data.avatar"
        :src="data.avatar"
        :lazy-src="data.avatar"
        :alt="data.name"
      />
      <p class="text-body-2 text-uppercase text-white font-weight-bold" v-else>
        {{ getFirstLetters(data.name, 2) }}
      </p>
    </v-avatar>
  </div>
  <div class="d-flex align-end justify-start pa-3" v-else>
    <v-avatar color="primary">
      <v-img
        v-if="data.avatar"
        :src="data.avatar"
        :lazy-src="data.avatar"
        :alt="data.name"
      />
      <p class="text-body-2 text-uppercase text-white font-weight-bold" v-else>
        {{ getFirstLetters(data.name, 2) }}
      </p>
    </v-avatar>
    <div class="w-100 ms-4 d-flex align-start flex-column">
      <div
        class="chat-text bg-greyLighten3 pa-3 rounded-xl rounded-bs-lg text-body-2 text-black"
      >
        {{ data.message }}
      </div>
      <span
        class="text-body-2 text-black d-flex align-center justify-start mt-1"
      >
        <v-sheet
          color="transparent"
          :max-width="100"
          class="text-truncate d-none d-sm-flex"
        >
          {{ data.name }}
        </v-sheet>
        <Icon
          size="16px"
          name="dot"
          class="text-medium-emphasis mx-1 d-none d-sm-flex"
        />
        <span class="text-medium-emphasis">
          {{ formatDate(data.date, 'keyboardDateTime12h') }}
        </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  data: {
    message: string
    avatar: string
    name: string
    date: string
    self: boolean
  }
}

defineProps<Props>()
</script>

<style lang="sass" scoped>
.chat-text
  max-width: 50%

@media only screen and (max-width: 599px)
  .chat-text
    max-width: 90%
</style>
