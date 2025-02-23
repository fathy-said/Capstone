import {mountStoreDevtool} from "simple-zustand-devtools";
import {create} from "zustand";

export interface UseUtilsInterface {
  sideMenuIsOpen: boolean;
  sideMenuToggle: () => void;
}

export const useUtils = create<UseUtilsInterface>((set) => ({
  sideMenuIsOpen: true,
  sideMenuToggle() {
    set((state) => ({
      sideMenuIsOpen: !state.sideMenuIsOpen,
    }));
  },
}));

if (import.meta.env.VITE_NODE_ENV === "development") {
  mountStoreDevtool("Utils", useUtils);
}
