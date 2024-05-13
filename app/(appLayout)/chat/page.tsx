import ChatPanel from "@/app/components/chat/chat-panel";
import ChatList from "@/app/components/chat/chat-list";
import { getModelList } from "@/servers/api/model";

const Chat = () => {
  return (
    <div className="h-[calc(100vh-3.5rem)] w-screen">
      <div className="flex h-full w-full flex-row overflow-hidden">
        <div className="hidden w-[301px] flex-col border-r border-border bg-fill-0 md:flex h-full">
          <ChatList />
        </div>
        <ChatPanel />
      </div>
    </div>
  );
};

export default Chat;
