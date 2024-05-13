import { initialUserState, UserState } from "./slices/user/initial-state";
import { CommonState, initialCommonState } from "./slices/common/initial-state";
import { CacheState, initialCacheState } from "./slices/cache/initial-state";

export type GlobalState = CommonState & UserState & CacheState;

export const initialState: GlobalState = {
  ...initialCommonState,
  ...initialUserState,
  ...initialCacheState,
};
