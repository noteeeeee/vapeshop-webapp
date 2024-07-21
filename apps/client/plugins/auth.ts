export default defineNuxtPlugin(async (nuxtApp) => {
  const { getMe } = useAuth();

  await getMe();
});
