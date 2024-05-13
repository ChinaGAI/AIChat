import { Form, Modal, Toast } from "@douyinfe/semi-ui";
import { useRef, useState } from "react";
import FormCodeInput from "../../form/code-input";
import { FormApi } from "@douyinfe/semi-ui/lib/es/form";
import { postEmail } from "@/servers/api/global";
import { postUserBind } from "@/servers/api/user";
import { useGlobalStore } from "@/stores";

const BindEmailButton = () => {
  const [visible, setVisible] = useState(false);
  const formRef = useRef<FormApi>();
  const { updateUserProfile } = useGlobalStore();

  const onSubmit = async () => {
    await formRef.current?.validate();
    const values = formRef.current?.getValues();
    try {
      await postUserBind({
        type: "email",
        ...values,
      });
      Toast.success("绑定邮箱成功");
      updateUserProfile({
        email: values.email,
      });
      setVisible(false);
    } catch (e: any) {
      Toast.error(e.message || "绑定失败");
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        title="绑定邮箱"
        onOk={onSubmit}
      >
        <Form getFormApi={(ref) => (formRef.current = ref)}>
          <Form.Input
            label="邮箱"
            field="email"
            placeholder="请输入邮箱"
            size="large"
            rules={[{ required: true, message: "请输入邮箱" }]}
          />
          <FormCodeInput
            field="code"
            dependencyValidate={async () =>
              await formRef.current?.validate(["email"])
            }
            request={async (captcha) => {
              await postEmail({
                captcha,
                scene: "bind",
                email: formRef.current?.getValue("email"),
              });
            }}
          />
        </Form>
      </Modal>
      <a onClick={() => setVisible(true)}>点击绑定邮箱</a>
    </>
  );
};

export default BindEmailButton;
