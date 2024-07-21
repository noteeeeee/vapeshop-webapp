import { ru } from "@formkit/i18n";
import { defineFormKitConfig } from "@formkit/vue";
import { rootClasses } from "./formkit.theme";
import {
  createAutoAnimatePlugin,
  createFloatingLabelsPlugin,
} from "@formkit/addons";
import {FKDropdown, FKFilePond, FKTiptap, FKToggleGroup, FKNumber, FKCalendar} from "#components";

export default defineFormKitConfig({
  locales: { ru },
  locale: "ru",
  plugins: [
    createFloatingLabelsPlugin({
      // useAsDefault: true, // defaults to false
    }),
    createAutoAnimatePlugin(
      {
        /* optional AutoAnimate config */
        // default:
        duration: 250,
        easing: "ease-in-out",
      },
      {
        /* optional animation targets object */
        // default:
        global: ["outer", "inner"],
        form: ["form"],
        repeater: ["items"],
      },
    ),
  ],
  config: {
    rootClasses,
  },
  inputs: {
    filepond: createInput(FKFilePond, {}),
    dropdown: createInput(FKDropdown, {}),
    togglegroup: createInput(FKToggleGroup, {}),
    tiptap: createInput(FKTiptap, {}),
    numberfiled: createInput(FKNumber, {}),
    calendar: createInput(FKCalendar, {}),
  },
});
