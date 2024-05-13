import { Avatar, Button, Spin, Toast } from "@douyinfe/semi-ui";
import { IconArrowLeft } from "@douyinfe/semi-icons";
import { useRouter } from "next/navigation";
import { jsonParse } from "@/utils/libs";
import AssisantPanelSkeleton from "./skeleton";
import { useChatStore } from "@/stores/chat";
import { useRequest } from "ahooks";

const AssisantPanel = () => {
  const router = useRouter();
  const { isBuilder, assistant, sendMessage } = useChatStore((state) => ({
    isBuilder: state.isBuilder,
    assistant: state.assistant,
    sendMessage: state.sendMessage,
  }));

  const suggestions = jsonParse<string[]>(assistant?.suggestions, []);

  const { loading, run: onSendMessage } = useRequest(sendMessage, {
    manual: true,
    onError: (e: any) => {
      Toast.error(e.message);
    },
  });

  return (
    <div className="relative flex flex-col h-full">
      {!isBuilder && (
        <div className="flex w-full h-14 items-center gap-2 border-b px-5">
          <Button
            type="tertiary"
            icon={<IconArrowLeft />}
            onClick={router.back}
          />
        </div>
      )}
      <AssisantPanelSkeleton
        loading={!assistant}
        wrapperClassName="h-full flex items-center"
        className="flex flex-1 flex-col gap-1 items-center justify-center pb-10"
      >
        <Avatar size="large" src={assistant?.icon} />
        <div className="text-base font-semibold mt-5 text-text-1">
          {assistant?.name}
        </div>
        <div className="text-sm text-text-2">{assistant?.desc}</div>
      </AssisantPanelSkeleton>
      <div className="absolute bottom-0 w-full text-text-0 p-5">
        <div className="text-sm mb-3"> {assistant?.hello_msg}</div>
        <div className="grid grid-cols-2 gap-3">
          {suggestions?.map(
            (item, index) =>
              item && (
                <div
                  key={index}
                  className="w-full flex justify-between items-center cursor-pointer overflow-hidden rounded-lg border border-border px-3 h-9 text-sm text-text-0 bg-white"
                  onClick={() => onSendMessage(item)}
                >
                  {item}
                  <Spin
                    spinning={loading}
                    size="small"
                    wrapperClassName="leading-[14px]"
                  />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default AssisantPanel;
