<template>
  <v-app>
    <AdminSidebar />
    <AdminNavbar />
    <v-main>
      <v-sheet color="white" min-height="100vh" class="pa-6 pa-md-12">
        <slot />
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup></script>
