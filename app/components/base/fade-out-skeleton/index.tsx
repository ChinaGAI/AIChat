import useTimeoutBoolean from "@/hooks/use-timeout-boolean";
import { Skeleton } from "@douyinfe/semi-ui";
import classNames from "classnames";
import { PropsWithChildren } from "react";

export type SkeletonProps = PropsWithChildren<{
  loading: boolean;
  placeholder?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}>;

const FadeOutSkeleton = ({
  loading,
  placeholder,
  children,
  className,
  wrapperClassName,
}: SkeletonProps) => {
  return (
    <>
      <div className={classNames(wrapperClassName, "relative")}>
        <div
          className={classNames(
            `transition-all duration-300 absolute top-0 left-0 w-full h-full z-10`,
            loading ? "opacity-100" : "opacity-0 pointer-events-none",
            className
          )}
        >
          {placeholder}
        </div>
        <div
          className={classNames(
            `transition-all duration-150`,
            loading ? "opacity-0" : "opacity-100",
            className
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default FadeOutSkeleton;
