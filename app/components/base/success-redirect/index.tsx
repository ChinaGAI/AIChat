import { IconArrowRight } from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";
import { useCountDown } from "ahooks";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import CountdownRedirect from "../countdown-redirect";

type SuccessRedirectProps = {
  className?: string;
  time: number;
  onEnd: () => void;
  message?: (countdown: number) => string;
};

const SuccessRedirect = (props: SuccessRedirectProps) => {
  return (
    <div className={props.className}>
      <Image
        src="/images/success.svg"
        className="w-full m-auto"
        alt=""
        width={345}
        height={310}
      ></Image>
      <CountdownRedirect {...props} />
    </div>
  );
};

export default SuccessRedirect;
