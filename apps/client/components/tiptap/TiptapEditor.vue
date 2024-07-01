<script setup lang="ts">
import {
  Bold,
  Italic,
  Strikethrough,
  UnderlineIcon,
  LinkIcon,
  Heading5,
  Heading4,
  Heading3,
  List,
  ListOrdered,
  Undo,
  Redo,
} from "lucide-vue-next";
import {Editor, EditorContent} from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import type {HTMLAttributes} from "vue";
import {cn} from "~/lib/utils";
import {useVModel} from "@vueuse/core";

const linkRegexp =
    /\b(?:https?:\/\/|www\.\S+|mailto:[^\s@]+@[^\s@]+\.[^\s@]+|tel:\S+|tg:\/\/\S+)\b/g;

const LinkExtension = Link.extend({
  inclusive: false,
}).configure({
  validate: (href) => linkRegexp.test(href),
  protocols: [
    {
      scheme: "tel",
      optionalSlashes: true,
    },
    "mailto",
    "tg",
  ],
  HTMLAttributes: {
    class: "link-tiptap",
    target: "_blank",
  },
});

const UnderlineExtension = Underline.configure({
  HTMLAttributes: {
    class: "underline-tiptap",
  },
});

const HeadingExtension = Heading.configure({
  HTMLAttributes: {
    class: "heading-tiptap",
  },
});

const BulletListExtension = BulletList.configure({
  HTMLAttributes: {
    class: "bulled-list-tiptap",
  },
});

const OrderedListExtension = OrderedList.configure({
  HTMLAttributes: {
    class: "ordered-list-tiptap",
  },
});

type Action =
    | "bold"
    | "italic"
    | "strike"
    | "underline"
    | "link"
    | "code"
    | "h5"
    | "h4"
    | "h3"
    | "bulletList"
    | "orderedList"
    | "blockquote"
    | "codeBlock"
    | "horizontalRule"
    | "undo"
    | "redo";

const emits = defineEmits(["update:html", "blur"]);
const props = withDefaults(
    defineProps<{
      html?: string;
      class?: HTMLAttributes["class"];
      actions?: Action[];
    }>(),
    {
      actions: () => [
        "bold",
        "italic",
        "strike",
        "underline",
        "link",
        "h3",
        "h4",
        "h5",
        "bulletList",
        "orderedList",
        "undo",
        "redo",
      ],
    },
);

const editor = new Editor({
  extensions: [
    StarterKit,
    UnderlineExtension,
    LinkExtension,
    HeadingExtension,
    BulletListExtension,
    OrderedListExtension,
  ],
  content: props.html,
});
const isSelected = computed<boolean>(() => {
  const {view, state} = editor;
  // @ts-ignore
  const {from, to} = view.state.selection;
  // @ts-ignore
  return !!state.doc.textBetween(from, to, "");
});
const htmlValue = useVModel(props, "html", emits);
const json = ref(editor.getJSON());
const isLinkModalOpened = ref(false);

editor.on("update", () => {
  htmlValue.value = editor.getHTML();
  json.value = editor.getJSON();
});

editor.on("blur", () => {
  emits("blur");
});

watch(htmlValue, (newContent) => {
  editor.commands.setContent(newContent, false);
});

const showLinkDialog = () => {
  if (!isSelected.value) return;
  isLinkModalOpened.value = true;
};
const setLink = ({link}) => {
  if (!link) {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    isLinkModalOpened.value = false;
    return;
  }

  editor.chain().focus().extendMarkRange("link").setLink({href: link}).run();
  isLinkModalOpened.value = false;
};

onMounted(() => {
  htmlValue.value = editor.getHTML();
  json.value = editor.getJSON();
});

onBeforeUnmount(() => {
  editor.destroy();
});
</script>

