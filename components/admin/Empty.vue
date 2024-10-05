<template>
  <v-empty-state class="pa-6">
    <template #media>
      <v-avatar color="primary" variant="tonal" :size="80" class="mb-6">
        <Icon name="solar:tea-cup-outline" size="40px" />
      </v-avatar>
    </template>
    <template #title>
      <h4 class="text-black text-body-1 font-weight-bold mb-1">
        {{ $t('emptySection.title') }}
      </h4>
    </template>
    <template #text>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('emptySection.subtitle') }}
      </p>
    </template>
  </v-empty-state>
</template>
