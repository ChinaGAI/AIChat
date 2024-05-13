import { useBoolean } from "ahooks";
import { useEffect } from "react";

const useTimeoutBoolean = (value: boolean, duration = 300) => {
  const [show, { setTrue, setFalse }] = useBoolean(value);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!value) {
      timer = setTimeout(() => {
        setFalse();
      }, duration);
    } else {
      setTrue();
    }
    return () => clearTimeout(timer);
  }, [value]);

  return { show };
};

export default useTimeoutBoolean;
