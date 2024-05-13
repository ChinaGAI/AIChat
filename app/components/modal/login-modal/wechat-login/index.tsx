import { postLogin } from "@/servers/api/global";
import { Toast } from "@douyinfe/semi-ui";
import { useRequest } from "ahooks";

const WechatLogin = ({ onSuccess }: { onSuccess: (token: string) => void }) => {
  const { run: onLogin, loading } = useRequest(postLogin, {
    manual: true,
    onSuccess: ({ token }) => onSuccess(token),
    onError: (e: any) => {
      Toast.error(e.message || "登录失败");
    },
  });

  return (
    <div className="h-64 flex justify-center items-center">
      使用微信扫描二维码登录
    </div>
  );
};
export default WechatLogin;
