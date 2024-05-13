import { SideSheet } from "@douyinfe/semi-ui";
import { useBoolean } from "ahooks";
import { Children, PropsWithChildren, cloneElement, useEffect } from "react";
import ChatList from ".";
import { useSearchParams } from "next/navigation";

type ModalChatListProps = PropsWithChildren<{}>;

const ModalChatList = ({ children }: ModalChatListProps) => {
  const [visible, { toggle, setFalse }] = useBoolean(false);
  const id = useSearchParams().get("id");

  useEffect(() => {
    setFalse();
  }, [id]);

  return (
    <>
      {Children.map(children, (child, index) =>
        cloneElement(child as any, {
          onClick: toggle,
        })
      )}
      <SideSheet
        title="对话列表"
        visible={visible}
        onCancel={toggle}
        footer={null}
        width={"100vw"}
        bodyStyle={{
          margin: "0 -24px",
          background: "var(--semi-color-default)",
        }}
      >
        <ChatList />
      </SideSheet>
    </>
  );
};

export default ModalChatList;
