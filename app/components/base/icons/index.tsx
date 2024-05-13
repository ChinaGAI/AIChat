import { Icon } from "@douyinfe/semi-ui";
import { IconPropsType } from "./type";
import Copy from "./assets/copy.svg";
import Copied from "./assets/copied.svg";
import Chat from "./assets/chat.svg";
import Shop from "./assets/shop.svg";
import Text2Image from "./assets/text2-image.svg";
import Alipay from "./assets/alipay.svg";
import Wechat from "./assets/wechat.svg";

const createIconComponent = (svg: React.ReactNode, name: string) => {
  const Component = (props: IconPropsType) => <Icon {...props} svg={svg} />;
  Component.displayName = name;
  return Component;
};

export const IconCopy = createIconComponent(<Copy />, "IconCopy");
export const IconCopied = createIconComponent(<Copied />, "IconCopied");
export const IconChat = createIconComponent(<Chat />, "IconChat");
export const IconShop = createIconComponent(<Shop />, "IconShop");
export const IconText2Image = createIconComponent(
  <Text2Image />,
  "IconText2Image"
);
export const IconAlipay = createIconComponent(<Alipay />, "IconAlipay");
export const IconWechat = createIconComponent(<Wechat />, "IconWechat");
