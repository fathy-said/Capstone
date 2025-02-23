import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { fetchUser } from "../hooks/auth";

export interface UseAuthInterface {
  user?: any;
  permissions?: [];
  token?: string | null;
  isLoading: boolean;
  isLoggedIn?: boolean;
  me: () => void;
  setUser: (e) => void;
  setPermissions: (e) => void;
  setToken: (e) => void;
}

export const useAuth = create<UseAuthInterface>((set) => {
  return {
    isLoggedIn: false,
    isLoading: true,
    user: null,
    token: null,
    permissions: [],

    me: async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;
        const user = await fetchUser();
        if (user) {
          // console.log(
          //   user?.permissions?.length ? "permissions======" : "roles======"
          // );
          // console.log(
          //   user?.permissions?.length
          //     ? user?.permissions
          //     : user?.roles?.[0].permissions
          // );
          const getPermissions: any[] = [
            ...user?.permissions,
            ...(user?.roles?.[0]?.permissions || []),
          ];

          set(() => ({
            user,
            token,
            isLoggedIn: true,
            permissions: getPermissions as [],
          }));
        }
      } catch (e) {
        set(() => ({ user: null, isLoggedIn: false }));
        localStorage.removeItem("token");
      } finally {
        set(() => ({ isLoading: false }));
      }
    },
    setUser(user) {
      set(() => ({ user, isLoggedIn: !!user }));
    },
    setPermissions(permissions: any) {
      set(() => ({
        permissions,
        isLoggedIn: permissions?.length > 0 ? true : false,
      }));
    },
    setToken(token) {
      set(() => ({ token }));
    },
  };
});

if (import.meta.env.VITE_NODE_ENV === "development") {
  mountStoreDevtool("Auth", useAuth);
}
