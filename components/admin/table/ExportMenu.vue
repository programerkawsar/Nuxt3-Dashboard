<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        color="primary"
        variant="flat"
        class="me-0 ms-2"
        v-tooltip:bottom="$t('label.download')"
        :size="36"
        icon
      >
        <Icon name="file-download" size="21px" />
      </v-btn>
    </template>
    <v-card color="white" rounded="xl">
      <v-list color="black" class="pa-2 bg-transparent">
        <v-list-item rounded="pill" link>
          <v-list-item-title> {{ $t('label.export') }} CSV </v-list-item-title>
        </v-list-item>
        <v-list-item rounded="pill" link>
          <v-list-item-title> {{ $t('label.export') }} PDF </v-list-item-title>
        </v-list-item>
        <v-list-item rounded="pill" link>
          <v-list-item-title>
            {{ $t('label.export') }} Excel
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>
