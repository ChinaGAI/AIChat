import { IconProps } from "@douyinfe/semi-icons";
import * as Icons from "@douyinfe/semi-icons";
import { omit } from "lodash";

const SemiIcons = omit(Icons, ["default", "IconProps", "convertIcon"]);

export type SemiIconName = keyof typeof SemiIcons;
type Props = Omit<Omit<IconProps, "type" | "svg">, "ref"> &
  React.RefAttributes<HTMLSpanElement>;

const SemiIcon = ({ name, ...props }: { name: SemiIconName } & Props) => {
  const Icon = SemiIcons[name] as React.ForwardRefExoticComponent<Props>;
  if (!Icon) return null;
  return <Icon {...props} />;
};

export default SemiIcon;
