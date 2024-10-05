<template>
  <v-dialog :max-width="500">
    <template #activator="{ props }">
      <v-list-item v-bind="props" rounded="xl" link>
        <v-list-item-title>{{ $t('label.view') }}</v-list-item-title>
      </v-list-item>
    </template>
    <template #default="{ isActive }">
      <v-card color="white" rounded="xl">
        <div class="pa-6">
          <template v-if="show === 'userData'">
            <div
              v-if="data.avatar || (data.firstName && data.lastName)"
              class="mb-6 text-center"
            >
              <v-avatar color="primary" :size="100">
                <v-img
                  v-if="data.avatar"
                  :src="data.avatar"
                  :lazy-src="data.avatar"
                  :alt="`${data.firstName} ${data.lastName}`"
                />
                <h3
                  class="text-body-2 text-uppercase font-weight-bold text-white"
                  v-else
                >
                  {{ getFirstLetters(`${data.firstName} ${data.lastName}`, 2) }}
                </h3>
              </v-avatar>
            </div>
            <v-card color="transparent" rounded="xl" flat border>
              <v-table class="bg-transparent">
                <tbody>
                  <tr v-for="(value, key) in data" :key="key">
                    <template v-if="key !== 'avatar'">
                      <td class="text-body-2 font-weight-bold text-black">
                        <v-sheet color="transparent" :min-width="100">
                          {{ formatPropertyName(key) }}:
                        </v-sheet>
                      </td>
                      <td
                        v-if="key === 'createdAt'"
                        class="text-body-2 text-black"
                      >
                        {{ timeAgo(value) }}
                        <br />
                        <span class="text-medium-emphasis">
                          {{ formatDate(value) }}
                        </span>
                      </td>
                      <td class="text-body-2 text-black" v-else>{{ value }}</td>
                    </template>
                  </tr>
                </tbody>
              </v-table>
            </v-card>
          </template>
          <template v-if="show === 'userPermission'">
            <AdminTableUserPermission :readonlyTable="true" />
          </template>
        </div>
        <v-divider />
        <v-card-actions class="pa-6">
          <v-spacer />
          <v-btn
            color="primary"
            variant="flat"
            rounded="pill"
            class="text-body-1"
            size="large"
            block
            @click="isActive.value = false"
          >
            {{ $t('label.cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
interface Props {
  show: 'userData' | 'userPermission'
}

defineProps<Props>()
const data = ref({
  avatar: 'https://i.pravatar.cc/150?img=58',
  firstName: 'Nathanael',
  lastName: 'Sharp',
  email: 'nathanael_sharp@example.com',
  role: 'user',
  country: 'Bangladesh',
  status: 'active',
  createdAt: '2024-01-24T09:24:53.000+00:00',
})

const formatPropertyName = (key: string) => {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase())
}
</script>
