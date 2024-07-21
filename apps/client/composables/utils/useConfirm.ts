import type { ButtonVariants } from "~/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { ConfirmModal } from "#components";
import { createVNode, render } from "vue";

export interface ConfirmOptions {
  title: string;
  description?: string;
  variant?: ButtonVariants["variant"];
  confirmLabel?: string;
  onConfirm?: () => void;
}

export const ConfirmModals = reactive<Record<string, boolean>>({});

export function useConfirm(options: ConfirmOptions) {
  const id = ref();
  const isOpen = ref(false);

  const $confirm = (options_?: Partial<ConfirmOptions>) => {
    id.value = uuidv4();

    const container = document.createElement("div");
    container.id = `confirm-modal-${id.value}`;
    document.body.appendChild(container);

    const vnode = createVNode(ConfirmModal, {
      ...Object.assign(options, options_),
    });
    render(vnode, container);
  };

  const $close = () => {
    const container = document.getElementById(`confirm-modal-${id.value}`);
    if (container) {
      container.remove();
    }
  };

  return {
    $confirm,
    $close,
  };
}
