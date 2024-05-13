import { withField } from "@douyinfe/semi-ui";

const ModelSelect = ({ value, onChange }: { value?: any; onChange?: any }) => {
  return <div onClick={() => onChange("aaa")}>asd</div>;
};

export default withField(ModelSelect);
