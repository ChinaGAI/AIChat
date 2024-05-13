import { StateCreator } from "zustand/vanilla";
import { ChatStore } from "../../store";
import {
  getChatHistory,
  postChatMessage,
  postChatNewMessage,
} from "@/servers/api/chat";
import { stringify } from "querystring";
import { getUserToken } from "@/utils/storage";
import WebSocketClient from "@/utils/scoket";
import { WS_HOST } from "@/config";
import { UUID } from "@/utils/libs";
import { assign, filter, last } from "lodash";
import { useGlobalStore } from "@/stores/global";

export interface MessageAction {
  stopReplying: (stopText?: string) => void;
  resetMessages: () => void;
  socketConnect: () => Promise<string>;
  sendMessage: (prompt: string, isRetry?: boolean) => Promise<void>;
  fetchMessages: () => Promise<void>;
  retry: () => Promise<void>;
}

export const createMessageSlice: StateCreator<
  ChatStore,
  [["zustand/immer", never]],
  [],
  MessageAction
> = (set, get) => ({
  resetMessages: () => {
    set({ messages: [], replyingMessage: undefined });
  },
  stopReplying: (stopText) => {
    set((state) => {
      const { replyingMessage, messages } = state;
      stopText && assign(replyingMessage, { content: stopText });
      replyingMessage && messages.push(replyingMessage);
      state.replyingMessage = undefined;
    });
  },
  socketConnect: () => {
    if (get().socket?.isReady()) return Promise.resolve(get().socket!.clientId);
    return new Promise((resolve, reject) => {
      const query = stringify({
        token: getUserToken(),
      });
      const socket = new WebSocketClient({
        url: `${WS_HOST}?${query}`,
        onOpen: () => {
          console.log("connect success", socket.clientId);

          set({ socket });
          resolve(socket.clientId);
        },
        onMessage: ({ status, stop_id }) => {
          if (!get().replyingMessage) return;
          if (status === "Start") {
            set((state) => {
              state.replyingMessage!.stopId = stop_id;
            });
          }
          if (status === "End") {
            set((state) => {
              state.replyingMessage!.replying = false;
            });
          }
        },
        onError: reject,
      }).connect();
    });
  },
  sendMessage: async (prompt, isRetry) => {
    const {
      socketConnect,
      chat,
      assistant,
      model,
      socket,
      useContext,
      isBuilder,
    } = get();
    if (!useGlobalStore.getState().userProfile) {
      return Promise.reject({ message: "请先登录" });
    }
    if (isBuilder && assistant) {
      if (!assistant.id) {
        return Promise.reject({ message: "请先创建角色" });
      }
      if (assistant.isEdit) {
        return Promise.reject({ message: "请先保存角色" });
      }
    }
    if (!socket?.clientId) await socketConnect();
    const clientId = get().socket!.clientId;
    let tokens = 0;
    if (!chat?.id) {
      // 创建对话
      const { chat, prompt_token } = await postChatNewMessage({
        client_id: clientId,
        content: prompt,
        role_id: assistant?.id,
        model_id: model.id,
        use_context: useContext,
        is_temp: isBuilder,
      });
      tokens = prompt_token;
      set((state) => {
        state.chat = chat;
        state.chats.unshift(chat);
      });
      get().reloadChats();
      get().resetMessages();
      if (!isBuilder) {
        history.pushState(null, "", `?id=${chat.id}`);
      }
    }
    let promptId = UUID();
    const replyId = UUID();
    set((state) => {
      if (isRetry) {
        let lastMessage = state.messages[state.messages.length - 1];
        if (lastMessage.type === "reply") state.messages.pop();
        lastMessage = state.messages[state.messages.length - 1];
        promptId = lastMessage.id;
      } else {
        state.messages.push({
          id: promptId,
          type: "prompt",
          content: prompt,
          created_at: Date.now(),
          tokens,
        });
      }
      state.replyingMessage = {
        id: replyId,
        type: "reply",
        content: "",
        created_at: Date.now(),
        tokens: 0,
        replying: true,
      };
    });
    postChatMessage({
      client_id: clientId,
      chat_id: get().chat!.id,
      content: prompt,
      is_retry: isRetry,
    })
      .then(({ prompt_token, reply_token }) => {
        set((state) => {
          //修改token值
          state.messages.find((item) => item.id === promptId)!.tokens =
            prompt_token;
          if (state.replyingMessage) state.replyingMessage.tokens = reply_token;
          else
            state.messages.find((item) => item.id === replyId)!.tokens =
              reply_token;
        });
      })
      .catch((err: any) => {
        set((state) => {
          state.replyingMessage!.content = err?.message || "请求出错";
          state.replyingMessage!.error = true;
        });
      });
  },
  retry: async () => {
    const { messages, sendMessage } = get();
    const lastPromptMessage = last(
      filter(messages, (m) => m.type === "prompt")
    );
    sendMessage(lastPromptMessage!.content, true);
  },
  fetchMessages: async () => {
    const chatId = get().chat?.id;
    if (!chatId) return;
    const messages = await getChatHistory({
      chat_id: chatId,
    });
    set({ messages });
  },
});
