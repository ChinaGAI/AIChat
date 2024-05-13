"use client";
import { useGlobalStore } from "@/stores";
import { useModalContext } from "@/context/modal-context";
import {
  IconMail,
  IconMoneyExchangeStroked,
  IconSetting,
  IconSettingStroked,
  IconTaskMoneyStroked,
  IconUser,
  IconUserStroked,
} from "@douyinfe/semi-icons";
import { Banner, TabPane, Tabs } from "@douyinfe/semi-ui";
import UserAccount from "./user-account";
import classNames from "classnames";
import { useState } from "react";
import UserSetting from "./user-setting";
import UserBill from "./user-bill";
import { flatMap } from "lodash";
import BillDetails from "./bill-details";
import { useRouter, useSearchParams } from "next/navigation";

type Nav = {
  title: string;
  children: {
    title: string;
    key: string;
    icon: JSX.Element;
    activeIcon?: JSX.Element;
    component: JSX.Element;
  }[];
};

const UserView = () => {
  const { userProfile } = useGlobalStore();
  const router = useRouter();
  const defaultNav = useSearchParams().get("nav") ?? "user-account";

  const [current, setCurrent] = useState(defaultNav);

  if (!userProfile)
    return <Banner type="warning" title="请先登录" closeIcon={null} />;

  const navs: Nav[] = [
    {
      title: "账户",
      children: [
        {
          title: "我的账户",
          key: "user-account",
          icon: <IconMoneyExchangeStroked />,
          component: <UserBill />,
        },
        {
          title: "账单明细",
          key: "bill-details",
          icon: <IconTaskMoneyStroked />,
          component: <BillDetails />,
        },
      ],
    },
    {
      title: "设置",
      children: [
        {
          title: "我的信息",
          key: "user-info",
          icon: <IconUserStroked />,
          activeIcon: <IconUser />,
          component: <UserAccount />,
        },
        {
          title: "账号设置",
          key: "user-setting",
          icon: <IconSettingStroked />,
          activeIcon: <IconSetting />,
          component: <UserSetting />,
        },
      ],
    },
  ];

  const redirect = (key: string) => {
    setCurrent(key);
    router.replace(`/user?nav=${key}`);
  };

  return (
    <Tabs
      lazyRender
      tabPaneMotion={false}
      activeKey={current}
      onChange={(key) => setCurrent(key)}
      className="flex bg-gray-200 rounded-lg overflow-hidden flex-col md:flex-row min-h-full"
      contentStyle={{
        flex: 1,
      }}
      renderTabBar={() => (
        <div className="md:min-w-[200px] p-4 border-r shrink-1 flex flex-col items-start">
          <div className="hidden md:block mb-8 ml-2 text-sm sm:text-base font-medium leading-6 text-text-0">
            个人中心
          </div>
          {navs.map((nav, index) => (
            <div className="w-full" key={index}>
              <div className="mb-4">
                <div className="px-2 mb-1.5 text-xs font-bold text-text-2 leading-6 ">
                  {nav.title}
                </div>
                <div className="flex md:block">
                  {nav.children.map((nav, index) => (
                    <div
                      key={index}
                      onClick={() => redirect(nav.key)}
                      className={classNames(
                        "flex items-center h-[37px] mb-[2px] text-sm cursor-pointer rounded-lg  space-x-2 px-2",
                        current === nav.key
                          ? "font-bold text-primary bg-blue-400/20"
                          : "text-text-2"
                      )}
                    >
                      {(current === nav.key ? nav.activeIcon : nav.icon) ??
                        nav.icon}
                      <span>{nav.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    >
      {flatMap(navs, (nav) => nav.children).map((nav) => (
        <TabPane
          key={nav.key}
          itemKey={nav.key}
          tab={nav.title}
          className="flex-1 sm:px-6 px-4"
        >
          <div className="py-4 flex items-center h-14 mb-4 text-base font-bold text-text-0 z-20">
            {nav.title}
          </div>
          <div className="sm:px-2 pb-8">{nav.component}</div>
        </TabPane>
      ))}
    </Tabs>
  );
};

export default UserView;
