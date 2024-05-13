export interface ModelState {
  model: API.ChatModel;
  platforms: API.ModelPlatform[];
  models: API.ChatModel[];
}

export const initialModelState: ModelState = {
  model: {} as API.ChatModel,
  platforms: [],
  models: [],
};