<template>
  <div :class="cn('flex flex-col', props.class)">
    <Dialog v-model:open="isLinkModalOpened">
      <DialogContent>
        <FormKit
            @submit="setLink"
            type="form"
            :actions="false"
            #default="{ state: { valid } }"
            :classes="{
            message: 'hidden',
          }"
        >
          <DialogHeader>
            <DialogTitle>Введите ссылку</DialogTitle>
            <DialogDescription class="mt-4">
              <FormKitInputDark
                  name="link"
                  variant="text"
                  :validation="[['matches', linkRegexp]]"
                  :validation-messages="{
                  matches: 'Введите корректную ссылку',
                }"
              />
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <FormkitSubmitDark :disabled="!valid">Вставить</FormkitSubmitDark>
          </DialogFooter>
        </FormKit>
      </DialogContent>
    </Dialog>
    <div
        class="flex gap-x-1 bg-black border-solid border border-border border-b-0"
    >
      <div v-for="action in actions" :key="action">
        <Button
            as="div"
            v-if="action === 'bold'"
            size="icon"
            variant="outline"
            class="border-none hover:bg-white/10 data-[active=true]:text-black data-[active=true]:bg-white w-10 h-10"
            :data-active="editor.isActive('bold')"
            @click="editor.chain().focus().toggleBold().run()"
        >
          <Bold class="w-5 h-5"/>
        </Button>
        <Button
            as="div"
            v-if="action === 'italic'"
            size="icon"
            variant="outline"
            class="border-none hover:bg-white/10 data-[active=true]:text-black data-[active=true]:bg-white w-10 h-10"
            :data-active="editor.isActive('italic')"
            @click="editor.chain().focus().toggleItalic().run()"
        >
          <Italic class="w-5 h-5"/>
        </Button>
        <Button
            as="div"
            v-if="action === 'strike'"
            size="icon"
            variant="outline"
            class="border-none hover:bg-white/10 data-[active=true]:text-black data-[active=true]:bg-white w-10 h-10"
            :data-active="editor.isActive('strike')"
            @click="editor.chain().focus().toggleStrike().run()"
        >
          <Strikethrough class="w-5 h-5"/>
        </Button>
        <Button
            as="div"
            v-if="action === 'underline'"
            size="icon"
            variant="outline"
            class="border-none hover:bg-white/10 data-[active=true]:text-black data-[active=true]:bg-white w-10 h-10"
            :data-active="editor.isActive('underline')"
            @click="editor.chain().focus().toggleUnderline().run()"
        >
          <UnderlineIcon class="w-5 h-5"/>
        </Button>
        <Button
            as="div"
            v-if="action === 'link'"
            size="icon"
            variant="outline"
            class="border-none hover:bg-white/10 data-[active=true]:text-black data-[active=true]:bg-white w-10 h-10"
            :data-active="editor.isActive('link')"
            @click="showLinkDialog()"
        >
          <LinkIcon class="w-5 h-5"/>
        </Button>
        <Button
            as="div"
            v-if="action === 'h3'"
            size="icon"
            variant="outline"
            class="border-none hover:bg-white/10 data-[active=true]:text-black data-[active=true]:bg-white w-10 h-10"
            :data-active="editor.isActive('h3', { level: 3 })"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          <Heading3 class="w-5 h-5"/>
        </Button>
        <Button
            as="div"
            v-if="action === 'h4'"
            size="icon"
            variant="outline"
            class="border-none hover:bg-white/10 data-[active=true]:text-black data-[active=true]:bg-white w-10 h-10"
            :data-active="editor.isActive('h4', { level: 4 })"
            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        >
          <Heading4 class="w-5 h-5"/>
        </Button>
        <Button
            as="div"
            v-if="action === 'h5'"
            size="icon"
            variant="outline"
            class="border-none hover:bg-white/10 data-[active=true]:text-black data-[active=true]:bg-white w-10 h-10"
            :data-active="editor.isActive('h5', { level: 5 })"
            @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        >
          <Heading5 class="w-5 h-5"/>
        </Button>
        <Button
            as="div"
            v-if="action === 'bulletList'"
            size="icon"
            variant="outline"
            class="border-none hover:bg-white/10 data-[active=true]:text-black data-[active=true]:bg-white w-10 h-10"
            :data-active="editor.isActive('bulletList')"
            @click="editor.chain().focus().toggleBulletList().run()"
        >
          <List class="w-5 h-5"/>
        </Button>
        <Button
            as="div"
            v-if="action === 'orderedList'"
            size="icon"
            variant="outline"
            class="border-none hover:bg-white/10 data-[active=true]:text-black data-[active=true]:bg-white w-10 h-10"
            :data-active="editor.isActive('orderedList')"
            @click="editor.chain().focus().toggleOrderedList().run()"
        >
          <ListOrdered class="w-5 h-5"/>
        </Button>
        <Button
            as="div"
            v-if="action === 'undo'"
            size="icon"
            variant="outline"
            class="border-none hover:bg-white/10 w-10 h-10"
            @click="editor.chain().focus().undo().run()"
        >
          <Undo class="w-5 h-5"/>
        </Button>
        <Button
            as="div"
            v-if="action === 'redo'"
            size="icon"
            variant="outline"
            class="border-none hover:bg-white/10 w-10 h-10"
            @click="editor.chain().focus().redo().run()"
        >
          <Redo class="w-5 h-5"/>
        </Button>
      </div>
    </div>
    <EditorContent
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        :editor="editor"
    />
  </div>
</template>

<style lang="scss">
.tiptap {
  @apply min-h-20 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50;
}
</style>