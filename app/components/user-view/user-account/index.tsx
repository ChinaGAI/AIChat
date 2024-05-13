import { useGlobalStore } from "@/stores";
import { Avatar, Button, Form, Input, Toast } from "@douyinfe/semi-ui";
import ImageUpload from "../../base/image-upload";
import { useRequest } from "ahooks";
import { postUserUpdateData } from "@/servers/api/user";
import { FormApi } from "@douyinfe/semi-ui/lib/es/form";
import { useRef } from "react";

const UserAccount = () => {
  const { userProfile, updateUserProfile } = useGlobalStore();
  const formRef = useRef<FormApi>();

  const { loading, run: updateProfile } = useRequest(
    async () => {
      await formRef.current?.validate();
      const values = formRef.current?.getValues();
      await postUserUpdateData(values);
      updateUserProfile(values);
    },
    {
      manual: true,
      onSuccess: () => {
        Toast.success("更新成功");
      },
      onError: (e) => {
        e?.message && Toast.error(e.message);
      },
    }
  );

  return (
    <Form
      initValues={userProfile}
      getFormApi={(ref) => (formRef.current = ref)}
    >
      <ImageUpload
        fieldClassName="!pt-0"
        label="头像"
        field="avatar"
        avatarProps={{ shape: "circle" }}
      />
      <Form.Input
        field="nickname"
        label="昵称"
        rules={[{ required: true, message: "请输入昵称" }]}
      />
      <Form.Input field="username" label="用户名" disabled />
      <Button
        className="my-4"
        type="primary"
        theme="solid"
        block
        htmlType="submit"
        loading={loading}
        onClick={updateProfile}
      >
        保存
      </Button>
    </Form>
  );
};

export default UserAccount;
