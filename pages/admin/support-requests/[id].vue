<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="1000">
    <div class="mb-6 mb-md-12 text-black">
      <h3 class="text-body-1 font-weight-bold">
        {{ $t('page.provideResponse.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.provideResponse.subtitle') }}
      </p>
    </div>
    <v-card variant="text" rounded="xl" border>
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="9">
          <v-sheet
            id="chatContainer"
            color="transparent"
            class="pa-3 overflow-y-auto"
            height="65vh"
            v-scroll.self="onScroll"
          >
            <AdminChatItem
              v-for="(item, idx) in items"
              :key="idx"
              :data="item"
            />
          </v-sheet>
          <v-divider />
          <v-form class="pa-6" @submit.prevent="submit">
            <v-textarea
              v-model="message"
              base-color="black"
              color="black"
              :label="$t('writeMessage.placeholder')"
              rounded="xl"
              variant="outlined"
              rows="1"
              max-rows="5"
              class="z-index--append-inner"
              single-line
              hide-details
              auto-grow
            >
              <template #append>
                <v-btn
                  type="submit"
                  base-color="primary"
                  color="primary"
                  variant="flat"
                  icon
                >
                  <Icon name="plain" />
                </v-btn>
              </template>
            </v-textarea>
          </v-form>
        </v-col>
        <v-divider class="d-none d-md-flex" vertical />
        <v-divider class="d-md-none" />
        <v-col cols="12" sm="12" md="3">
          <v-list color="black" class="pa-6 bg-transparent">
            <v-list-item class="pa-0 ma-0">
              <v-list-item-subtitle class="text-uppercase text-caption">
                {{ $t('label.tickedId') }}
              </v-list-item-subtitle>
              <v-list-item-title>#JAQTKIGGSS</v-list-item-title>
            </v-list-item>
            <v-list-item class="pa-0 my-2">
              <v-list-item-subtitle class="text-uppercase text-caption">
                {{ $t('label.category') }}
              </v-list-item-subtitle>
              <v-list-item-title>Feedback</v-list-item-title>
            </v-list-item>
            <v-list-item class="pa-0 ma-0">
              <v-list-item-subtitle class="text-uppercase text-caption">
                {{ $t('label.priority') }}
              </v-list-item-subtitle>
              <v-list-item-title>High</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
  </v-sheet>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
})

const { t } = useI18n()
const { appName } = useAppConfig()

useHead({
  title: t('page.provideResponse.head.title'),
  titleTemplate: `%s | ${appName}`,
})

const isScrollBottom = ref<boolean>(true)
const message = ref<string>('')
const items = ref([
  {
    message: "Hey, how's it going?",
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'John Doe',
    date: '2024-10-08 14:32',
    self: true,
  },
  {
    message: "I'm good! How about you?",
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    name: 'Jane Smith',
    date: '2024-10-08 14:33',
    self: false,
  },
  {
    message: 'Not bad, just working on a project.',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'John Doe',
    date: '2024-10-08 14:35',
    self: true,
  },
  {
    message: 'Nice! Anything interesting?',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    name: 'Jane Smith',
    date: '2024-10-08 14:36',
    self: false,
  },
  {
    message: "Yeah, it's a new app we're building for a client.",
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'John Doe',
    date: '2024-10-08 14:37',
    self: true,
  },
  {
    message: 'That sounds exciting! Keep me updated!',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    name: 'Jane Smith',
    date: '2024-10-08 14:39',
    self: false,
  },
  {
    message: 'Will do! Have you been working on anything new?',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'John Doe',
    date: '2024-10-08 14:41',
    self: true,
  },
  {
    message: "Yeah, I've been experimenting with some new designs.",
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    name: 'Jane Smith',
    date: '2024-10-08 14:43',
    self: false,
  },
  {
    message: 'That sounds cool! Let me know if you need any feedback.',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'John Doe',
    date: '2024-10-08 14:44',
    self: true,
  },
  {
    message: 'Thanks! I might take you up on that.',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    name: 'Jane Smith',
    date: '2024-10-08 14:46',
    self: false,
  },
])

onMounted(() => {
  scrollToBottom(false)
})

watch(items, () => {
  if (isScrollBottom.value) scrollToBottom()
})

const scrollToBottom = (smooth: boolean = true) => {
  nextTick(() => {
    const chatContainer = document.getElementById(
      'chatContainer'
    ) as HTMLElement

    if (chatContainer) {
      if (smooth) {
        chatContainer.scrollTo({
          top: chatContainer.scrollHeight,
          behavior: 'smooth',
        })
      } else {
        chatContainer.scrollTop = chatContainer.scrollHeight
      }
    }
  })
}

const onScroll = (e: Event) => {
  const target = e.target as HTMLElement
  isScrollBottom.value = target.scrollTop > 450
}

const submit = () => {
  if (message.value) {
    items.value.push({
      message: message.value.trim(),
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      name: 'John Doe',
      date:
        new Date().toISOString().split('T')[0] +
        '' +
        new Date().toLocaleTimeString('en-US', { hour12: false }),
      self: true,
    })

    message.value = ''
    scrollToBottom()
  }
}
</script>
