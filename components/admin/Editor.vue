<template>
  <div class="editor">
    <ClientOnly>
      <div class="tools mb-6">
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            :disabled="!editor?.can().undo()"
            v-tooltip:bottom="$t('label.undo')"
            block
            @click="editor?.chain().focus().undo().run()"
          >
            <Icon name="undo-left" size="20px" />
          </v-btn>
        </div>
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            :disabled="!editor?.can().redo()"
            v-tooltip:bottom="$t('label.redo')"
            block
            @click="editor?.chain().focus().redo().run()"
          >
            <Icon name="undo-right" size="20px" />
          </v-btn>
        </div>
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            v-tooltip:bottom="$t('label.heading1')"
            block
            @click="editor?.commands.toggleHeading({ level: 1 })"
          >
            <Icon name="heading-1" size="18px" />
          </v-btn>
        </div>
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            v-tooltip:bottom="$t('label.heading2')"
            block
            @click="editor?.commands.toggleHeading({ level: 2 })"
          >
            <Icon name="heading-2" size="18px" />
          </v-btn>
        </div>
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            v-tooltip:bottom="$t('label.heading3')"
            block
            @click="editor?.commands.toggleHeading({ level: 3 })"
          >
            <Icon name="heading-3" size="18px" />
          </v-btn>
        </div>
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            v-tooltip:bottom="$t('label.heading4')"
            block
            @click="editor?.commands.toggleHeading({ level: 4 })"
          >
            <Icon name="heading-4" size="18px" />
          </v-btn>
        </div>
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            v-tooltip:bottom="$t('label.heading5')"
            block
            @click="editor?.commands.toggleHeading({ level: 5 })"
          >
            <Icon name="heading-5" size="18px" />
          </v-btn>
        </div>
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            v-tooltip:bottom="$t('label.heading6')"
            block
            @click="editor?.commands.toggleHeading({ level: 6 })"
          >
            <Icon name="heading-6" size="18px" />
          </v-btn>
        </div>
        <div class="tool">
          <v-menu :close-on-content-click="false" :width="300">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                color="primary"
                variant="tonal"
                rounded="lg"
                v-tooltip:bottom="$t('label.color')"
                block
              >
                <Icon name="color-palette" size="20px" />
              </v-btn>
            </template>
            <v-card color="white" rounded="xl" class="pa-6">
              <v-color-picker
                v-model="selectedTextColor"
                width="100%"
                mode="hex"
                rounded="xl"
                :elevation="0"
                hide-sliders
                show-swatches
                tile
              />
            </v-card>
          </v-menu>
        </div>
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            v-tooltip:bottom="$t('label.bold')"
            block
            @click="editor?.chain().focus().toggleBold().run()"
          >
            <Icon name="format-bold" />
          </v-btn>
        </div>
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            v-tooltip:bottom="$t('label.highlight')"
            block
            @click="editor?.commands?.toggleHighlight()"
          >
            <Icon name="highlighter" size="20px" />
          </v-btn>
        </div>
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            v-tooltip:bottom="$t('label.italic')"
            block
            @click="editor?.chain().focus().toggleItalic().run()"
          >
            <Icon name="text-italic" size="18px" />
          </v-btn>
        </div>
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            v-tooltip:bottom="$t('label.underlined')"
            block
            @click="editor?.chain().focus().toggleUnderline().run()"
          >
            <Icon name="text-underline" size="20px" />
          </v-btn>
        </div>
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            v-tooltip:bottom="$t('label.bulletList')"
            block
            @click="editor?.chain().focus().toggleBulletList().run()"
          >
            <Icon name="list-bullets" size="20px" />
          </v-btn>
        </div>
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            v-tooltip:bottom="$t('label.orderedList')"
            block
            @click="editor?.chain().focus().toggleOrderedList().run()"
          >
            <Icon name="list-numbers" size="20px" />
          </v-btn>
        </div>
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            v-tooltip:bottom="$t('label.strikethrough')"
            block
            @click="editor?.chain().focus().toggleStrike().run()"
          >
            <Icon name="strikethrough" size="20px" />
          </v-btn>
        </div>
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            v-tooltip:bottom="$t('label.quote')"
            block
            @click="editor?.chain().focus().toggleBlockquote().run()"
          >
            <Icon name="quote" size="20px" />
          </v-btn>
        </div>
        <div class="tool">
          <v-menu
            v-model="isLinkMenuOpen"
            :close-on-content-click="false"
            :width="300"
          >
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                color="primary"
                variant="tonal"
                rounded="lg"
                v-tooltip:bottom="$t('label.addLink')"
                block
              >
                <Icon name="link-minimalistic" size="20px" />
              </v-btn>
            </template>
            <v-card color="white" rounded="xl" class="pa-6">
              <v-form @submit.prevent="addLinkToEditor">
                <v-row no-gutters>
                  <v-col cols="12">
                    <p class="text-body-2 text-black mb-1 ms-4">
                      {{ $t('label.enterURL') }}
                    </p>
                    <v-text-field
                      v-model="linkURL"
                      :rules="[validationRules.required, validationRules.url]"
                      color="black"
                      variant="outlined"
                      label="e.g. https://www.example.com/"
                      density="comfortable"
                      :hint="$t('editor.enterURL.info')"
                      rounded="pill"
                      single-line
                    />
                  </v-col>
                  <v-col cols="12" class="mt-3">
                    <v-btn
                      type="submit"
                      color="primary"
                      variant="flat"
                      size="large"
                      rounded="pill"
                      class="text-body-1"
                      block
                    >
                      {{ $t('label.addLink') }}
                    </v-btn>
                    <div class="ma-2" />
                    <v-btn
                      v-if="previousLinkURL"
                      color="error"
                      variant="flat"
                      size="large"
                      rounded="pill"
                      class="text-body-1"
                      block
                      @click="removeLinkFromEditor"
                    >
                      {{ $t('label.removeLink') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-menu>
        </div>
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            v-tooltip:bottom="$t('label.alignLeft')"
            block
            @click="editor?.chain().focus().setTextAlign('left').run()"
          >
            <Icon name="text-align-left" size="20px" />
          </v-btn>
        </div>
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            v-tooltip:bottom="$t('label.alignCenter')"
            block
            @click="editor?.chain().focus().setTextAlign('center').run()"
          >
            <Icon name="text-align-center" size="20px" />
          </v-btn>
        </div>
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            v-tooltip:bottom="$t('label.alignRight')"
            block
            @click="editor?.chain().focus().setTextAlign('right').run()"
          >
            <Icon name="text-align-right" size="20px" />
          </v-btn>
        </div>
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            v-tooltip:bottom="$t('label.code')"
            block
            @click="editor?.chain().focus().toggleCodeBlock().run()"
          >
            <Icon name="code" size="20px" />
          </v-btn>
        </div>
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            v-tooltip:bottom="$t('label.subscript')"
            block
            @click="editor?.chain().focus().toggleSubscript().run()"
          >
            <Icon name="subscript" size="20px" />
          </v-btn>
        </div>
        <div class="tool">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            v-tooltip:bottom="$t('label.superscript')"
            block
            @click="editor?.chain().focus().toggleSuperscript().run()"
          >
            <Icon name="superscript" size="20px" />
          </v-btn>
        </div>
        <div class="tool">
          <v-menu
            v-model="isImageMenuOpen"
            :close-on-content-click="false"
            :width="300"
          >
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                color="primary"
                variant="tonal"
                rounded="lg"
                v-tooltip:bottom="$t('label.addImage')"
                block
              >
                <Icon name="image" size="20px" />
              </v-btn>
            </template>
            <v-card rounded="xl" color="white" class="pa-6">
              <v-form @submit.prevent="addImageToEditor">
                <v-row no-gutters>
                  <v-col cols="12" class="mb-1">
                    <p
                      class="text-body-2 text-black mb-1 ms-4"
                      v-text="$t('label.imageURL')"
                    />
                    <v-text-field
                      v-model="imageDetails.src"
                      :rules="[validationRules.required, validationRules.url]"
                      color="default-black"
                      variant="outlined"
                      label="e.g. https://www.example.com/img/fkWel.png"
                      density="comfortable"
                      rounded="pill"
                      single-line
                    />
                  </v-col>
                  <v-col cols="12">
                    <p
                      class="text-body-2 text-black mb-1 ms-4"
                      v-text="$t('label.imageAlt')"
                    />
                    <v-text-field
                      v-model="imageDetails.alt"
                      :rules="[validationRules.required]"
                      color="default-black"
                      variant="outlined"
                      :label="$t('imageAlt.placeholder')"
                      density="comfortable"
                      rounded="pill"
                      single-line
                    />
                  </v-col>
                  <v-col cols="12" class="mt-3">
                    <v-btn
                      type="submit"
                      color="primary"
                      variant="flat"
                      rounded="pill"
                      size="large"
                      class="text-body-1"
                      block
                    >
                      {{ $t('label.addImage') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-menu>
        </div>
        <div class="tool">
          <v-menu
            v-model="isVideoMenuOpen"
            :close-on-content-click="false"
            :width="300"
          >
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                color="primary"
                variant="tonal"
                rounded="lg"
                v-tooltip:bottom="$t('label.youtubeVideo')"
                block
              >
                <Icon name="youtube" size="20px" />
              </v-btn>
            </template>
            <v-card color="white" rounded="xl">
              <v-form class="pa-6" @submit.prevent="addYoutubeVideoToEditor">
                <v-row no-gutters>
                  <v-col cols="12" class="mb-1">
                    <p class="text-body-2 text-black mb-1 ms-4">
                      {{ $t('label.videoURL') }}
                    </p>
                    <v-text-field
                      v-model="videoDetails.url"
                      :rules="[validationRules.required, validationRules.url]"
                      color="black"
                      variant="outlined"
                      label="e.g. https://www.youtube.com/watch?v=4GNOm9RXT"
                      density="comfortable"
                      rounded="pill"
                      single-line
                    />
                  </v-col>
                  <v-col cols="12" class="mb-1">
                    <p class="text-body-2 text-black mb-1 ms-4">
                      {{ $t('label.videoWidth') }}
                    </p>
                    <v-text-field
                      v-model="videoDetails.width"
                      :rules="[
                        validationRules.required,
                        validationRules.positiveNumber,
                      ]"
                      type="number"
                      color="black"
                      variant="outlined"
                      label="e.g. 640"
                      density="comfortable"
                      rounded="pill"
                      single-line
                    />
                  </v-col>
                  <v-col cols="12">
                    <p class="text-body-2 text-black mb-1 ms-4">
                      {{ $t('label.videoHeight') }}
                    </p>
                    <v-text-field
                      v-model="videoDetails.height"
                      :rules="[
                        validationRules.required,
                        validationRules.positiveNumber,
                      ]"
                      type="number"
                      color="black"
                      variant="outlined"
                      label="e.g. 480"
                      density="comfortable"
                      rounded="pill"
                      single-line
                    />
                  </v-col>
                  <v-col cols="12" class="mt-3">
                    <v-btn
                      type="submit"
                      color="primary"
                      variant="flat"
                      rounded="pill"
                      size="large"
                      class="text-body-1"
                      block
                    >
                      {{ $t('label.addVideo') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-menu>
        </div>
      </div>
      <BubbleMenu
        v-if="editor"
        :editor="editor"
        :tippy-options="{ duration: 100 }"
      >
        <v-card
          color="primary"
          rounded="pill"
          :elevation="4"
          class="d-flex py-2 px-3"
        >
          <v-btn
            variant="flat"
            color="white"
            rounded="lg"
            :size="30"
            @click="editor?.chain().focus().toggleBold().run()"
          >
            <Icon name="format-bold" size="20px" class="text-primary" />
          </v-btn>
          <div class="ma-1" />
          <v-btn
            variant="flat"
            color="white"
            rounded="lg"
            :size="30"
            @click="editor?.chain().focus().toggleItalic().run()"
          >
            <Icon name="text-italic" size="18px" class="text-primary" />
          </v-btn>
          <div class="ma-1" />
          <v-btn
            variant="flat"
            color="white"
            rounded="lg"
            :size="30"
            @click="editor?.chain().focus().toggleStrike().run()"
          >
            <Icon name="strikethrough" size="20px" class="text-primary" />
          </v-btn>
        </v-card>
      </BubbleMenu>
      <p class="text-body-2 text-black mb-1 ms-4">
        {{ $t('label.editorContent') }}
      </p>
      <EditorContent class="input" :editor="editor" />
      <div
        class="d-flex align-center justify-end mt-1 text-medium-emphasis text-caption me-4"
      >
        <p>
          {{ editor?.storage?.characterCount.words() }} {{ $t('label.words') }}
        </p>
        <Icon name="dot" size="16px" class="mx-1" />
        <p>
          {{ editor?.storage?.characterCount.characters() }}
          {{ $t('label.characters') }}
        </p>
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import Blockquote from '@tiptap/extension-blockquote'
import CharacterCount from '@tiptap/extension-character-count'
import CodeBlock from '@tiptap/extension-code-block'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import Youtube from '@tiptap/extension-youtube'
import StarterKit from '@tiptap/starter-kit'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/vue-3'

interface Props {
  inputValue?: string
}

const { t } = useI18n()
const props = defineProps<Props>()

const tiptapExtensions = [
  StarterKit,
  Image.configure({ inline: true }),
  Placeholder.configure({ placeholder: t('textEditor.placeholder') }),
  Highlight.configure({ multicolor: true }),
  Blockquote.configure({ HTMLAttributes: { class: 'quote' } }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Link.configure({
    validate: (href: string) => /^http|https?:\/\//.test(href),
    openOnClick: false,
  }),
  Youtube.configure({ inline: true }),
  CharacterCount,
  CodeBlock,
  Underline,
  Superscript,
  Subscript,
  Color,
  TextStyle,
]

const selectedTextColor = ref<string>('')
const isLinkMenuOpen = ref<boolean>(false)
const linkURL = ref<string>('')
const isImageMenuOpen = ref<boolean>(false)
const imageDetails = reactive<{ src: string; alt: string }>({
  src: '',
  alt: '',
})
const isVideoMenuOpen = ref<boolean>(false)
const videoDetails = reactive<{ url: string; width: string; height: string }>({
  url: '',
  width: '',
  height: '',
})

const validationRules = reactive({
  required: (v: string) => !!v || t('validationMessage.required'),
  url: (v: string) => {
    const urlPattern = new RegExp(
      '^' +
        // Optional protocol (http, https)
        '(https?:\\/\\/)?' +
        // Optional subdomains (like www. or subdomain.)
        '([a-zA-Z0-9-]+\\.)*' +
        // Main domain and top-level domain (TLD)
        '[a-zA-Z0-9-]+(\\.[a-zA-Z]{2,})+' +
        // Optional port
        '(:[0-9]{1,5})?' +
        // Optional path
        '(\\/.*)?' +
        // Optional query parameters
        '(\\?.*)?' +
        // Optional fragment (anchor links like #section)
        '(#.*)?' +
        '$',
      'i' // case-insensitive
    )

    return urlPattern.test(v) || t('validationMessage.url')
  },
  positiveNumber: (v: string) => {
    const numberPattern = /^[0-9]+$/ // Regular expression to check for positive numbers only
    return numberPattern.test(v) || t('validationMessage.positiveNumber')
  },
})

const editorContent = computed<string>(() => props.inputValue || '')
const emit = defineEmits<{ onUpdate: [value: string] }>()

const editor = useEditor({
  content: editorContent.value,
  onUpdate: () => emit('onUpdate', editor?.value?.getHTML() || ''),
  extensions: tiptapExtensions,
})

const previousLinkURL = computed<string>(
  () => editor?.value?.getAttributes('link').href || ''
)

onBeforeMount(() => editor?.value?.destroy())

watch(editorContent, (newValue: object) => {
  editor?.value?.commands?.setContent(newValue, true)
})

watch(selectedTextColor, (newColor: string) => {
  editor?.value?.chain().focus().setColor(newColor).run()
})

watch(isLinkMenuOpen, (isOpen: boolean) => {
  linkURL.value = isOpen && previousLinkURL.value ? previousLinkURL.value : ''
})

const addLinkToEditor = () => {
  if (!linkURL.value) return
  editor?.value
    ?.chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: linkURL.value })
    .run()
  isLinkMenuOpen.value = false
  linkURL.value = ''
}

const removeLinkFromEditor = () => {
  if (!previousLinkURL.value) return
  editor?.value?.chain().focus().extendMarkRange('link').unsetLink().run()
  linkURL.value = ''
}

const addImageToEditor = () => {
  if (!imageDetails.src) return
  editor?.value
    ?.chain()
    .focus()
    .setImage({
      src: imageDetails.src,
      alt: imageDetails.alt,
    })
    .run()
  isImageMenuOpen.value = false
  imageDetails.src = ''
  imageDetails.alt = ''
}

const addYoutubeVideoToEditor = () => {
  if (!videoDetails.url) return
  editor?.value?.commands?.setYoutubeVideo({
    src: videoDetails.url,
    width: Math.max(320, parseInt(videoDetails.width, 10)) || 640,
    height: Math.max(180, parseInt(videoDetails.height, 10)) || 480,
  })
  isVideoMenuOpen.value = false
  videoDetails.url = ''
  videoDetails.width = ''
  videoDetails.height = ''
}
</script>

<style lang="sass" scoped>
.editor
  position: -webkit-sticky
  position: sticky
  top: 80px

  .tools
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(38px, 1fr))
    grid-auto-rows: 38px
    grid-gap: 8px

    .tool
      width: 100%

      .v-btn
        height: 100%
</style>
