"use client";
import FormCodeInput from "@/app/components/form/code-input";
import SuccessRedirect from "@/app/components/base/success-redirect";
import { postUserRegister } from "@/servers/api/user";
import { Button, Card, Form, Toast, Typography } from "@douyinfe/semi-ui";
import { FormApi } from "@douyinfe/semi-ui/lib/es/form";
import { useRequest } from "ahooks";
import { notFound, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useGlobalStore } from "@/stores";
import { postEmail } from "@/servers/api/global";

type SignupForm = Parameters<typeof postUserRegister>[0];

const Signup = () => {
  const formRef = useRef<FormApi<SignupForm>>();
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const {
    config: { password_login_enable },
  } = useGlobalStore();

  const { run: onSubmit, loading } = useRequest(postUserRegister, {
    manual: true,
    async onSuccess() {
      setSuccess(true);
    },
    onError: (e: any) => {
      Toast.error(e.message || "登录失败");
    },
  });

  if (!password_login_enable) return notFound();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <Typography.Title>注册账号</Typography.Title>
      <Card className="w-96 mt-8 shadow-sm" bordered={false}>
        {success ? (
          <SuccessRedirect
            time={3}
            message={(ct) => `注册成功, ${ct}s后自动跳转至登录页`}
            onEnd={() => {
              window.opener && window.close();
              router.push("/");
            }}
          />
        ) : (
          <Form<SignupForm> onSubmit={onSubmit} getFormApi={(ref) => (formRef.current = ref)}>
            <Form.Input
              label="账号"
              field="username"
              size="large"
              showClear
              rules={[{ required: true, message: "请输入账号" }]}
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
              validate={(value, values) => (value === values.password ? "" : "两次密码不一致")}
              rules={[{ required: true, message: "请输重复密码" }]}
            />
            <Form.Input
              label="邮箱"
              field="email"
              size="large"
              showClear
              rules={[
                { required: true, message: "请输如邮箱" },
                { type: "email", message: "请输入正确的邮箱" },
              ]}
            />
            <FormCodeInput
              dependencyValidate={async () => await formRef.current?.validate(["email"])}
              request={async (captcha) => {
                await postEmail({
                  captcha,
                  scene: "signup",
                  email: formRef.current?.getValue("email")!,
                });
              }}
            />
            <Button
              htmlType="submit"
              loading={loading}
              type="primary"
              theme="solid"
              size="large"
              className="w-full my-5"
            >
              注册
            </Button>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default Signup;
