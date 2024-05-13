import classNames from "classnames";
import ModelSelect from "../model-select";
import { IconHistory, IconSend } from "@douyinfe/semi-icons";
import ModalChatList from "../../chat-list/modal";
import {
  Button,
  Radio,
  RadioGroup,
  TextArea,
  Toast,
  Tooltip,
} from "@douyinfe/semi-ui";
import { KeyboardEvent, useState } from "react";
import { useGlobalStore } from "@/stores";
import { useModalContext } from "@/context/modal-context";
import { useChatStore } from "@/stores/chat";

const ChatForm = ({ className }: { className?: string }) => {
  const { sendMessage, assistant, chat, useContext, setUseContext } =
    useChatStore();
  const { isLogin } = useGlobalStore();
  const { openLoginModal } = useModalContext();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e?: KeyboardEvent<any>) => {
    e?.stopPropagation();
    e?.preventDefault();
    if (!prompt) return;
    if (!isLogin()) return openLoginModal();
    if (assistant && assistant.isEdit) return Toast.warning("请先保存");
    setLoading(true);
    try {
      await sendMessage(prompt);
      setPrompt("");
    } catch (error: any) {
      Toast.error(error.message || "发送失败");
    }
    setLoading(false);
  };

  return (
    <div
      className={classNames(
        "border-t border-border bg-gray-100 pb-[max(var(--safe-area-inset-bottom),12px)] pt-3 sticky bottom-0 z-10 px-5",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 justify-between">
        <ModelSelect />
        <div className="flex gap-1">
          <RadioGroup
            type="button"
            disabled={!!chat}
            value={chat ? chat.use_context : useContext}
            onChange={(e) => setUseContext(e.target.value)}
          >
            <Tooltip
              content={`每次问答记忆上下文内容，并且会带上之前的内容计算算力, 此模式会增加算力消耗`}
              position="topRight"
            >
              <Radio value={1}>记忆模式</Radio>
            </Tooltip>
            <Tooltip
              content={`每次问答独立,不记忆上下文内容，不会产生额外的算力消耗.`}
              position="topRight"
            >
              <Radio value={0}>独立模式</Radio>
            </Tooltip>
          </RadioGroup>
          <ModalChatList>
            <IconHistory className="text-text-1 md:hidden" />
          </ModalChatList>
        </div>
      </div>
      <div className="mt-3 transition-all">
        <div className="relative overflow-hidden rounded-lg h-full">
          <TextArea
            rows={4}
            cols={20}
            className="overflow-y-auto rounded-lg pb-12"
            placeholder={`${assistant?.hello_msg ?? "输入消息"}（Enter 发送）`}
            value={prompt}
            onChange={(value) => setPrompt(value)}
            onEnterPress={onSubmit}
          />
          <div className="absolute bottom-0 w-full flex justify-between gap-2 p-2">
            <div></div>
            <div className="flex items-center gap-2">
              <Button
                type="primary"
                theme={!prompt ? "light" : "solid"}
                disabled={!prompt}
                loading={loading}
                icon={<IconSend />}
                onClick={() => onSubmit()}
              >
                发送
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatForm;
