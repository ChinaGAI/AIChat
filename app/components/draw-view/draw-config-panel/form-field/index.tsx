import { IconInfoCircle } from "@douyinfe/semi-icons";
import { Card, Tooltip } from "@douyinfe/semi-ui";
import React, { PropsWithChildren, ReactNode } from "react";

type FormFiledProps = PropsWithChildren<{
  icon: ReactNode;
  label: string;
  tooltip?: string;
  noStyle?: boolean;
}>;

const FormFiled = ({
  icon,
  label,
  tooltip,
  noStyle,
  children,
}: FormFiledProps) => {
  return (
    <Card bodyStyle={{ padding: "4px" }} className="mb-2">
      <div className="flex items-center gap-2 text-xs font-semibold mb-2">
        {icon}
        <div className="flex items-center gap-1">
          {label}
          {tooltip && (
            <Tooltip content={tooltip}>
              <IconInfoCircle size="small" />
            </Tooltip>
          )}
        </div>
      </div>
      {noStyle ? (
        React.Children.map(children, (child) => {
          // 使用 cloneElement 来添加类名
          return React.cloneElement(child as any, {
            className: `w-full`,
            fieldStyle: { padding: 0 },
          });
        })
      ) : (
        <div className="rounded-md bg-fill-0 hover:bg-fill-1 cursor-pointer">
          {children}
        </div>
      )}
    </Card>
  );
};

export default FormFiled;
