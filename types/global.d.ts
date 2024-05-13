type Unpack<T> = T extends Promise<infer U> ? U : T;

declare module "*.svg" {
  import React from "react";
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

type Geetest = {
  getValidate: () => Record<string, string>;
  showCaptcha: () => void;
  reset: () => void;
  onReady: (callback: () => void) => void;
  onFail: (callback: () => void) => void;
  onSuccess: (callback: () => void) => void;
  onError: (callback: () => void) => void;
  destroy: () => void;
};
declare interface Window {
  initGeetest4: (config: any, callback: (geetest: Geetest) => void) => void;
}
