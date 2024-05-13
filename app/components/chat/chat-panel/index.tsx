"use client";
import { useEffect, useRef } from "react";
import { useAsyncEffect, useMount, useRequest } from "ahooks";
import ChatMessage, { ReplyingMessage } from "./chat-message";
import { useGlobalStore } from "@/stores";
import AssisantPanel from "./assistant-panel";
import ChatHeader from "./chat-header";
import ChatMessageSkeleton from "./chat-message/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import ChatForm from "./chat-form";
import { useChatStore } from "@/stores/chat";
import StarGudie from "./start-guide";
import MessagePanel from "./message-panel";
import { Toast } from "@douyinfe/semi-ui";

const ChatPanel = () => {
  const router = useRouter();
  const {
    messages,
    chat,
    fetchChat,
    fetchMessages,
    selectAssistant,
    fetchAssistant,
  } = useChatStore();

  const assistantId = useSearchParams().get("assistant_id");
  const chatId = useSearchParams().get("id");

  const { loading } = useRequest(fetchMessages, {
    ready: !!chat?.id && !messages.length,
    refreshDeps: [chat?.id],
  });

  useEffect(() => {
    chatId &&
      fetchChat(chatId).catch(() => {
        router.push("/chat");
      });
  }, []);

  useEffect(() => {
    assistantId
      ? fetchAssistant(assistantId).catch(() => {
          router.push("/chat");
          Toast.error("助手不存在");
        })
      : selectAssistant();
  }, [assistantId]);

  return (
    <div className="flex w-full flex-col overflow-hidden h-full flex-1 bg-gray-100">
      {chatId && <MessagePanel loading={loading || !chat} />}
      {assistantId && <AssisantPanel />}
      {!chatId && !assistantId && <StarGudie />}
      <ChatForm />
    </div>
  );
};

export default ChatPanel;
