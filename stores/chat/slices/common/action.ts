import { useContext } from "react";
import { StateCreator } from "zustand/vanilla";
import { ChatStore } from "../../store";
import { deleteChat, getChatDetail, getChatList } from "@/servers/api/chat";
import { initialState } from "../../initial-state";
import { keys, omit } from "lodash";
import { initialModelState } from "../model/initial-state";

export interface CommonAction {
  setUseContext: (value: 1 | 0) => void;
  selectChat: (chat?: API.Chat) => void;
  updateChatTitle: (title: string) => Promise<void>;
  deleteChat: (chatId: string) => Promise<void>;
  clearUserData: () => void;

  fetchChat: (chatId: string) => Promise<void>;
  fetchChats: () => Promise<void>;
  reloadChats: () => void;
}

export const createCommonSlice: StateCreator<ChatStore, [["zustand/immer", never]], [], CommonAction> = (set, get) => ({
  setUseContext: (useContext: 1 | 0) => set({ useContext }),
  selectChat: (chat) => {
    set({ chat });
  },
  updateChatTitle: async (title) => {
    set((state) => {
      state.chat!.title = title;
      const chat = state.chats.find((c) => c.id === state.chat!.id);
      if (chat) chat.title = title;
    });
  },
  deleteChat: async (chatId) => {
    await deleteChat({
      chat_id: chatId,
    });
    get().reloadChats();
    set((state) => {
      state.chats = state.chats.filter((c) => c.id !== chatId);
      if (chatId === state.chat?.id) state.chat = undefined;
    });
  },
  clearUserData: () => {
    set(omit(initialState, keys(initialModelState)));
  },

  fetchChat: async (chatId) => {
    const chat = await getChatDetail({ chat_id: chatId });
    set({ chat });
  },
  fetchChats: async () => {
    const { page } = get();
    const { list, total } = await getChatList({
      page,
      page_size: 15,
    });
    set((state) => {
      if (page !== state.page) return;
      state.chats.push(...list);
      state.page = state.page + 1;
      state.total = total;
    });
  },
  reloadChats: async () => {
    const { page } = get();
    const { list, total } = await getChatList({
      page: 1,
      page_size: 15 * (page - 1),
    });
    set({ chats: list, total });
  },
});
