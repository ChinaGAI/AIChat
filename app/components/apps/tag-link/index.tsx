import classNames from "classnames";
import Link from "next/link";
import { PropsWithChildren } from "react";

type TagLinkProps = PropsWithChildren<{
  href: string;
  active?: boolean;
}>;

const TagLink = ({ active, href, children }: TagLinkProps) => {
  return (
    <Link
      className={classNames(
        "mb-1 flex gap-4 items-center hover:text-primary rounded-lg p-2",
        active ? "text-primary bg-fill-0 " : "text-text-0"
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default TagLink;
