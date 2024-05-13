"use server";
import { THEME_KEY } from "@/config";
import { cookies } from "next/headers";
export type ThemeEnum = "light" | "dark";

export type CommonState = {
  isDark: boolean;
  config: API.Config;
};

export const initialCommonState: CommonState = {
  isDark: (cookies().get(THEME_KEY)?.value as ThemeEnum) === "dark",
  config: {} as API.Config,
};
