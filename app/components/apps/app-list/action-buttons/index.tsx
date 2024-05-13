"use client";
import { postRoleLike } from "@/servers/api/role";
import { Button, Toast } from "@douyinfe/semi-ui";
import { useGetState, useRequest } from "ahooks";
import { useGlobalStore } from "@/stores";
import { useModalContext } from "@/context/modal-context";
import { IconStar, IconStarStroked } from "@douyinfe/semi-icons";
import { useRouter } from "next-nprogress-bar";
import { useChatStore } from "@/stores/chat";
import { useState } from "react";

const ActionButtons = ({ assistant }: { assistant: API.ChatAssistant }) => {
  const [isLike, setLike] = useState(assistant.is_like);

  const { isLogin } = useGlobalStore();
  const { openLoginModal } = useModalContext();
  const { selectAssistant, toggleCollectAssistant, selectChat } =
    useChatStore();
  const router = useRouter();

  const onRoleSelect = (assistant: API.ChatAssistant) => {
    selectAssistant(assistant);
    selectChat(undefined);
    router.push(`/chat?assistant_id=${assistant.id}`);
  };

  const { run, loading } = useRequest(() => toggleCollectAssistant(assistant), {
    manual: true,
    onSuccess: () => {
      setLike(!isLike);
      !isLike ? Toast.success("收藏成功") : Toast.warning("已取消收藏");
    },
    onError: (e) => {
      Toast.error(e.message || "请求出错");
    },
  });

  return (
    <>
      <Button
        size="small"
        theme="borderless"
        loading={loading}
        onClick={() => (isLogin() ? run() : openLoginModal())}
        {...(isLike
          ? {
              type: "primary",
              icon: <IconStar />,
            }
          : {
              type: "tertiary",
              icon: <IconStarStroked />,
            })}
      ></Button>
      <Button
        size="small"
        theme="solid"
        onClick={() => {
          onRoleSelect(assistant);
        }}
      >
        聊聊
      </Button>
    </>
  );
};

export default ActionButtons;
