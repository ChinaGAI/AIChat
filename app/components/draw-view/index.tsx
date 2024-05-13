"use client";

import DrawConfigPanel from "./draw-config-panel";
import DrawHistory from "./draw-history";

const DrawView = () => {
  return (
    <div className="h-[calc(100vh-3.5rem)] w-screen">
      <div className="flex h-full w-full flex-row overflow-hidden">
        <DrawConfigPanel />
        <DrawHistory />
      </div>
    </div>
  );
};

export default DrawView;
