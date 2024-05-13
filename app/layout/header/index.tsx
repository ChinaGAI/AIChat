"use client";
import {
  IconChat,
  IconShop,
  IconText2Image,
} from "@/app/components/base/icons";
import TabButton from "./tab-button";
import { useSelectedLayoutSegment } from "next/navigation";
import {
  Avatar,
  Button,
  Modal,
  SideSheet,
  Space,
  Switch,
} from "@douyinfe/semi-ui";
import AvatarDropdown from "./avatar-dropdown";
import { useModalContext } from "@/context/modal-context";
import {
  IconExit,
  IconMenu,
  IconMoon,
  IconPlusCircle,
  IconUserCircle,
} from "@douyinfe/semi-icons";
import { useEffect } from "react";
import { useBoolean } from "ahooks";
import NavLink from "./nav-link";
import Image from "next/image";
import { useGlobalStore } from "@/stores";
import { useRouter } from "next-nprogress-bar";

const Header = () => {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const { userProfile, logout, isLogin, setTheme, isDark } = useGlobalStore();
  const { openLoginModal } = useModalContext();

  const [visible, { toggle, setFalse: closeSide }] = useBoolean(false);

  const tabs = [
    {
      segment: "chat",
      icon: <IconChat size="large" />,
      label: "对话",
    },
    {
      segment: "draw",
      icon: <IconText2Image size="large" />,
      label: "绘图",
    },
    {
      segment: "apps",
      icon: <IconShop size="large" />,
      label: "助手广场",
    },
  ];

  const onLogout = () => {
    closeSide();
    Modal.warning({
      title: "确定退出吗",
      centered: true,
      okButtonProps: {
        type: "danger",
      },
      onOk: logout,
    });
  };

  useEffect(closeSide, [segment]);

  return (
    <header className="grid h-14 grid-cols-2 items-center gap-3 whitespace-nowrap border-b px-5 md:grid-cols-3 md:gap-5 z-50 w-full bg-gray-200 fixed left-0 top-0">
      <div
        className="text-text-0 flex items-center gap-3 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <div>
          <Image src="/logo.png" width={40} height={40} alt="logo" />
        </div>
        <div>
          <div className="text-xl">AI Chat</div>
          <div className="text-xs">智能聊天机器人</div>
        </div>
      </div>
      <div className="hidden flex-1 items-center justify-center gap-4 md:flex">
        {tabs.map((tab, index) => (
          <TabButton
            key={index}
            href={`/${tab.segment}`}
            icon={tab.icon}
            active={segment === tab.segment}
          >
            {tab.label}
          </TabButton>
        ))}
      </div>
      <div className="lg:flex justify-end hidden">
        {isLogin() ? (
          <Space>
            <Button
              theme="borderless"
              type="tertiary"
              icon={<IconPlusCircle />}
              onClick={() => router.push("/apps/builder")}
            >
              创建助手
            </Button>
            <AvatarDropdown />
          </Space>
        ) : (
          <Button type="primary" theme="solid" onClick={openLoginModal}>
            登录/注册
          </Button>
        )}
      </div>
      <div className="flex items-center justify-end gap-4 lg:hidden">
        <IconMenu onClick={toggle} className="cursor-pointer text-text-1" />
        <SideSheet
          visible={visible}
          onCancel={toggle}
          width={280}
          style={{ borderTopLeftRadius: "1rem" }}
          headerStyle={{
            alignItems: "center",
          }}
          bodyStyle={{ padding: 0 }}
          title={
            isLogin() ? (
              <div className="flex gap-2">
                <Avatar src={userProfile?.avatar} size="small" />
                {userProfile?.nickname}
              </div>
            ) : (
              <Button
                type="primary"
                theme="solid"
                onClick={() => {
                  closeSide();
                  openLoginModal();
                }}
              >
                登录/注册
              </Button>
            )
          }
        >
          <div className="border-y px-6 py-5 flex flex-col gap-5">
            {tabs.map((tab) => (
              <NavLink
                key={tab.label}
                active={segment === tab.segment}
                onClick={() => router.push(tab.segment)}
              >
                {tab.icon}
                {tab.label}
              </NavLink>
            ))}
          </div>
          <div className="border-b px-6 py-5 flex flex-col gap-5">
            <NavLink onClick={() => router.push("/user")}>
              <IconMoon />
              <div className="flex justify-between items-center flex-1">
                暗黑主题
                <Switch
                  size="small"
                  checked={isDark}
                  onChange={(value) => setTheme(value ? "dark" : "light")}
                />
              </div>
            </NavLink>
            <NavLink
              active={segment === "user"}
              onClick={() => router.push("/user")}
            >
              <IconUserCircle />
              个人中心
            </NavLink>
          </div>
          {isLogin() ? (
            <div className="border-b px-6 py-5 flex flex-col gap-5">
              <NavLink onClick={onLogout}>
                <IconExit className="w-5" />
                退出
              </NavLink>
            </div>
          ) : null}
        </SideSheet>
      </div>
    </header>
  );
};

export default Header;
