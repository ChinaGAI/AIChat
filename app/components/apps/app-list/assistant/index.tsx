import { Avatar, Card, Typography } from "@douyinfe/semi-ui";
import ActionButtons from "../action-buttons";

const Assistant = ({ assistant }: { assistant: API.ChatAssistant }) => {
  return (
    <Card
      key={assistant.id}
      className="rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out cursor-pointer group "
      bodyStyle={{ padding: "12px" }}
      bordered={false}
    >
      <div className="flex items-center">
        <Avatar shape="square" size="large" src={assistant.icon} />
        <div className="w-[calc(100%-72px)] pl-4">
          <div className="flex w-full justify-between items-center leading-6 font-semibold">
            <Typography.Text className="flex-1 h-6" ellipsis={{ rows: 1 }}>
              {assistant.name}
            </Typography.Text>
            <div className="space-x-1 flex sm:hidden  group-hover:flex">
              <ActionButtons assistant={assistant} />
            </div>
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
        </div>
      </div>
    </Card>
  );
};

export default Assistant;
