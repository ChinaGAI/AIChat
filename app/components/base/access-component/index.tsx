"use client";

import { useGlobalStore } from "@/stores";
import { PropsWithChildren } from "react";

const AccessComponent = ({
  name,
  children,
}: PropsWithChildren<{
  name: keyof API.Config;
}>) => {
  const { config } = useGlobalStore();
  return config[name] ? children : null;
};

export default AccessComponent;
