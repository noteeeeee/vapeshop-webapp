// @ts-ignore
import NProgress from "nprogress";

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();

  router.beforeResolve((to, from, next) => {
    if (to.name && to.name != from.name) {
      NProgress.start();
    }
    next();
  });

  router.afterEach((to, from) => {
    if (to.name && to.name != from.name) {
      NProgress.done(true);
    }
  });
});
