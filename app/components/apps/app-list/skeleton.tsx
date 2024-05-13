import FadeOutSkeleton, {
  SkeletonProps,
} from "@/app/components/base/fade-out-skeleton";
import { Card, Skeleton } from "@douyinfe/semi-ui";

const AppsSkeleton = ({ ...props }: SkeletonProps) => {
  const placeholder = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
      {Array.from({ length: 12 }).map((_, index) => (
        <Card bodyStyle={{ padding: "12px" }} key={index}>
          <div className="flex">
            <Skeleton.Avatar size="large" shape="square" />
            <div className="w-[calc(100%-72px)] pl-4">
              <Skeleton.Paragraph rows={1} className="w-20 mb-2" />
              <Skeleton.Paragraph rows={2} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
  return <FadeOutSkeleton {...props} placeholder={placeholder} />;
};

export default AppsSkeleton;
