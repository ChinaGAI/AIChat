import { IconProps } from "@douyinfe/semi-ui/lib/es/icons";

export type IconPropsType = Omit<IconProps, "ref" | "svg"> &
  React.RefAttributes<HTMLSpanElement>;
