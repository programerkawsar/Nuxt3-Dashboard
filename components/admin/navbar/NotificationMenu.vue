<template>
  <v-menu :max-width="400" :close-on-content-click="false">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        color="black"
        variant="text"
        v-tooltip:bottom="$t('label.notifications')"
        icon
      >
        <v-badge color="primary" dot>
          <Icon name="bell" />
        </v-badge>
      </v-btn>
    </template>
    <v-card color="white" rounded="xl">
      <v-toolbar color="transparent" class="ps-6 pe-2 py-1">
        <h3 class="text-body-1 font-weight-bold text-black">
          {{ $t('label.notifications') }}
        </h3>
        <v-spacer />
        <v-badge
          color="primary"
          :content="`New ${abbreviateNumber(5)}`"
          inline
        />
        <v-btn
          color="black"
          variant="text"
          v-tooltip:bottom="$t('label.readAll')"
          icon
        >
          <Icon name="inbox-unread" size="22px" />
        </v-btn>
      </v-toolbar>
      <v-divider />
      <v-list
        base-color="black"
        color="primary"
        lines="three"
        class="pa-0 bg-transparent"
      >
        <v-sheet
          v-if="notifications.length === 0"
          color="transparent"
          :height="500"
        >
          <AdminEmpty class="mt-n12" />
        </v-sheet>
        <v-infinite-scroll
          :height="500"
          :items="notifications"
          :onLoad="loadNotifications"
          v-else
        >
          <template v-for="(item, idx) in notifications" :key="idx">
            <div class="px-2">
              <v-list-subheader v-if="item.type === 'subheader'">
                {{ item.title }}
              </v-list-subheader>
              <v-list-item class="pe-2" v-else>
                <template #prepend>
                  <v-avatar color="primary" variant="tonal">
                    <NuxtImg
                      :width="40"
                      :height="40"
                      preset="avatar"
                      :src="item.avatar"
                    />
                  </v-avatar>
                </template>
                <v-list-item-title> {{ item.title }} </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.subtitle }}
                </v-list-item-subtitle>
                <div
                  :class="`d-flex align-center mt-${!item.seen ? '1' : '2'}`"
                >
                  <p class="text-caption text-medium-emphasis">
                    {{ timeAgo(item.createdAt) }}
                  </p>
                  <Icon
                    v-if="!item.seen"
                    class="text-primary"
                    name="dot"
                    size="30px"
                  />
                </div>
                <template #append>
                  <v-menu>
                    <template #activator="{ props }">
                      <v-btn
                        v-bind="props"
                        color="black"
                        variant="text"
                        size="small"
                        class="ms-1"
                        v-tooltip:bottom="$t('label.menu')"
                        icon
                      >
                        <Icon name="menu-dots" size="22px" />
                      </v-btn>
                    </template>
                    <v-card color="white" rounded="xl">
                      <v-list base-color="black" class="pa-2 bg-transparent">
                        <v-list-item rounded="xl" link>
                          <v-list-item-title>
                            {{ $t('text.markRead') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item rounded="xl" link>
                          <v-list-item-title>
                            {{ $t('label.delete') }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-menu>
                </template>
              </v-list-item>
            </div>
          </template>
          <template #empty>
            <p class="text-body-2 text-black text-center pa-2">
              {{ $t('text.noResults') }}
            </p>
          </template>
          <template #loading="{ props }">
            <v-skeleton-loader
              v-bind="props"
              class="w-100 bg-transparent"
              type="list-item-avatar-three-line"
            />
          </template>
        </v-infinite-scroll>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script lang="ts" setup>
const notifications = ref<any>([
  { type: 'subheader', title: 'Today' },
  {
    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    title: 'Brunch this weekend?',
    subtitle: `Ali Connors I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
    createdAt: '2024-07-03T13:58:18.488Z',
    seen: true,
  },
  {
    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    title: 'Summer BBQ',
    subtitle: `to Alex, Scott, Jennifer Wish I could come, but I'm out of town this weekend.`,
    createdAt: '2024-06-02T18:24:03.150+00:00',
    seen: false,
  },
  {
    avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    title: 'Oui oui',
    subtitle: `Sandra Adams Do you have Paris recommendations? Have you ever been?`,
    createdAt: '2024-06-06T18:24:03.150+00:00',
    seen: true,
  },
  { type: 'subheader', title: 'Tomorrow' },
  {
    avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    title: 'Recipe to try',
    subtitle: `Britta Holt We should eat this: Grate, Squash, Corn, and tomatillo Tacos.`,
    createdAt: '2024-06-22T18:24:03.150+00:00',
    seen: false,
  },
  {
    avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    title: 'Birthday gift',
    subtitle: `Trevor Hansen Have any ideas about what we should get Heidi for her birthday?`,
    createdAt: '2024-06-28T18:24:03.150+00:00',
    seen: true,
  },
])

const loadNotifications = ({ done }: any) => {
  setTimeout(() => {
    //notifications.value.push(...notifications.value)
  }, 3000)
  done('ok')
}
</script>
