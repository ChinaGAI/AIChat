import { Form, Modal, Toast } from "@douyinfe/semi-ui";
import { useRef, useState } from "react";
import FormCodeInput from "../../form/code-input";
import { FormApi } from "@douyinfe/semi-ui/lib/es/form";
import { postUserBind } from "@/servers/api/user";
import { useGlobalStore } from "@/stores";
import { postSms } from "@/servers/api/global";

const BindPhoneButton = () => {
  const [visible, setVisible] = useState(false);
  const formRef = useRef<FormApi>();
  const { updateUserProfile } = useGlobalStore();

  const onSubmit = async () => {
    await formRef.current?.validate();
    const values = formRef.current?.getValues();
    try {
      await postUserBind({
        type: "phone",
        ...values,
      });
      Toast.success("绑定手机号成功");
      updateUserProfile({
        phone: values.phone,
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
        title="绑定手机号"
        onOk={onSubmit}
      >
        <Form getFormApi={(ref) => (formRef.current = ref)}>
          <Form.Input
            label="手机号"
            field="phone"
            placeholder="请输入手机号"
            size="large"
            rules={[{ required: true, message: "请输入手机号" }]}
          />
          <FormCodeInput
            field="code"
            dependencyValidate={async () =>
              await formRef.current?.validate(["phone"])
            }
            request={async (captcha) => {
              await postSms({
                captcha,
                scene: "bind",
                phone: formRef.current?.getValue("phone"),
              });
            }}
          />
        </Form>
      </Modal>
      <a onClick={() => setVisible(true)}>点击绑定手机号</a>
    </>
  );
};

export default BindPhoneButton;
