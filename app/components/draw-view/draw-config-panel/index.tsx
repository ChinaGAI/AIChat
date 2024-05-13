import { Button, Card, Collapse, Divider, Form } from "@douyinfe/semi-ui";
import ModelSelect from "./model-select";
import FormFiled from "./form-field";
import { IconMoon } from "@douyinfe/semi-icons";

const DrawConfigPanel = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <Form
      onSubmit={onSubmit}
      className="hidden w-96 flex-col border-r border-border bg-gray-100 md:flex h-full p-3"
    >
      <FormFiled icon={<IconMoon />} label="模型" tooltip="asd">
        <ModelSelect noLabel field="model" />
      </FormFiled>
      <FormFiled icon={<IconMoon />} label="控制网" tooltip="asd">
        <ModelSelect noLabel field="model" />
      </FormFiled>
      <FormFiled icon={<IconMoon />} label="样式" tooltip="asd">
        <ModelSelect noLabel field="model" />
      </FormFiled>
      <FormFiled noStyle icon={<IconMoon />} label="提示语" tooltip="asd">
        <Form.TextArea noLabel field="prompt" placeholder="奇思妙想" />
      </FormFiled>
      <FormFiled noStyle icon={<IconMoon />} label="负面提示语" tooltip="asd">
        <Form.TextArea
          noLabel
          field="prompt"
          placeholder="你不希望出现的内容"
        />
      </FormFiled>
      <FormFiled icon={<IconMoon />} label="图片尺寸" tooltip="asd"></FormFiled>
      <Collapse>
        <Collapse.Panel
          header="高级设置"
          itemKey="1"
          className="-mx-4 border-none "
        >
          <FormFiled icon={<IconMoon />} label="采样方法" tooltip="asd" noStyle>
            <Form.Select noLabel field="sampler" />
          </FormFiled>
          <FormFiled icon={<IconMoon />} label="迭代步数" tooltip="asd" noStyle>
            <Form.InputNumber noLabel field="steps" />
          </FormFiled>
          <FormFiled
            icon={<IconMoon />}
            label="相关性（SFG Scale）"
            tooltip="asd"
            noStyle
          >
            <Form.InputNumber noLabel field="sampler" />
          </FormFiled>
          <FormFiled icon={<IconMoon />} label="随机种子" tooltip="asd" noStyle>
            <Form.InputNumber noLabel field="sampler" />
          </FormFiled>
        </Collapse.Panel>
      </Collapse>
      <Button
        htmlType="submit"
        type="primary"
        theme="solid"
        size="large"
        className="w-full my-5"
      >
        生成
      </Button>
    </Form>
  );
};

export default DrawConfigPanel;
