<template>
  <v-sheet color="transparent" class="mx-auto" :max-width="1000">
    <div class="mb-6 mb-md-12 text-black">
      <h3 class="text-body-1 font-weight-bold">
        {{ $t('page.supportRequests.title') }}
      </h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ $t('page.supportRequests.subtitle') }}
      </p>
    </div>
    <v-card variant="text" rounded="xl" border>
      <v-row no-gutters>
        <v-col cols="12" md="9">
          <v-sheet
            color="transparent"
            class="pa-6 overflow-y-auto d-flex justify-end flex-column"
            height="65vh"
          >
            <div class="d-flex align-end justify-start">
              <v-avatar color="primary">
                <v-img
                  src="/images/default-avatar.jpg"
                  lazy-src="/images/default-avatar.jpg"
                  alt="User Avatar"
                />
              </v-avatar>
              <div class="ms-4">
                <v-card
                  color="grey-lighten-3"
                  class="pa-3 rounded-xl rounded-bs-lg"
                  variant="flat"
                >
                  <p class="text-black text-body-2">Lorem Ipsum is</p>
                </v-card>
                <p class="text-body-2 text-black d-flex align-center mt-1">
                  Jean Luck
                  <Icon
                    size="16px"
                    name="dot"
                    class="text-medium-emphasis mx-1"
                  />
                  <span class="text-medium-emphasis">Jan 1, 2024 11:44 PM</span>
                </p>
              </div>
            </div>
            <div class="d-flex align-end justify-end">
              <div class="me-4">
                <v-card
                  color="primary"
                  class="pa-3 rounded-xl rounded-be-lg"
                  variant="flat"
                >
                  <p class="text-white text-body-2 text-right">
                    Lorem Ipsum is
                  </p>
                </v-card>
                <p class="text-body-2 text-black d-flex align-center mt-1">
                  <span class="text-medium-emphasis">Jan 1, 2024 11:44 PM</span>
                  <Icon
                    size="16px"
                    name="dot"
                    class="text-medium-emphasis mx-1"
                  />
                  Jean Luck
                </p>
              </div>
              <v-avatar color="primary">
                <v-img
                  src="/images/default-avatar.jpg"
                  lazy-src="/images/default-avatar.jpg"
                  alt="User Avatar"
                />
              </v-avatar>
            </div>
          </v-sheet>
          <v-divider />
          <div class="pa-6">
            <v-textarea
              base-color="black"
              color="black"
              :label="$t('description.placeholder')"
              rounded="xl"
              variant="outlined"
              rows="1"
              max-rows="5"
              single-line
              hide-details
              auto-grow
            >
              <template #append-inner>
                <v-btn
                  type="submit"
                  base-color="primary"
                  color="primary"
                  variant="flat"
                  class="ms-2 me-n1"
                  :size="42"
                  icon
                >
                  <Icon name="solar:plain-outline" />
                </v-btn>
              </template>
            </v-textarea>
          </div>
        </v-col>
        <v-divider vertical />
        <v-col cols="12" md="3">
          <v-list color="black" class="pa-6">
            <v-list-item class="pa-0 ma-0">
              <v-list-item-subtitle class="text-uppercase text-caption">
                Ticked ID
              </v-list-item-subtitle>
              <v-list-item-title>#JAQTKIGGSS</v-list-item-title>
            </v-list-item>
            <v-list-item class="pa-0 my-2">
              <v-list-item-subtitle class="text-uppercase text-caption">
                Category
              </v-list-item-subtitle>
              <v-list-item-title>Feedback</v-list-item-title>
            </v-list-item>
            <v-list-item class="pa-0 ma-0">
              <v-list-item-subtitle class="text-uppercase text-caption">
                Priority
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
  title: t('page.supportRequests.head.title'),
  titleTemplate: `%s | ${appName}`,
})
</script>
