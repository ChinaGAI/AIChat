import { postUploadImage } from "@/servers/api/global";
import { IconUpload } from "@douyinfe/semi-icons";
import { Avatar, Toast, Upload, withField } from "@douyinfe/semi-ui";
import { AvatarProps } from "@douyinfe/semi-ui/lib/es/avatar";
import { customRequestArgs } from "@douyinfe/semi-ui/lib/es/upload";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  avatarProps?: React.ComponentProps<typeof Avatar>;
} & Omit<React.ComponentProps<typeof Upload>, "action">;

const ImageUpload = withField(
  ({ value, onChange, avatarProps, ...props }: Props) => {
    const customRequest = async (options: customRequestArgs) => {
      const { onSuccess, onError, fileInstance, file } = options;
      try {
        const { url } = await postUploadImage({ file: fileInstance });
        onChange?.(url);
      } catch (error: any) {
        Toast.error(error.message || "上传失败");
      }
    };

    return (
      <Upload
        {...props}
        action="/upload/image"
        accept="image/*"
        showUploadList={false}
        customRequest={customRequest}
      >
        <Avatar
          size="large"
          src={value}
          shape="square"
          hoverMask={
            <div className="bg-gray-900/30 flex items-center justify-center w-full h-full">
              <IconUpload size="large" />
            </div>
          }
          {...avatarProps}
        />
      </Upload>
    );
  }
);

export default ImageUpload;
