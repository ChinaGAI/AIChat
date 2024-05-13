import AppList from "@/app/components/apps/app-list";
import AppsSkeleton from "@/app/components/apps/app-list/skeleton";
import UserAssistant from "@/app/components/apps/app-list/user-assistant";
import UserAssistantSkeleton from "@/app/components/apps/app-list/user-assistant/skeleton";
import { IconShop } from "@/app/components/base/icons";
import { useGlobalStore } from "@/stores";
import { useChatStore } from "@/stores/chat";
import { IconPlus } from "@douyinfe/semi-icons";
import { Button, Empty, Radio, RadioGroup, Tabs } from "@douyinfe/semi-ui";
import { useLocalStorageState, useRequest } from "ahooks";
import classNames from "classnames";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";

const StarGudie = ({ className }: { className?: string }) => {
  const [chatType, setChatType] = useLocalStorageState("chat_type", {
    defaultValue: 1,
  });
  const { isLogin } = useGlobalStore((state) => ({
    isLogin: state.isLogin,
  }));
  const {
    collectAssistants,
    fetchCollectAssistants,
    userAssistants,
    fetchUserAssistants,
  } = useChatStore((state) => ({
    collectAssistants: state.collectAssistants,
    fetchCollectAssistants: state.fetchCollectAssistants,
    userAssistants: state.userAssistants,
    fetchUserAssistants: state.fetchUserAssistants,
  }));
  const router = useRouter();

  const {} = useRequest(fetchCollectAssistants, {
    cacheKey: "collectAssistants",
    ready: isLogin(),
  });

  const { loading } = useRequest(fetchUserAssistants, {
    cacheKey: "userAssistants",
    ready: isLogin(),
  });

  return (
    <div
      className={classNames(
        "flex flex-col items-center flex-1 px-5 pb-10 h-full overflow-y-auto",
        className
      )}
    >
      <div className="flex flex-col items-center py-5 md:mt-10">
        <div className="text-[28px] font-semibold md:text-[36px] text-text-0">
          今天聊点啥
        </div>
      </div>
      <div className="flex flex-col items-center my-4 mb-8">
        <span className="text-xs font-medium text-text-2 mb-2">
          选择开始的方式
        </span>
        <RadioGroup
          type="button"
          buttonSize="large"
          value={chatType}
          onChange={(e) => setChatType(e.target.value)}
        >
          <Radio value={1}>直接开聊</Radio>
          <Radio value={2}>来个助手</Radio>
        </RadioGroup>
      </div>
      {chatType === 2 && (
        <>
          <Tabs
            size="small"
            className="w-full max-w-7xl"
            tabPaneMotion={false}
            tabBarExtraContent={
              <div className="h-full flex items-center">
                <Button
                  icon={<IconShop size="small" />}
                  size="small"
                  className="text-xs mr-2"
                  onClick={() => router.push("/apps")}
                >
                  添加助手
                </Button>
                <Button
                  icon={<IconPlus size="small" />}
                  size="small"
                  className="text-xs"
                  onClick={() => router.push("/apps/builder")}
                >
                  创建助手
                </Button>
              </div>
            }
          >
            <Tabs.TabPane tab="我的" itemKey="1" className="py-2">
              <UserAssistantSkeleton
                loading={loading && !userAssistants?.length}
                className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3"
              >
                {userAssistants?.map((assistant) => (
                  <UserAssistant key={assistant.id} assistant={assistant} />
                ))}
              </UserAssistantSkeleton>
              {!loading && !userAssistants?.length && (
                <Empty
                  className="-mt-[284px]"
                  image={
                    <Image
                      src="/images/empty.svg"
                      alt="empty"
                      width={200}
                      height={200}
                    />
                  }
                  title={"暂无助手, 快去创建一个吧"}
                  description={
                    <Button
                      type="primary"
                      theme="solid"
                      onClick={() => router.push("/apps/builder")}
                    >
                      创建助手
                    </Button>
                  }
                />
              )}
            </Tabs.TabPane>
            <Tabs.TabPane tab="收藏" itemKey="2" className="py-2">
              <AppList apps={collectAssistants} />
              {!loading && !collectAssistants?.length && (
                <Empty
                  image={
                    <Image
                      src="/images/empty.svg"
                      alt="empty"
                      width={200}
                      height={200}
                    />
                  }
                  title={"暂无助手, 快去收藏一个吧"}
                  description={
                    <Button
                      type="primary"
                      theme="solid"
                      onClick={() => router.push("/apps")}
                    >
                      助手广场
                    </Button>
                  }
                />
              )}
            </Tabs.TabPane>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default StarGudie;
