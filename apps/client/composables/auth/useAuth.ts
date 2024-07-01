const getMe = async () => {
  const { user, loading} = useAuthState();
  const client = useApiClient();

  loading.value = true;
  try {
    user.value = await client.auth.authControllerMe().then((res) => res.data);
  } catch {
    user.value = null;
  }
  loading.value = false;
};

export const useAuth = () => {
  const { loading, isLoggedIn, user, setUser } = useAuthState();

  return {
    getMe,
    loading,
    isLoggedIn,
    user,
    setUser,
  };
};
