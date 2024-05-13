import { IconEdit } from "@douyinfe/semi-icons";
import { Button, Input, Modal, Toast } from "@douyinfe/semi-ui";
import { useBoolean } from "ahooks";
import { useState } from "react";
import { useChatStore } from "@/stores/chat";

const EditButton = () => {
  const [visible, { setFalse, setTrue }] = useBoolean();
  const { chat, updateChatTitle } = useChatStore();
  const [title, setTite] = useState(chat?.title || "");

  const onSubmit = async () => {
    if (!title) return Toast.error("标题不能为空");
    try {
      await updateChatTitle(title);
      setFalse();
    } catch (error: any) {
      Toast.error(error.message ?? "请求出错");
    }
  };

  return (
    <>
      <Button icon={<IconEdit />} type="tertiary" onClick={setTrue} />
      <Modal title="编辑标题" centered visible={visible} onCancel={setFalse} onOk={onSubmit}>
        <Input value={chat?.title || ""} onChange={setTite} />
      </Modal>
    </>
  );
};

export default EditButton;
