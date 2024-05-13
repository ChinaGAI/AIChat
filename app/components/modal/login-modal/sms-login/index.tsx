import FormCodeInput from "@/app/components/form/code-input";
import { postLoginSms, postSms } from "@/servers/api/global";
import { Button, Form, Toast } from "@douyinfe/semi-ui";
import { FormApi } from "@douyinfe/semi-ui/lib/es/form";
import { useRequest } from "ahooks";
import { useRef } from "react";

const SmsLogin = ({ onSuccess }: { onSuccess: (token: string) => void }) => {
  const formRef = useRef<FormApi<any>>();

  const { run: onLogin, loading } = useRequest(postLoginSms, {
    manual: true,
    onSuccess: ({ token }) => onSuccess(token),
    onError: (e: any) => {
      Toast.error(e.message || "登录失败");
    },
  });

  return (
    <Form onSubmit={onLogin} getFormApi={(ref) => (formRef.current = ref)}>
      <Form.Input
        label="手机号"
        field="phone"
        size="large"
        prefix="+86"
        showClear
        maxLength={11}
        rules={[
          { required: true, message: "请输入手机号" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "请输入正确的手机号",
          },
        ]}
      />
      <FormCodeInput
        dependencyValidate={async () =>
          await formRef.current?.validate(["phone"])
        }
        request={async (captcha) => {
          await postSms({
            captcha,
            scene: "login",
            phone: formRef.current?.getValue("phone"),
          });
        }}
      />
      <div className="text-sm text-text-2 mt-3">
        登录 / 使用代表您已同意 <a className="cursor-pointer">用户协议</a> 和{" "}
        <a className="cursor-pointer">隐私策略</a>
      </div>
      <Button
        htmlType="submit"
        loading={loading}
        type="primary"
        theme="solid"
        size="large"
        className="w-full my-5"
      >
        登录 / 注册
      </Button>
    </Form>
  );
};
export default SmsLogin;
