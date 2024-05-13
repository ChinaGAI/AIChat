import { StateCreator } from "zustand/vanilla";
import { ChatStore } from "../../store";
import { getUserMyRole, getUserRoleLike } from "@/servers/api/user";
import { getRole, postRoleLike } from "@/servers/api/role";
import { AssistantState } from "./initial-state";

export interface AssistantAction {
  selectAssistant: (assistant?: AssistantState["assistant"]) => void;
  toggleCollectAssistant: (assistant: API.ChatAssistant) => Promise<void>;
  fetchAssistant: (assistantId: string) => Promise<void>;
  fetchCollectAssistants: () => Promise<void>;
  fetchUserAssistants: () => Promise<void>;
}

export const createAssistantSlice: StateCreator<
  ChatStore,
  [["zustand/immer", never]],
  [],
  AssistantAction
> = (set, get) => ({
  selectAssistant: (assistant) => {
    set({ assistant });
  },
  fetchAssistant: async (assistantId) => {
    const assistant = await getRole({ id: assistantId });
    set({ assistant });
  },
  fetchUserAssistants: async () => {
    const { list } = await getUserMyRole({ page_size: 100 });
    set({ userAssistants: list });
  },
  toggleCollectAssistant: async (assistant) => {
    await postRoleLike({
      role_id: assistant.id,
    });
    set(({ collectAssistants }) => {
      const index = collectAssistants.findIndex(
        (item) => item.id === assistant.id
      );
      if (index === -1) {
        collectAssistants.push({
          ...assistant,
          is_like: true,
        });
      } else {
        collectAssistants.splice(index, 1);
      }
    });
  },
  fetchCollectAssistants: async () => {
    const { list } = await getUserRoleLike({ page_size: 100 });
    set({
      collectAssistants: list.map((item) => ({ ...item, is_like: true })),
    });
  },
});
