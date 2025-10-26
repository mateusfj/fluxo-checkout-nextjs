import {
  ICreateUser,
  ILoginUser,
  IUser,
  IUserWithoutPassword,
} from "@/@types/auth/IUser";
import { logout } from "@/utils/functions/actions/logout";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCartStore } from "./use-cart-store";
import { IAuthStore } from "@/@types/auth/IAuthStore";

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set, get) => ({
      users: {},
      currentUser: null,

      register: (user: ICreateUser): IUserWithoutPassword => {
        const existingUser = Object.values(get().users).find(
          (u: IUser) => u.email === user.email
        );

        if (existingUser) {
          throw new Error("Usuário com este e-mail já existe");
        }

        const newUser: IUser = {
          id: crypto.randomUUID(),
          name: user.name,
          email: user.email,
          password: (user as any).password,
        };

        set((state) => ({
          users: {
            ...state.users,
            [newUser.id]: newUser,
          },
        }));

        return newUser;
      },

      login: async (loginData: ILoginUser): Promise<IUserWithoutPassword> => {
        const user = Object.values(get().users).find(
          (u: IUser) => u.email === loginData.email
        );

        if (!user) {
          throw new Error("Usuário não existe");
        }

        if (user.password !== loginData.password) {
          throw new Error("Senha incorreta");
        }

        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        useCartStore.getState().setUserId(user.id);

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Erro ao fazer login");
        }

        await set({ currentUser: user });

        return user;
      },

      logout: (): void => {
        logout();
        set({ currentUser: null });
      },

      getCurrentUser: (): IUser | null => get().currentUser,
    }),
    {
      name: "auth-storage",
    }
  )
);
