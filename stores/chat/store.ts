import { StateCreator } from "zustand";
import { ChatState, initialState } from "./initial-state";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { persist } from "zustand/middleware";
import { APP_PREFIX } from "@/config";
import {
  AssistantAction,
  createAssistantSlice,
} from "./slices/assistant/action";
import { createMessageSlice, MessageAction } from "./slices/message/action";
import { createModelSlice, ModelAction } from "./slices/model/action";
import { CommonAction, createCommonSlice } from "./slices/common/action";
import { immer } from "zustand/middleware/immer";
import { fromPairs, toPairs } from "lodash";

export type ChatStore = ChatState &
  CommonAction &
  AssistantAction &
  MessageAction &
  ModelAction;

const createStore: StateCreator<ChatStore, [["zustand/immer", never]]> = (
  ...parameters
) => ({
  ...initialState,
  ...createCommonSlice(...parameters),
  ...createAssistantSlice(...parameters),
  ...createMessageSlice(...parameters),
  ...createModelSlice(...parameters),
});

export const useChatStore = createWithEqualityFn<ChatStore>()(
  persist(immer(createStore), {
    name: `${APP_PREFIX}_CHAT_STORE`,
    partialize: (state) =>
      fromPairs(
        toPairs(state).filter(([key]) =>
          [
            "platforms",
            "models",
            "model",
            "tags",
            "assistants",
            "useContext",
          ].includes(key)
        )
      ),
  }),
  shallow
);
