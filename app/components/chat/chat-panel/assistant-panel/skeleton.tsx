import FadeOutSkeleton, {
  SkeletonProps,
} from "@/app/components/base/fade-out-skeleton";
import { Skeleton } from "@douyinfe/semi-ui";

const RolePanelSkeleton = ({ ...props }: SkeletonProps) => {
  const placeholder = (
    <>
      <Skeleton.Avatar size="large" />
      <Skeleton.Paragraph rows={1} className="mt-5 w-32 mb-2" />
      <Skeleton.Paragraph rows={1} className="w-64" />
    </>
  );
  return <FadeOutSkeleton {...props} placeholder={placeholder} />;
};

export default RolePanelSkeleton;
