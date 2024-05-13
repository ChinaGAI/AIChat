import {
  Button,
  Image,
  Modal,
  Radio,
  RadioGroup,
  Toast,
  Typography,
} from "@douyinfe/semi-ui";
import { ModalReactProps } from "@douyinfe/semi-ui/lib/es/modal";
import { useState } from "react";
import numeral from "@/utils/numeral";
import { IconAlipay, IconWechat } from "../../../base/icons";
import classNames from "classnames";
import { useRequest } from "ahooks";
import {
  getShop,
  postShopPay,
  postShopPayConfirm,
  postShopWxpay,
} from "@/servers/api/shop";
import { useGlobalStore } from "@/stores";
import { API_PREFIX } from "@/config";
import { stringify } from "querystring";
import { isMobile, isSafari } from "@/utils/libs";

const DefineImage = ({ src }: { src: string }) => {
  return src ? <Image className="w-1/2" src={src} alt="qrcode" /> : null;
};

export type PaymentType = "Wechat" | "Alipay";

const Payment = ({
  config,
  orderId,
  payment,
}: {
  config: API.Config["pay_config"];
  orderId: string;
  payment: PaymentType;
}) => {
  const qrcode =
    config[`${payment.toLowerCase() as Lowercase<PaymentType>}_qrcode`];
  return (
    <>
      <div className="flex gap-3 mb-3 justify-center">
        <DefineImage src={qrcode} />
      </div>
      <div className="text-base font-semibold mb-3">
        <div>
          订单号：
          <Typography.Text copyable className="text-base">
            {orderId}
          </Typography.Text>
        </div>
        支付完成后请添加下方客服，发送支付截图和订单号进行核销
      </div>
      <div className="flex gap-3 justify-center">
        <DefineImage src={config.qq_customer} />
        <DefineImage src={config.wechat_customer} />
      </div>
    </>
  );
};

const PlansModal = (props: ModalReactProps) => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [payment, setPayment] = useState<PaymentType>();

  const { fetchUserProfile } = useGlobalStore();
  const {
    config: { pay_config },
  } = useGlobalStore();
  const { data: plans } = useRequest(() => getShop({ cache: true }));

  const currentPlan = plans?.[current];

  const payConfirm = async (order_id: string) => {
    const { status } = await postShopPayConfirm({
      order_id,
    });
    if (status === "Success") {
      await fetchUserProfile();
      Toast.success("支付成功");
    } else {
      Toast.warning("支付未完成，请稍后再试");
      return Promise.reject();
    }
  };

  const onPay = async () => {
    if (!currentPlan) return;
    if (!payment) return Toast.warning("请选择支付方式");
    const { order_id } = await postShopPay({
      pay_type: payment,
      shop_id: currentPlan.id,
    });
    if (pay_config.type === "Person") {
      Modal.confirm({
        icon: null,
        width: 520,
        centered: true,
        title: `请扫描二维码支付${currentPlan!.price}元`,
        content: (
          <Payment config={pay_config} orderId={order_id} payment={payment} />
        ),
        okText: "支付完成",
        onOk: () => payConfirm(order_id),
      });
    }
    if (pay_config.type === "Enterprise") {
      if (payment === "Wechat" && !isMobile()) {
        const { url } = await postShopWxpay({
          order_id,
          h5: isMobile() ? 1 : 0,
        });
        Modal.confirm({
          icon: null,
          width: 520,
          title: `请使用微信扫描二维码支付`,
          content: (
            <Image
              src={url}
              alt="qrcode"
              width={300}
              height={300}
              preview={false}
              className="mx-auto block mt-4"
            />
          ),
          okText: "支付完成",
          centered: true,
          onOk: () => payConfirm(order_id),
        });
      } else {
        const query = {
          order_id,
          h5: isMobile() ? 1 : 0,
        };
        let url = "";
        if (payment === "Alipay") {
          url = `${API_PREFIX}/shop/alipay?${stringify(query)}`;
        } else {
          const data = await postShopWxpay(query);
          url = data.url;
        }
        if (isSafari()) return (window.location.href = url);
        Modal.confirm({
          icon: null,
          width: 520,
          title: `请在新页面完成支付`,
          okText: "支付完成",
          centered: true,
          onOk: () => payConfirm(order_id),
        });
        window.open(url, "_blank");
      }
    }
  };

  return (
    <>
      <Button
        type="primary"
        theme="solid"
        className="rounded-full"
        onClick={() => setVisible(true)}
      >
        购买套餐
      </Button>
      <Modal
        title="购买套餐"
        {...props}
        width={520}
        centered
        visible={visible}
        onOk={onPay}
        fullScreen={isMobile()}
        onCancel={() => setVisible(false)}
      >
        <div className="text-base font-bold mb-3">选择套餐</div>
        <RadioGroup
          type="pureCard"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          direction="horizontal"
          className="grid-cols-3 grid"
        >
          {plans?.map((item, index) => (
            <Radio
              key={index}
              value={index}
              className={classNames(
                index === current && "!bg-active",
                "block text-center bg-fill-0 transition-all hover:border-primary px-0"
              )}
              addonClassName="block text-center"
              extra={
                <>
                  <div className="text-4xl font-semibold my-2 text-text-0">
                    <span className="text-sm">￥</span>
                    {numeral(item.price).format("0.[00]")}
                  </div>
                  {item.origin_price && (
                    <div className="line-through text-xs text-text-3">
                      ￥{item.origin_price}
                    </div>
                  )}
                </>
              }
            >
              {numeral(item.tokens).format("0.[00]ac")} 算力
            </Radio>
          ))}
        </RadioGroup>
        <div className="text-base font-bold my-3">支付方式</div>
        <RadioGroup
          type="pureCard"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          direction="horizontal"
        >
          {pay_config.wechat_enable && (
            <Radio
              key={"Wechat"}
              value={"Wechat"}
              className={classNames(
                "bg-fill-0",
                payment === "Wechat" && "!bg-active"
              )}
            >
              <span className="mr-2">
                <IconWechat size="extra-large" />
              </span>
              微信支付
            </Radio>
          )}
          {pay_config.alipay_enable && (
            <Radio
              key={"Alipay"}
              value={"Alipay"}
              className={classNames(
                "bg-fill-0",
                payment === "Alipay" && "!bg-active"
              )}
            >
              <span className="mr-2">
                <IconAlipay size="extra-large" />
              </span>
              支付宝支付
            </Radio>
          )}
        </RadioGroup>
      </Modal>
    </>
  );
};

export default PlansModal;
