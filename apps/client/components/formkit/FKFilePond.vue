<script setup lang="ts">
import type { FormKitFrameworkContext } from "@formkit/core";
import type {
  FilePondFile,
  FilePondOptions,
  FilePondServerConfigProps,
} from "filepond";
import vueFilePond from "vue-filepond";
import { mergeWithCN } from "~/lib/utils";
import { watchOnce } from "@vueuse/core";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";

const client = useApiClient();
const props = defineProps<{
  context: FormKitFrameworkContext["node"]["context"];
}>();
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
);

const blur = () => setTimeout(() => props.context?.handlers.blur(), 100);
const files = ref<FilePondFile[]>(props.context?._value || []);
const filePondFiles = ref<FilePondOptions["files"]>([]);

const onUpdate = (files: FilePondFile[]) => {
  if (!files || !files.map) return;

  props.context?.node.input(
    files.filter(({ serverId }) => !!serverId).map(({ serverId }) => serverId),
  );
};

const onProcessFile = (_: any, file: FilePondFile) => {
  if (file.status <= 2) return;

  files.value.push(file);
};

watchOnce(
  () => props.context?._value,
  (n: string[]) => {
    if (n?.length)
      filePondFiles.value = n.map((i) => ({
        source: i,
        options: { type: "local" },
      }));
  },
  { immediate: true },
);

const server = computed<FilePondServerConfigProps["server"]>(() => {
  return {
    timeout: 10000,
    load: (source, load, error, progress, abort) => {
      client
        .request({
          path: `/storage/filepond/load?source=${source}`,
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            const progressPercent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!,
            );
            progress(
              !!progressPercent,
              progressEvent.loaded,
              progressEvent.total!,
            );
          },
        })
        .then((response) => load(response.data))
        .catch((err) => {
          console.error("Error fetching file:", err);
          error("Failed to fetch file");
        });

      return { abort: () => abort() };
    },
    process: (fieldName, file, metadata, load, error, progress, abort) => {
      const formData = new FormData();
      formData.append(fieldName, file, file.name);

      client
        .request({
          path: "/storage/filepond/process",
          method: "post",
          body: formData,
          onUploadProgress: (progressEvent) => {
            const progressPercent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            progress(
              !!progressPercent,
              progressEvent.loaded,
              progressEvent.total!,
            );
          },
        })
        .then((response) => load(response.data))
        .catch((error) => {
          console.error("Error:", error);
          error(error);
        });

      return {
        abort: () => {
          CancelToken.source().cancel("File upload cancelled");
          abort();
        },
      };
    },
    revert: (uniqueFileId, load, error) => {
      client.storage
        .storageControllerRevertUpload(uniqueFileId)
        .then(() => load())
        .catch((err) => {
          console.error("Error reverting file:", err);
          error("Failed to revert file");
        });
    },
  };
});

props.context!.classes = mergeWithCN(
  {
    label: "!text-white !font-normal !mb-3",
  },
  props.context!.classes,
);
</script>

<template>
  <FilePond
    v-bind="context?.attrs"
    :label-idle="context?.attrs.placeholder"
    :disabled="!!context?.disabled"
    @processfile="onProcessFile"
    @input="onUpdate"
    @removefile="blur"
    :files="filePondFiles"
    :server="server"
  />
</template>

<style lang="scss">
@import "filepond/dist/filepond.css";
@import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

.filepond--credits {
  display: none;
}

.filepond--panel-root {
  background: transparent !important;
}

.filepond--root {
  @apply border-2 rounded-md before:opacity-100 before:transition-opacity before:absolute before:outline-dashed before:outline-black before:rounded-md before:w-full before:h-full;
}

.filepond--root:has(.filepond--image-preview) {
  @apply before:opacity-0;
}

.filepond--image-preview {
  background: #fafafa !important;
}

.filepond--drop-label {
  color: white;
}

.filepond--image-preview-overlay {
  @apply text-white;
}

.filepond--image-preview-overlay-idle {
  color: rgba(#212121, 0.7);
}

.filepond--image-preview-overlay-success {
  color: rgba(#212121, 0.7);
}

.filepond--image-preview-overlay-failure {
  color: rgba(#212121, 0.7);
}
</style>
