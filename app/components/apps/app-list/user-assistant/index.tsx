import { deleteRole } from "@/servers/api/role";
import { useChatStore } from "@/stores/chat";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Modal,
  Space,
  Toast,
  Typography,
} from "@douyinfe/semi-ui";
import { useRouter } from "next-nprogress-bar";

const UserAssistant = ({ assistant }: { assistant: API.ChatAssistant }) => {
  const router = useRouter();
  const { selectAssistant, selectChat, fetchUserAssistants } = useChatStore(
    (state) => ({
      selectAssistant: state.selectAssistant,
      selectChat: state.selectChat,
      fetchUserAssistants: state.fetchUserAssistants,
    })
  );

  const onRoleSelect = () => {
    selectAssistant(assistant);
    selectChat(undefined);
    router.push(`/chat?assistant_id=${assistant.id}`);
  };

  const onDelete = () => {
    Modal.warning({
      title: "确认删除助手?",
      content: "删除后无法恢复",
      centered: true,
      okType: "danger",
      onOk: async () => {
        try {
          await deleteRole({ id: assistant.id });
          await fetchUserAssistants();
          Toast.success("删除成功");
        } catch (e: any) {
          Toast.error(e.message || "请求出错");
          return Promise.reject(e);
        }
      },
    });
  };

  return (
    <Card
      key={assistant.id}
      className="rounded-lg min-w-52 shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out cursor-pointer "
      bodyStyle={{ padding: "12px" }}
      bordered={false}
      footerLine
      footerStyle={{
        padding: "8px 12px",
      }}
      footer={
        <Space className="justify-center flex">
          <Button
            theme="borderless"
            onClick={() => router.push(`/apps/builder?id=${assistant.id}`)}
          >
            编辑
          </Button>
          <Divider layout="vertical" />
          <Button theme="borderless" onClick={() => onRoleSelect()}>
            对话
          </Button>
          <Divider layout="vertical" />
          <Button type="danger" theme="borderless" onClick={onDelete}>
            删除
          </Button>
        </Space>
      }
    >
      <Avatar
        className="mx-auto block mb-2"
        shape="square"
        size="extra-large"
        src={assistant.icon}
      />
      <div className="flex w-full justify-between items-center leading-6 font-semibold">
        <Typography.Text className="flex-1 h-6" ellipsis={{ rows: 1 }}>
          {assistant.name}
        </Typography.Text>
      </div>

      <Typography.Text
        ellipsis={{
          rows: 2,
          showTooltip: {
            opts: {
              arrowPointAtCenter: false,
              position: "bottom",
            },
          },
        }}
        className="h-10 mt-1 text-text-2"
      >
        {assistant.desc}
      </Typography.Text>
    </Card>
  );
};

export default UserAssistant;
