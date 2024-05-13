"use client";
import { useState } from "react";
import copy from "copy-to-clipboard";
import { Tooltip } from "@douyinfe/semi-ui";
import { IconCopied, IconCopy } from "../../icons";
import classNames from "classnames";

type ICopyButtonProps = {
  value: string;
  className?: string;
  isPlain?: boolean;
};

const CopyButton = ({ value, className, isPlain }: ICopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const Icon = isCopied ? IconCopied : IconCopy;

  return (
    <div className={`${className}`}>
      <Tooltip content={isCopied ? "已复制" : "复制"} className="z-10">
        <div
          className={classNames(
            "box-border p-0.5 flex items-center justify-center rounded-md  cursor-pointer",
            isPlain ? "" : "bg-white"
          )}
          style={
            !isPlain
              ? {
                  boxShadow: "0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
                }
              : {}
          }
          onClick={() => {
            copy(value);
            setIsCopied(true);
          }}
        >
          <Icon
            className={`w-6 h-6 rounded-md hover:bg-gray-50 items-center justify-center flex hover:text-primary`}
          ></Icon>
        </div>
      </Tooltip>
    </div>
  );
};

export default CopyButton;
