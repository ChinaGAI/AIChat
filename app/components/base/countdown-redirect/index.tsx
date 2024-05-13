"use client";
import { useCountDown } from "ahooks";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

type CountdownRedirectProps = {
  className?: string;
  time?: number;
  onEnd?: () => void;
  message?: (countdown: number) => string;
};

const CountdownRedirect = ({
  onEnd,
  className,
  time = 3,
  message,
}: CountdownRedirectProps) => {
  const router = useRouter();
  const targetDate = useMemo(() => Date.now() + 1000 * time, []);
  const [countdown] = useCountDown({
    targetDate,
    onEnd() {
      onEnd ? onEnd() : router.push("/");
    },
  });

  const countdownTime = Math.round(countdown / 1000);

  return (
    <div className={classNames("mt-8 text-center", className)}>
      {message ? message(countdownTime) : `${countdownTime}s后自动跳转`},{" "}
      <a onClick={onEnd} className="cursor-pointer">
        点击立即跳转
      </a>
    </div>
  );
};

export default CountdownRedirect;
