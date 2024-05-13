import { AssistantState, initialAssistantState } from "./slices/assistant/initial-state";
import { CommonState, initialCommonState } from "./slices/common/initial-state";
import { initialMessageState, MessageState } from "./slices/message/initial-state";
import { initialModelState, ModelState } from "./slices/model/initial-state";

export type ChatState = CommonState & AssistantState & MessageState & ModelState;

export const initialState: ChatState = {
  ...initialCommonState,
  ...initialAssistantState,
  ...initialModelState,
  ...initialMessageState,
};
