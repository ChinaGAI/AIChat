import { useGlobalStore } from "@/stores";
import BindEmailButton from "./bind-email";
import BindPhoneButton from "./bind-phone";

const UserSetting = () => {
  const { userProfile, config } = useGlobalStore();

  return (
    <>
      {config.mail_enable && (
        <div className="mb-8">
          <div className="text-sm font-semibold text-text-0 mb-1">邮箱</div>
          <div className="flex items-center justify-between mt-2 w-full h-9 px-3 bg-fill-0 rounded-md text-sm font-normal text-text-1 cursor-pointer group">
            {userProfile?.email || <BindEmailButton />}
          </div>
        </div>
      )}
      <div className="mb-8">
        <div className="text-sm font-semibold text-text-0 mb-1">微信</div>
        <div className="flex items-center justify-between mt-2 w-full h-9 px-3 bg-fill-0 rounded-md text-sm font-normal text-text-1 cursor-pointer group">
          已绑定
        </div>
      </div>
      <div className="mb-8">
        <div className="text-sm font-semibold text-text-0 mb-1">手机号</div>
        <div className="flex items-center justify-between mt-2 w-full h-9 px-3 bg-fill-0 rounded-md text-sm font-normal text-text-1 cursor-pointer group">
          {userProfile?.phone || <BindPhoneButton />}
        </div>
      </div>
      {config.mail_enable && (
        <div className="mb-8">
          <div className="text-sm font-semibold text-text-0 mb-1">密码</div>
          <div className="flex items-center justify-between mt-2 w-full h-9 px-3 bg-fill-0 rounded-md text-sm font-normal text-text-1 cursor-pointer group">
            ******
            <a href="/password-reset" target="_blank">
              修改密码
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default UserSetting;
