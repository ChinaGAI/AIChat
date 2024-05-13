import { StateCreator } from "zustand/vanilla";
import { ChatStore } from "../../store";
import { getModelList } from "@/servers/api/model";
import { flatMap } from "lodash";

export interface ModelAction {
  selectModel: (modelId: string) => void;
  fetchModels: () => Promise<void>;
}

export const createModelSlice: StateCreator<ChatStore, [["zustand/immer", never]], [], ModelAction> = (set, get) => ({
  selectModel: (model) => {
    const models = get().models;
    const selectedModel = models.find((item) => item.id === model);
    set({ model: selectedModel });
  },
  fetchModels: async () => {
    const platforms = await getModelList();
    set((state) => {
      state.platforms = platforms;
      state.models = flatMap(platforms, (item) => item.chat_models);
      if (!state.model.id) state.model = state.models[0];
    });
  },
});
