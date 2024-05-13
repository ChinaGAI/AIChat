"use client";
import { useGlobalStore } from "@/stores";
import {
  Button,
  Image,
  Modal,
  Popconfirm,
  Skeleton,
  Toast,
  Typography,
} from "@douyinfe/semi-ui";
import { IconClose, IconAlertTriangle } from "@douyinfe/semi-icons";
import classNames from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { useModalContext } from "@/context/modal-context";
import moment from "@/utils/moment";
import { stopPropagation } from "@/utils/libs";
import { useChatStore } from "@/stores/chat";
import { useRequest } from "ahooks";
import FadeOutSkeleton from "../../base/fade-out-skeleton";
import { useEffect } from "react";

const ChatList = () => {
  const router = useRouter();
  const id = useSearchParams().get("id");

  const { isLogin } = useGlobalStore();
  const { openLoginModal } = useModalContext();
  const {
    chats,
    total,
    chat,
    selectChat,
    selectModel,
    deleteChat,
    resetMessages,
    fetchChats,
    selectAssistant,
  } = useChatStore();
  const { loading, run: onLoadMore } = useRequest(fetchChats, {
    ready: isLogin(),
    cacheKey: "chats",
    manual: !!chats.length,
  });

  const chatId = chat?.id ?? id;

  const onGoChat = (chat: API.Chat) => {
    router.push(`/chat?id=${chat.id}`);
    selectChat(chat);
    selectModel(chat.model_id);
    resetMessages();
  };

  const onNewChat = () => {
    router.push(`/chat`);
    selectChat();
    resetMessages();
    selectAssistant();
  };

  useEffect(() => {
    !id && selectChat();
  }, [id]);

  const onDeleteChat = (chatId: string) => {
    Modal.warning({
      title: "确认删除对话吗？",
      content: "删除后将无法恢复",
      centered: true,
      okType: "danger",
      onOk: async () => {
        try {
          await deleteChat(chatId);
          chat && onNewChat();
        } catch (e: any) {
          Toast.error(e.message || "请求失败");
        }
      },
    });
  };

  return (
    <div className="overflow-y-auto flex-1 px-5 pt-5">
      {isLogin() ? (
        <div>
          <div
            className={classNames(
              !chatId ? "border-brand-3" : "border-transparent",
              "box-border overflow-hidden rounded-lg bg-white p-3 text-sm semi-card-shadows-hover cursor-pointer flex items-center justify-center gap-2 border-[2px] font-semibold text-text-1"
            )}
            onClick={onNewChat}
          >
            新的聊天
          </div>
          <div className="flex flex-col gap-2 pb-10 mt-5">
            {chats.map((item, index) => (
              <div
                onClick={() => onGoChat(item)}
                key={item.id}
                className={classNames(
                  chatId === item.id ? "border-brand-3" : "border-transparent",
                  "group box-border overflow-hidden rounded-lg bg-white p-3 text-sm semi-card-shadows-hover cursor-pointer relative border-[2px]"
                )}
              >
                <div className="flex items-center justify-between font-semibold text-text-0">
                  <Typography.Text ellipsis>{item.title}</Typography.Text>
                  <div
                    className="group-hover:flex  items-center h-5 hidden"
                    onClick={stopPropagation}
                  >
                    <Button
                      size="small"
                      theme="borderless"
                      icon={<IconClose className="text-danger text-xs " />}
                      onClick={() => onDeleteChat(item.id)}
                    />
                  </div>
                </div>
                <div className="mt-2 flex justify-between text-xs text-text-2">
                  <div className="flex gap-1">
                    <Image
                      src={item.role.icon}
                      width="16"
                      height="16"
                      className="w-4 h-4 rounded-sm"
                      preview={false}
                      alt=""
                    />
                    {item.role.name}
                  </div>
                  {moment(item.updated_at).format("YYYY/MM/DD HH:mm")}
                </div>
              </div>
            ))}
            {!loading && total > chats.length && (
              <div
                className="flex justify-center mt-3 text-text-2 text-xs cursor-pointer"
                onClick={onLoadMore}
              >
                点击加载更多
              </div>
            )}
            <FadeOutSkeleton
              loading={loading}
              placeholder={
                <div className="overflow-hidden rounded-lg bg-white p-3 text-sm cursor-pointer relative">
                  <Skeleton.Paragraph className="w-32 mb-3" rows={1} />
                  <Skeleton.Paragraph className="w-full" rows={1} />
                </div>
              }
            />
          </div>
        </div>
      ) : (
        <Button
          size="large"
          type="primary"
          theme="solid"
          className="w-full"
          onClick={openLoginModal}
        >
          登录开始聊天
        </Button>
      )}
    </div>
  );
};

export default ChatList;
