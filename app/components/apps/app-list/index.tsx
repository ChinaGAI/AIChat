"use client";
import Assistant from "./assistant";

const AppList = ({ apps }: { apps?: API.ChatAssistant[] }) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
      {apps?.map((assistant) => (
        <Assistant key={assistant.id} assistant={assistant} />
      ))}
    </div>
  );
};

export default AppList;
