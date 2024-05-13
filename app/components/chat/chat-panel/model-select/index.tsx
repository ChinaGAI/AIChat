import { Image, Select, Spin } from "@douyinfe/semi-ui";
import { useChatStore } from "@/stores/chat";
import { useRequest } from "ahooks";

const ModelSelect = () => {
  const { platforms, models, model, chat, selectModel, fetchModels } =
    useChatStore();

  const { loading } = useRequest(fetchModels, { cacheKey: "models" });

  return (
    <Spin spinning={loading && !models.length}>
      <Select
        value={model.id}
        onChange={(modelId) => selectModel(modelId as string)}
        disabled={!!chat}
        position="topLeft"
        className="min-w-32"
        dropdownStyle={{
          paddingBottom: ".5rem",
        }}
        renderSelectedItem={({ value }: any) => {
          const model = models.find((item) => item.id === value);
          const platform = platforms.find((item) =>
            item.chat_models.some((model) => model.id === value)
          );
          if (!model || !platform) return null;
          return (
            <div className="flex items-center gap-2">
              <Image
                src={platform.icon}
                width={16}
                height={16}
                className="w-4 h-4 rounded"
                preview={false}
                alt={platform.name}
              />
              <span>{model.name}</span>
            </div>
          );
        }}
      >
        {platforms?.map((item) => (
          <Select.OptGroup label={item.name} key={item.id}>
            {item.chat_models.map((model) => (
              <Select.Option key={model.id} value={model.id}>
                <div className="flex items-center justify-between flex-1 pr-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.icon}
                      width={16}
                      height={16}
                      className="w-4 h-4 rounded"
                      preview={false}
                      alt={item.name}
                    />
                    <span>{model.name}</span>
                  </div>
                  <span className="text-text-3 text-xs font-normal">
                    {+model.magnification === 0
                      ? `免费`
                      : `消耗${model.magnification}倍算力`}
                  </span>
                </div>
              </Select.Option>
            ))}
          </Select.OptGroup>
        ))}
      </Select>
    </Spin>
  );
};

export default ModelSelect;
