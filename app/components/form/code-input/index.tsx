import { Button, Form, Modal, Toast } from "@douyinfe/semi-ui";
import { useCountDown, useRequest } from "ahooks";
import { useState } from "react";
import useCaptcha from "@/hooks/use-captcha";

const FormCodeInput = ({
  field = "code",
  request,
  dependencyValidate,
}: {
  field?: string;
  request: (data?: any) => Promise<any>;
  dependencyValidate?: () => Promise<any>;
}) => {
  const [disabled, setDisabled] = useState(false);
  const [targetDate, setTargetDate] = useState<number>();
  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => setDisabled(false),
  });

  const { runAsync: sendCode, loading } = useRequest(request, {
    manual: true,
    onSuccess() {
      setTargetDate(Date.now() + 1000 * 60);
      setDisabled(true);
    },
  });

  const { validate } = useCaptcha({
    onSuccess: async (data) => {
      try {
        await sendCode(data);
      } catch (e: any) {
        Toast.error(e.message || "验证码发送失败");
        return Promise.reject(e);
      }
    },
  });

  const onValidate = async () => {
    if (dependencyValidate) {
      await dependencyValidate();
    }
    await validate();
  };

  return (
    <>
      <Form.Input
        label="验证码"
        field={field}
        size="large"
        maxLength={6}
        suffix={
          <Button
            theme="borderless"
            loading={loading}
            disabled={disabled}
            onClick={onValidate}
          >
            {countdown
              ? `${Math.round(countdown / 1000)}秒后重试`
              : "发送验证码"}
          </Button>
        }
        showClear
        rules={[{ required: true, message: "请输入验证码" }]}
      />
    </>
  );
};

export default FormCodeInput;
