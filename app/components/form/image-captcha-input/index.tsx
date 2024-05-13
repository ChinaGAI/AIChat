import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Button, Image, Input, Modal, Spin, Toast } from "@douyinfe/semi-ui";
import { useBoolean, useRequest } from "ahooks";
import { getCaptchaImage } from "@/servers/api/global";
import { IconRefresh } from "@douyinfe/semi-icons";

type ValidateResult = {
  code: string;
  key: string;
};

const ImageCaptchaInput = ({
  onFinish,
  onCancel,
  length = 6,
}: {
  length?: number;
  onCancel: () => void;
  onFinish: (data: ValidateResult) => Promise<void>;
}) => {
  const [loading, { setTrue, setFalse }] = useBoolean(false);
  const [code, setCode] = useState<string[]>(Array(length).fill("")); // 初始化一个长度为6的数组，每个元素都是空字符串
  const refs = useRef<(HTMLInputElement | null)[]>([]); // 创建一个 ref 数组

  const {
    data,
    refresh,
    loading: captchaLoading,
  } = useRequest(getCaptchaImage);

  useLayoutEffect(() => {
    refs.current[0]?.focus(); // 组件挂载后让第一个输入框获取焦点
  }, []);

  const onSubmit = async (code: string[]) => {
    if (code.some((digit) => !digit)) {
      Toast.error("请输入完整验证码");
      return; // 如果有任意一个输入框的值为空，直接返回
    }
    try {
      setTrue();
      await onFinish({
        code: code.join(""),
        key: data!.key,
      });
      onCancel();
    } catch (e: any) {
      refresh();
      setCode(Array(length).fill(""));
      refs.current[0]?.focus();
    } finally {
      setFalse();
    }
  };

  const onChangeFactory = (index: number) => (value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    const nextEl = refs.current[index + 1];
    if (value && nextEl) {
      // 如果输入了值并且下一个输入框存在
      nextEl.focus(); // 让下一个输入框获取焦点
    }
    if (index === length - 1) {
      refs.current[index]?.blur();
      onSubmit(newCode);
    }
  };

  const onKeyDown = (index: number, e: any) => {
    const prevEl = refs.current[index - 1];
    const value = e.target.value;
    const eventKey = e.key;
    if (!value && e.key === "Backspace" && prevEl) {
      prevEl.focus(); // 让下一个输入框获取焦点
    }
    // 如果按下的是数字键
    if (value && !isNaN(Number(eventKey))) {
      onChangeFactory(index)(eventKey);
    } else if (!value && eventKey === "Backspace" && prevEl) {
      prevEl?.focus(); // 如果按下了删除键并且前一个输入框存在，让前一个输入框获取焦点
    }
  };

  return (
    <div className="pt-4">
      <div className="relative">
        <Button
          className="absolute right-0 top-0 text-text-1 z-10"
          theme="borderless"
          type="tertiary"
          onClick={refresh}
          icon={<IconRefresh spin={captchaLoading} />}
        />
        <Image
          src={data?.img}
          alt="图形验证码"
          className="w-full h-[81px]"
          fallback={<div>加载失败，请重试</div>}
        />
      </div>
      <div className="flex space-x-2 mt-4">
        {code.map((digit, index) => (
          <Input
            key={index}
            value={digit}
            size="large"
            onChange={onChangeFactory(index)}
            onKeyDown={(e) => onKeyDown(index, e)}
            maxLength={1}
            ref={(ref) => (refs.current[index] = ref)} // 将每个输入框的 ref 添加到 ref 数组中
          />
        ))}
      </div>
      <div className="flex justify-end my-6 space-x-3">
        <Button type="tertiary" onClick={onCancel}>
          取消
        </Button>
        <Button theme="solid" onClick={() => onSubmit(code)} loading={loading}>
          确定
        </Button>
      </div>
    </div>
  );
};

export const ModalImageCaptchaInput = ({
  length,
  onSuccess,
}: {
  length?: number;
  onSuccess: (data: ValidateResult) => Promise<void>;
}) => {
  const modal = Modal.warning({
    title: "请输入下方图形验证码",
    icon: null,
    centered: true,
    width: 320,
    content: (
      <ImageCaptchaInput
        length={length}
        onCancel={() => modal.destroy()}
        onFinish={onSuccess}
      />
    ),
    footer: null,
  });
};

export default ImageCaptchaInput;
