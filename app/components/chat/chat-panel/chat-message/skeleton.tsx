import FadeOutSkeleton, {
  SkeletonProps,
} from "@/app/components/base/fade-out-skeleton";
import { Skeleton } from "@douyinfe/semi-ui";

const ChatMessageSkeleton = ({ ...props }: SkeletonProps) => {
  const placeholder = (
    <div className="px-5">
      <div className="flex gap-2 items-center mt-6">
        <Skeleton.Avatar size="small" />
        <Skeleton.Title className="w-2/3 h-8" />
      </div>
      <div className="flex gap-2 items-center justify-end mt-6">
        <Skeleton.Title className="w-2/3 h-8" />
        <Skeleton.Avatar size="small" />
      </div>
    </div>
  );

  return <FadeOutSkeleton {...props} placeholder={placeholder} />;
};

export default ChatMessageSkeleton;
