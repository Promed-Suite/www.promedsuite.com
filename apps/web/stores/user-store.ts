import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { User } from "@/lib/auth/auth-client";

type IUserStore = {
  user: User | undefined;
  actions: {
    setUser: (user: User | undefined) => void;
    clearUser: () => void;
  };
};

const initialState = {
  user: undefined,
};

const useUserStore = create<IUserStore>()(
  persist(
    set => ({
      ...initialState,
      actions: {
        setUser: user =>
          set({
            user,
          }),

        clearUser: () => {
          localStorage.removeItem("auth-storage");
          set(initialState);
        },
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useUserData = () => useUserStore(state => state.user);

export const useUserActions = () => useUserStore(state => state.actions);
