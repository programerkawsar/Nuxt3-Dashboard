<template>
  <v-list-item base-color="black" class="pa-0">
    <template #prepend>
      <div v-if="status" class="me-4">
        <v-badge
          :color="status === 'active' ? 'success' : 'error'"
          :offset-x="2"
          :offset-y="32"
          dot
        >
          <v-avatar color="primary">
            <v-img v-if="avatar" :src="avatar" :lazy-src="avatar" :alt="name" />
            <h3
              class="text-body-2 text-uppercase font-weight-bold text-white"
              v-else
            >
              {{ getFirstLetters(name, 2) }}
            </h3>
          </v-avatar>
        </v-badge>
      </div>
      <v-avatar color="primary" v-else>
        <v-img v-if="avatar" :src="avatar" :lazy-src="avatar" :alt="name" />
        <h3
          class="text-body-2 text-uppercase font-weight-bold text-white"
          v-else
        >
          {{ getFirstLetters(name, 2) }}
        </h3>
      </v-avatar>
    </template>
    <p class="text-body-2 font-weight-bold text-truncate">
      {{ name }}
    </p>
    <p class="text-body-2 text-medium-emphasis text-truncate">
      {{ email }}
    </p>
  </v-list-item>
</template>

<script lang="ts" setup>
interface Props {
  avatar: string
  name: string
  email: string
  status?: 'active' | 'inactive'
}

defineProps<Props>()
</script>
