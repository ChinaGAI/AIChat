import classNames from "classnames";
import { DetailedHTMLProps, PropsWithChildren } from "react";

type NavLinkProps = PropsWithChildren<{
  active?: boolean;
}> &
  DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const NavLink = ({ active, children, ...props }: NavLinkProps) => {
  return (
    <div
      {...props}
      className={classNames(
        "flex gap-3 items-center font-medium cursor-pointer",
        active ? "text-primary" : "text-text-1",
        props.className
      )}
    >
      {children}
    </div>
  );
};

export default NavLink;
