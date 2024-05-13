import { useGlobalStore } from "@/stores";
import { setUserToken } from "@/utils/storage";
import { Modal, TabPane, Tabs } from "@douyinfe/semi-ui";
import { useState } from "react";
import PasswordLogin from "./password-login";
import SmsLogin from "./sms-login";
import WechatLogin from "./wechat-login";
import AccessComponent from "../../base/access-component";
import { isMobile } from "@/utils/libs";

type LoginModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

type Tab = {
  itemKey: keyof API.Config;
  tab: string;
  Component: React.ComponentType<{ onSuccess: (data: string) => void }>;
};

const tabList: Tab[] = [
  {
    itemKey: "password_login_enable",
    tab: "密码登录",
    Component: PasswordLogin,
  },
  { itemKey: "sms_login_enable", tab: "短信登录", Component: SmsLogin },
  {
    itemKey: "wechat_login_enable",
    tab: "微信登录",
    Component: WechatLogin,
  },
];

const LoginModal = ({ visible, setVisible }: LoginModalProps) => {
  const { fetchUserProfile } = useGlobalStore();
  const { config } = useGlobalStore();

  const enableTabList = tabList.filter((item) => config[item.itemKey]);

  const [activeTab, setActiveTab] = useState(enableTabList[0].itemKey);

  const onCancel = () => {
    setVisible(false);
  };

  const onSuccess = (data: string) => {
    setUserToken(data);
    fetchUserProfile?.();
    setVisible(false);
  };

  return (
    <Modal
      title={
        <div className="flex-col flex">
          <div className="mb-2 mt-2 text-xl font-semibold">登录 AI助手</div>
          <div className="text-sm font-normal text-text-2">
            未注册用户首次登录后自动注册
          </div>
        </div>
      }
      fullScreen={isMobile()}
      visible={visible}
      footer={null}
      onCancel={onCancel}
      centered
      width={400}
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab as any}
        tabList={enableTabList}
      >
        {enableTabList.map((item) => (
          <AccessComponent key={item.itemKey} name={item.itemKey}>
            <TabPane itemKey={item.itemKey}>
              <item.Component onSuccess={onSuccess} />
            </TabPane>
          </AccessComponent>
        ))}
      </Tabs>
    </Modal>
  );
};

export default LoginModal;
