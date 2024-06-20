import { ru } from "@formkit/i18n";
import { defineFormKitConfig } from "@formkit/vue";
import { rootClasses } from "./formkit.theme";
import {
  createAutoAnimatePlugin,
  createFloatingLabelsPlugin,
} from "@formkit/addons";
import "@formkit/addons/css/floatingLabels";

export default defineFormKitConfig({
  locales: { ru },
  locale: "RU",
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
});
