"use client";
import FormCodeInput from "@/app/components/form/code-input";
import SuccessRedirect from "@/app/components/base/success-redirect";
import { Button, Card, Form, Toast, Typography } from "@douyinfe/semi-ui";
import { FormApi } from "@douyinfe/semi-ui/lib/es/form";
import { useRequest } from "ahooks";
import { notFound, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useGlobalStore } from "@/stores";
import { postEmail } from "@/servers/api/global";

const PasswordReset = () => {
  const formRef = useRef<FormApi<any>>();
  const router = useRouter();

  const [success, setSuccess] = useState(false);

  const { config } = useGlobalStore();

  const { run: onSubmit, loading } = useRequest(async () => {}, {
    manual: true,
    async onSuccess() {
      setSuccess(true);
    },
    onError: (e: any) => {
      Toast.error(e.message || "重置失败");
    },
  });

  if (!config.password_login_enable) return notFound();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <Typography.Title>重置密码</Typography.Title>
      <Card className="w-96 mt-8 shadow-sm" bordered={false}>
        {success ? (
          <SuccessRedirect
            time={3}
            message={(ct) => `重置成功, ${ct}s后自动跳转至登录页`}
            onEnd={() => {
              window.opener && window.close();
              router.push("/");
            }}
          />
        ) : (
          <Form
            onSubmit={onSubmit}
            getFormApi={(ref) => (formRef.current = ref)}
          >
            <Form.Input
              label="邮箱"
              field="email"
              size="large"
              showClear
              rules={[
                { required: true, message: "请输入邮箱" },
                { type: "email", message: "请输入正确的邮箱" },
              ]}
            />
            <FormCodeInput
              dependencyValidate={async () =>
                await formRef.current?.validate(["email"])
              }
              request={async (captcha) => {
                await postEmail({
                  captcha,
                  scene: "reset",
                  email: formRef.current?.getValue("email"),
                });
              }}
            />
            <Form.Input
              label="密码"
              field="password"
              size="large"
              mode="password"
              showClear
              rules={[
                { required: true, message: "请输入密码" },
                { min: 8, message: "密码长度至少8位" },
              ]}
            />
            <Form.Input
              label="重复密码"
              field="repass"
              mode="password"
              size="large"
              showClear
              validate={(value, values) =>
                value === values.password ? "" : "两次密码不一致"
              }
              rules={[{ required: true, message: "请输重复密码" }]}
            />
            <Button
              htmlType="submit"
              loading={loading}
              type="primary"
              theme="solid"
              size="large"
              className="w-full my-5"
            >
              重置
            </Button>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default PasswordReset;
