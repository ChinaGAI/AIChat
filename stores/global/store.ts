import { StateCreator } from "zustand";
import { GlobalState, initialState } from "./initial-state";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { persist } from "zustand/middleware";
import { APP_PREFIX } from "@/config";
import { CommonAction, createCommonSlice } from "./slices/common/action";
import { createUserSlice, UserAction } from "./slices/user/action";
import { createCacheSlice, CacheAction } from "./slices/cache/action";
import { immer } from "zustand/middleware/immer";

export type GlobalStore = GlobalState & CommonAction & UserAction & CacheAction;

const createStore: StateCreator<GlobalStore, []> = (...parameters) => ({
  ...initialState,
  ...createCommonSlice(...parameters),
  ...createUserSlice(...parameters),
  ...createCacheSlice(...parameters),
});

export const useGlobalStore = createWithEqualityFn<GlobalStore>()(
  persist(immer(createStore), {
    name: `${APP_PREFIX}_GLOBAL_STORE`,
  }),
  shallow
);
