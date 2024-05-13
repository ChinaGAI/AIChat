"use client";
import { IconSearch } from "@douyinfe/semi-icons";
import { Button, Input } from "@douyinfe/semi-ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const AppSearch = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [value, setValue] = useState(keyword || "");
  const router = useRouter();

  const onSearch = () => {
    if (value) {
      router.push(`/apps?keyword=${value}`);
    }
  };

  return (
    <>
      <Input
        prefix={<IconSearch />}
        placeholder="搜索应用"
        size="large"
        className="mb-5"
        value={value}
        onChange={(value) => setValue(value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      ></Input>
    </>
  );
};

export default AppSearch;
