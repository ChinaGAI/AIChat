export interface AssistantState {
  assistant?: API.ChatAssistant & { isEdit?: boolean };
  userAssistants: API.ChatAssistant[];
  collectAssistants: API.ChatAssistant[];
}

export const initialAssistantState: AssistantState = {
  userAssistants: [],
  collectAssistants: [],
};
