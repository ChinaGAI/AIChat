import { ModalImageCaptchaInput } from "@/app/components/form/image-captcha-input";
import { useGlobalStore } from "@/stores";
import { useEffect, useState } from "react";

const useCaptcha = ({
  onSuccess,
}: {
  onSuccess: (data?: any) => Promise<void>;
}) => {
  const {
    config: { captcha_enable, captcha_type, captcha_config_id },
  } = useGlobalStore();
  const [geetest, setGeetest] = useState<Geetest>();

  const initGeetest = () => {
    // 动态加载极验的SDK
    const script = document.createElement("script");
    script.src = "https://static.geetest.com/v4/gt4.js"; // 极验的SDK URL
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // 初始化极验
      window.initGeetest4(
        {
          captchaId: captcha_config_id,
          product: "bind",
          riskType: "ai",
          language: "zho",
        },
        (geetest) => {
          setGeetest(geetest);
          geetest.onSuccess(() => {
            const result = geetest.getValidate();
            onSuccess(result);
          });
        }
      );
    };
  };

  useEffect(() => {
    if (captcha_enable && captcha_type === "geetest") {
      initGeetest();
    }
  }, []);

  const validate = async () => {
    if (!captcha_enable) return onSuccess();
    if (captcha_type === "geetest" && geetest) {
      geetest.showCaptcha();
    } else {
      ModalImageCaptchaInput({
        onSuccess,
      });
    }
  };

  return {
    validate,
  };
};

export default useCaptcha;
