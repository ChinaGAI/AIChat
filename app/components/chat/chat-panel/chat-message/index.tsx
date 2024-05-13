import moment from "@/utils/moment";
import { Avatar, Button, Spin, Toast } from "@douyinfe/semi-ui";
import classNames from "classnames";
import { Markdown } from "../../../base/markdown";
import { useEffect, useRef, useState } from "react";
import { useGlobalStore } from "@/stores";
import { useChatStore } from "@/stores/chat";
import { IconRefresh, IconStop } from "@douyinfe/semi-icons";
import { postChatStop } from "@/servers/api/chat";
import { useRafInterval } from "ahooks";
import { Message } from "@/utils/scoket";
import { IconCopy } from "@/app/components/base/icons";
import copy from "copy-to-clipboard";

type ChatMessageProps = {
  message: API.ChatMessage;
};

const ChatMessage = ({ message }: ChatMessageProps) => {
  const { chat, messages, sendMessage, retry } = useChatStore((state) => ({
    chat: state.chat,
    messages: state.messages,
    sendMessage: state.sendMessage,
    retry: state.retry,
  }));
  const { userProfile } = useGlobalStore();
  const { content, created_at, replying } = message;
  const isPrompt = message.type === "prompt";

  const onCopy = () => {
    copy(content);
    Toast.success("复制成功");
  };

  const isLastMessage = () => {
    return messages[messages.length - 1].id === message.id;
  };

  return (
    <div
      className={classNames(
        isPrompt ? "justify-end" : "justify-start",
        "flex pt-6"
      )}
    >
      <div className="relative flex max-w-[90%] flex-col ">
        <div className="flex items-start space-x-2">
          {!isPrompt && (
            <Avatar size="small" alt="User" src={chat?.role?.icon} />
          )}
          <div className="flex-1 flex flex-col w-[calc(100%-40px)]">
            <div
              className={classNames(
                isPrompt ? "justify-end" : "justify-start",
                "relative flex group/message"
              )}
            >
              <div
                className={classNames(
                  "absolute group-hover/message:opacity-100 group-hover/message:translate-x-0 text-xs opacity-0 transition-all flex duration-300 gap-2 text-primary -top-8 py-2 whitespace-nowrap cursor-pointer",
                  isPrompt ? "right-0 -translate-x-5 " : "left-0 translate-x-5"
                )}
              >
                {!isPrompt && isLastMessage() && (
                  <span
                    className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-all"
                    onClick={retry}
                  >
                    <IconRefresh size="small" />
                    重试
                  </span>
                )}
                <span
                  className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-all"
                  onClick={onCopy}
                >
                  <IconCopy size="small" />
                  复制
                </span>
                <span className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-all">
                  算力 -{message.tokens}
                </span>
              </div>
              <div
                className={classNames(
                  isPrompt ? "bg-[#D1E9FF]/50 " : "bg-white",
                  "markdown-body relative inline-block overflow-hidden w-auto max-w-full rounded-lg  px-3 py-2 min-h-9"
                )}
              >
                {!content && replying ? (
                  <Spin size="small" wrapperClassName="align-middle" />
                ) : (
                  <Markdown content={content} />
                )}
              </div>
            </div>
            <div
              className={classNames(
                isPrompt ? " justify-end" : "justify-start",
                "mt-2 flex w-full text-xs text-text-3"
              )}
            >
              {moment(created_at).format("YYYY/MM/DD HH:mm")}
            </div>
          </div>
          {isPrompt && (
            <Avatar size="small" alt="User" src={userProfile?.avatar} />
          )}
        </div>
      </div>
    </div>
  );
};

export const ReplyingMessage = ({ onReplying }: { onReplying: () => void }) => {
  const { stopReplying, replyingMessage, socket, retry } = useChatStore(
    (state) => ({
      stopReplying: state.stopReplying,
      replyingMessage: state.replyingMessage,
      socket: state.socket,
      retry: state.retry,
    })
  );
  const { stopId, replying, error } = replyingMessage!;
  const [displayText, setDisplayText] = useState("");
  const currentIndex = useRef(0);
  const content = useRef(replyingMessage!.content);

  const onMessage = (data: Message) => {
    if (data.status === "Replying") content.current += data.content ?? "";
  };

  useEffect(() => {
    socket?.addEvent("message", onMessage);
    return () => socket?.removeEvent("message", onMessage);
  }, []);

  useEffect(() => {
    onReplying();
    if (!replying && displayText === content.current) {
      stopReplying(displayText);
    }
  }, [displayText]);

  useRafInterval(() => {
    const index = currentIndex.current;
    if (index < content.current.length) {
      setDisplayText((prevText) => prevText + content.current[index]);
      currentIndex.current++;
    }
  }, 16);

  const onStopReplying = () => {
    if (!displayText.length) return;
    stopReplying(displayText);
    postChatStop({
      stop_id: stopId,
      index: displayText.length,
      last_msg: displayText.slice(-5),
    });
  };

  return (
    <div className={classNames("relative", error && "error")}>
      <ChatMessage
        message={{
          ...replyingMessage!,
          content: displayText,
        }}
      />
      <div className="absolute flex w-full justify-center mt-2">
        {error ? (
          <Button type="danger" icon={<IconRefresh />} onClick={retry}>
            重试
          </Button>
        ) : (
          <Button type="danger" icon={<IconStop />} onClick={onStopReplying}>
            停止回复
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
