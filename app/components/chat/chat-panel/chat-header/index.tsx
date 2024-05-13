import EditButton from "./edit-button";
import { Button, Skeleton } from "@douyinfe/semi-ui";
import { IconArrowLeft } from "@douyinfe/semi-icons";
import { useChatStore } from "@/stores/chat";
import FadeOutSkeleton from "@/app/components/base/fade-out-skeleton";
import { useRouter } from "next/navigation";

const ChatHeader = () => {
  const { isBuilder, resetMessages, chat, selectChat } = useChatStore();

  return (
    <div className="flex w-full h-14 items-center gap-2 border-b px-5  justify-between ">
      <div className="font-semibold flex text-lg text-text-1">
        {isBuilder ? (
          <Button
            type="tertiary"
            icon={<IconArrowLeft />}
            onClick={() => {
              selectChat();
            }}
            className="mr-3"
          />
        ) : null}
        <FadeOutSkeleton
          className="h-8 leading-8"
          loading={!chat}
          placeholder={<Skeleton.Title className="w-32 h-8" />}
        >
          {chat?.title}
        </FadeOutSkeleton>
      </div>
      <div>
        <EditButton />
      </div>
    </div>
  );
};

export default ChatHeader;
