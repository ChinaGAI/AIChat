import { StateCreator } from "zustand/vanilla";
import { Modal } from "@douyinfe/semi-ui";
import { removeUserToken } from "@/utils/storage";
import { getUser } from "@/servers/api/user";
import { GlobalStore } from "../../store";
import { useChatStore } from "@/stores/chat";

export interface UserAction {
  updateUserProfile: (user: Partial<API.UserProfile>) => void;
  fetchUserProfile: () => void;
  logout: () => void;
  isLogin: () => boolean;
}

export const createUserSlice: StateCreator<
  GlobalStore,
  [["zustand/immer", never]],
  [],
  UserAction
> = (set, get) => ({
  isLogin: () => !!get().userProfile,
  updateUserProfile: (userProfile: Partial<API.UserProfile>) => {
    set((state) => {
      state.userProfile = {
        ...state.userProfile!,
        ...userProfile,
      };
    });
  },
  fetchUserProfile: async () => {
    const userProfile = await getUser();
    set({ userProfile });
  },
  logout: () => {
    // await getUserLogout();
    set({ userProfile: undefined });
    removeUserToken();
    useChatStore.getState().clearUserData();
  },
});
