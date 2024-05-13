"use client";
import zh_CN from "@douyinfe/semi-ui/lib/es/locale/source/zh_CN";
import { LocaleProvider, Spin } from "@douyinfe/semi-ui";
import { PropsWithChildren, useEffect, useState } from "react";
import { useGlobalStore } from "@/stores";
import { useMount, useRequest } from "ahooks";
import { getUserToken } from "@/utils/storage";

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const { config, fetchConfig, fetchUserProfile } = useGlobalStore();
  const isLoaded = !!config;

  useMount(() => {
    fetchConfig();
    getUserToken() && fetchUserProfile();
  });

  return (
    <LocaleProvider locale={zh_CN}>
      <Spin spinning={!isLoaded} wrapperClassName="min-h-screen w-full bg-gray-100">
        {isLoaded && children}
      </Spin>
    </LocaleProvider>
  );
};
