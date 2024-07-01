export default defineNuxtPlugin(async (nuxtApp) => {
  const { getMe, user } = useAuth();

  if (typeof user.value === "undefined") {
    await getMe();
  }
});
