import { StateCreator } from "zustand/vanilla";
import { GlobalStore } from "../../store";

export interface CacheAction {
  setRequestCache: (key: string, value: any) => void;
  getRequestCache: (key: string) => any;
}

export const createCacheSlice: StateCreator<
  GlobalStore,
  [["zustand/immer", never]],
  [],
  CacheAction
> = (set, get) => ({
  setRequestCache: (key, value) => {
    set((state) => {
      if (!state.requestCache) state.requestCache = {};
      state.requestCache[key] = value;
    });
  },
  getRequestCache: (key) => {
    return get().requestCache?.[key];
  },
});
