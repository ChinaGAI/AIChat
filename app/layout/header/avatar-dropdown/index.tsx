import { Avatar, Dropdown, Modal, Switch } from "@douyinfe/semi-ui";
import { IconExit, IconMoon, IconUserCircle } from "@douyinfe/semi-icons";
import { useGlobalStore } from "@/stores";
import { useRouter } from "next-nprogress-bar";
import numeral from "@/utils/numeral";

const AvatarDropdown = () => {
  const { userProfile, isDark, setTheme, logout, fetchUserProfile } =
    useGlobalStore();

  const router = useRouter();

  const onLogout = () => {
    Modal.warning({
      title: "确定退出吗",
      centered: true,
      okButtonProps: {
        type: "danger",
      },
      onOk: logout,
    });
  };

  return (
    <Dropdown
      trigger={"click"}
      position={"bottomRight"}
      onVisibleChange={(visible) => visible && fetchUserProfile()}
      render={
        <Dropdown.Menu className="min-w-40 ">
          <Dropdown.Item
            icon={<Avatar src={userProfile?.avatar} size="small" />}
          >
            <div className="flex flex-col h-12 justify-center">
              <div className="whitespace-nowrap">{userProfile?.nickname}</div>
              <div className="text-xs text-text-2">
                余额: {numeral(userProfile?.tokens).format("0.[00]ac")}
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            icon={<IconUserCircle />}
            onClick={() => router.push("/user")}
          >
            个人中心
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item icon={<IconMoon />}>
            <div className="flex w-full justify-between items-center">
              暗黑主题
              <Switch
                size="small"
                checked={isDark}
                onChange={(value) => setTheme(value ? "dark" : "light")}
              />
            </div>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item icon={<IconExit />} onClick={onLogout}>
            退出登录
          </Dropdown.Item>
        </Dropdown.Menu>
      }
    >
      <Avatar src={userProfile?.avatar} size="small" />
    </Dropdown>
  );
};

export default AvatarDropdown;
