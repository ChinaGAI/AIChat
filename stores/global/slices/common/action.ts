import Cookies from "js-cookie";
import { StateCreator } from "zustand/vanilla";
import { ThemeEnum } from "./initial-state";
import { THEME_KEY } from "@/config";
import { GlobalStore } from "../../store";
import { getConfig } from "@/servers/api/global";

export interface CommonAction {
  setTheme: (theme: ThemeEnum) => void;
  fetchConfig: () => void;
}

export const createCommonSlice: StateCreator<
  GlobalStore,
  [],
  [],
  CommonAction
> = (set, get) => ({
  setTheme: (theme) => {
    set({ isDark: theme === "dark" });
    document.body.setAttribute("theme-mode", theme);
    Cookies.set(THEME_KEY, theme);
  },
  fetchConfig: async () => {
    const config = await getConfig();
    set({ config });
  },
});
