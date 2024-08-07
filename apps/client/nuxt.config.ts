import svgLoader from "vite-svg-loader";
import { EnvConfig } from "@vapeshop-webapp/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      script: [{ src: "/telegram-web-app.js?v=1.0.0", defer: true }],
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1",
        },
      ],
      link: [
        {
          href: "https://fonts.cdnfonts.com/css/sf-pro-display",
          rel: "preconnect",
          crossorigin: "anonymous",
        },
      ],
    },
  },
  css: [
    "~/assets/scss/tailwind.scss",
    "vue-virtual-scroller/dist/vue-virtual-scroller.css",
  ],
  spaLoadingTemplate: "spa-loading-template.html",
  ssr: false,
  runtimeConfig: {
    public: {
      apiBaseurl: EnvConfig.API_BASEURL,
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@formkit/nuxt",
    "@formkit/auto-animate/nuxt",
    "@nuxt/image",
    "@nuxtjs/critters",
    "dayjs-nuxt",
    "nuxt-lucide-icons"
  ],
  formkit: {
    autoImport: true,
  },
  critters: {
    config: {
      preload: "swap",
    },
  },
  dayjs: {
    locales: ["ru"],
    defaultLocale: "ru",
    plugins: ["relativeTime", "utc", "timezone", "localizedFormat", "duration"],
  },
  vite: {
    plugins: [
      svgLoader({
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
          ],
        },
      }),
    ],
  },
  experimental: {
    inlineRouteRules: true,
    viewTransition: true,
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  nitro: {
    prerender: {
      concurrency: 250,
      interval: 100,
    },
  },
  imports: {
    dirs: ["./composables/**"],
  },
  devtools: { enabled: false },
  devServer: {
    host: "127.0.0.1",
  },
});