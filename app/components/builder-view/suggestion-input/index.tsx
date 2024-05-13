import { jsonParse } from "@/utils/libs";
import { Input, withField } from "@douyinfe/semi-ui";
import { useControllableValue } from "ahooks";
import { produce } from "immer";
import { useState } from "react";

const SuggestionInput = withField(({ value, onChange }) => {
  const [arr, setArr] = useState(jsonParse(value, []));

  const onInputChange = (str: string, index: number) => {
    const next = produce(arr, (draft: string[]) => {
      draft[index] = str;
    });
    setArr(next);
    onChange(JSON.stringify(next));
  };

  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <Input
          key={index}
          size="large"
          className="mt-2"
          placeholder={`选项 ${index + 1}`}
          showClear
          value={arr[index]}
          onChange={(e) => onInputChange(e, index)}
        />
      ))}
    </>
  );
});

export default SuggestionInput;
