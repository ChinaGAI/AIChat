import FadeOutSkeleton, {
  SkeletonProps,
} from "@/app/components/base/fade-out-skeleton";
import { Card, Divider, Skeleton, Space } from "@douyinfe/semi-ui";

const UserAssistantSkeleton = ({ ...props }: SkeletonProps) => {
  const placeholder = (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Card
          key={index}
          className="h-[284px] rounded-lg min-w-52 shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out cursor-pointer "
          bodyStyle={{ padding: "12px" }}
          bordered={false}
          footerLine
          footerStyle={{
            padding: "8px 12px",
          }}
          footer={
            <Space className="justify-center flex h-8">
              <Skeleton.Paragraph rows={1} className="w-full" />
              <Divider layout="vertical" />
              <Skeleton.Paragraph rows={1} className="w-full" />
              <Divider layout="vertical" />
              <Skeleton.Paragraph rows={1} className="w-full" />
            </Space>
          }
        >
          <Skeleton.Avatar
            size="extra-large"
            shape="square"
            className="mx-auto block mb-2"
          />
          <Skeleton.Title className="w-20 mb-2" />
          <Skeleton.Paragraph rows={2} className="h-10" />
        </Card>
      ))}
    </>
  );
  return (
    <FadeOutSkeleton
      {...props}
      wrapperClassName="overflow-hidden min-h-[284px]"
      placeholder={placeholder}
    />
  );
};

export default UserAssistantSkeleton;
