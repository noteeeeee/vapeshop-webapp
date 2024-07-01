export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn.value) {
    return createError({
      statusCode: 403,
      message: "Access Denied",
      fatal: true
    });
  }
});
