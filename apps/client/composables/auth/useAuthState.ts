import type {UserDto} from "~/types";
import {useCookie, useState} from "#app";
import {computed} from "vue";

export const useAuthState = () => {
  const loading = useState<boolean>("auth:loading", () => false);
  const user = useState<UserDto | undefined | null>(
      "auth:user",
      () => undefined,
  );
  const isLoggedIn = computed(() => !!user.value);

  const setUser = (data: UserDto | undefined | null) => {
    user.value = data;
  };

  return {
    loading,
    user,
    isLoggedIn,
    setUser
  };
};