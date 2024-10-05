<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        color="primary"
        variant="tonal"
        :size="36"
        v-tooltip:bottom="$t('label.menu')"
        icon
      >
        <Icon name="menu-dots" size="20px" />
      </v-btn>
    </template>
    <v-card :width="120" color="white" rounded="xl">
      <v-list base-color="black" class="pa-2 bg-transparent">
        <slot name="view" />
        <v-list-item v-if="editPath" :to="editPath" rounded="xl" link>
          <v-list-item-title>{{ $t('label.edit') }}</v-list-item-title>
        </v-list-item>
        <slot name="deleteAction" />
      </v-list>
    </v-card>
  </v-menu>
</template>

<script lang="ts" setup>
defineProps<{ editPath: string | null }>()
</script>
