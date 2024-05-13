import cn from "classnames";
import Link from "next/link";
import { PropsWithChildren } from "react";

type TabButtonProps = PropsWithChildren<{
  active?: boolean;
  href?: string;
  icon?: React.ReactNode;
}>;

const TabButton = ({ active, href = "", icon, children }: TabButtonProps) => {
  return (
    <Link href={href}>
      <div
        className={cn(
          "flex items-center rounded-xl  text-sm h-8 font-medium  cursor-pointer px-2.5 gap-2",
          active
            ? "shadow-md text-primary bg-white"
            : "text-text-2 hover:bg-fill-0 hover:text-primary "
        )}
      >
        {icon}
        <div className="flex-1">{children}</div>
      </div>
    </Link>
  );
};

export default TabButton;
