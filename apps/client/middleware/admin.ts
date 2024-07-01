export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth();
  const route = useRoute();

  if (user.value?.isAdmin) {
    return;
  }

  return createError({
    statusCode: 404,
    message: `Page not found: ${route.fullPath}`,
    fatal: true,
  });
});
