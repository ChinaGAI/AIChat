import { postLogin } from "@/servers/api/global";
import { IconArrowRight } from "@douyinfe/semi-icons";
import { Button, Form, Toast } from "@douyinfe/semi-ui";
import { useRequest } from "ahooks";

const PasswordLogin = ({
  onSuccess,
}: {
  onSuccess: (token: string) => void;
}) => {
  const { run: onLogin, loading } = useRequest(postLogin, {
    manual: true,
    onSuccess: ({ token }) => onSuccess(token),
    onError: (e: any) => {
      console.error(e);
      Toast.error(e.message || "登录失败");
    },
  });

  return (
    <Form onSubmit={onLogin}>
      <Form.Input
        label="账号"
        field="account"
        size="large"
        rules={[{ required: true, message: "请输入账号" }]}
      />
      <Form.Input
        label="密码"
        field="password"
        mode="password"
        size="large"
        rules={[{ required: true, message: "请输入密码" }]}
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
        block
        className="mt-5 mb-2"
      >
        登录
      </Button>
      <div className="flex text-xs mb-5 justify-between">
        <a
          className="cursor-pointer"
          onClick={() => window.open("/password-reset", "_blank")}
        >
          忘记密码
        </a>
        <a
          onClick={() => window.open("/signup", "_blank")}
          className="flex items-center space-x-1 cursor-pointer"
        >
          <span>没有账号? 去注册</span> <IconArrowRight size="extra-small" />
        </a>
      </div>
    </Form>
  );
};
export default PasswordLogin;
