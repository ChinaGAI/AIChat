"use client";
import { useEffect, useRef } from "react";
import { useChatStore } from "@/stores/chat";
import ChatHeader from "../chat-header";
import ChatMessageSkeleton from "../chat-message/skeleton";
import ChatMessage, { ReplyingMessage } from "../chat-message";

const MessagePanel = ({ loading }: { loading?: boolean }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { replyingMessage, messages } = useChatStore();

  const onScrollEnd = () => {
    scrollRef.current?.scrollTo(0, scrollRef?.current.scrollHeight);
  };

  useEffect(onScrollEnd, [messages, replyingMessage]);

  return (
    <div className="flex flex-col items-center flex-1 h-full">
      <ChatHeader />
      <div className="flex w-full flex-1 flex-col overflow-hidden mb-[max(var(--safe-area-inset-bottom),210px)]">
        <ChatMessageSkeleton
          loading={!!loading}
          className="h-full"
          wrapperClassName="h-full"
        >
          <div ref={scrollRef} className="overflow-y-auto  h-full">
            <div className="relative flex-1 flex-col px-5 pb-16 pt-4">
              {messages?.map((message, index) => (
                <ChatMessage message={message} key={index} />
              ))}
              {replyingMessage && (
                <ReplyingMessage
                  key={replyingMessage?.error?.toString()}
                  onReplying={onScrollEnd}
                />
              )}
            </div>
          </div>
        </ChatMessageSkeleton>
      </div>
    </div>
  );
};

export default MessagePanel;
