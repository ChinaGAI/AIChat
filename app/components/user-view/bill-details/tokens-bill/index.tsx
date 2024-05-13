import { getBillToken, getBillTokenDesc } from "@/servers/api/bill";
import { Radio, RadioGroup, Table } from "@douyinfe/semi-ui";
import { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";
import { usePagination, useRequest } from "ahooks";
import numeral from "numeral";
import { useState } from "react";

type BillToken = Unpack<ReturnType<typeof getBillToken>>["list"][0];

const TokensBill = () => {
  const [type, setType] = useState("all");

  const { data: types = [] } = useRequest(getBillTokenDesc);

  const { data, loading, pagination } = usePagination(
    (params) =>
      getBillToken({
        page: params.current,
        page_size: params.pageSize,
        desc: type === "all" ? "" : type,
      }),
    {
      refreshDeps: [type],
    }
  );
  const { current, pageSize, onChange } = pagination;

  const columns: ColumnProps<BillToken>[] = [
    {
      title: "时间",
      dataIndex: "created_at",
      key: "time",
    },
    {
      title: "类型",
      dataIndex: "desc",
      key: "type",
    },
    {
      title: "算力",
      dataIndex: "amount",
      key: "amount",
      render: (text, { type }) =>
        ` ${type === "add" ? "+" : "-"}${numeral(text).format("0,0")}`,
    },
    {
      title: "余额",
      dataIndex: "balance",
      key: "balance",
      render: (text) => numeral(text).format("0,0"),
    },
  ];

  return (
    <>
      <RadioGroup
        type="pureCard"
        className="my-2"
        value={type}
        onChange={(event) => setType(event.target.value)}
        aria-label="单选组合示例"
        style={{ gap: "2px" }}
      >
        <Radio
          value={"all"}
          className="px-2 py-0 h-7"
          addonClassName="h-7 !text-xs"
        >
          全部
        </Radio>
        {types.map((item, index) => (
          <Radio
            key={index}
            value={item}
            className="px-2 py-0 h-7"
            addonClassName="h-7 !text-xs"
          >
            {item}
          </Radio>
        ))}
      </RadioGroup>
      <Table
        className="mt-4"
        loading={loading}
        dataSource={data?.list ?? []}
        columns={columns}
        pagination={{
          total: data?.total,
          showSizeChanger: true,
          pageSize,
          currentPage: current,
          onChange,
        }}
      />
    </>
  );
};

export default TokensBill;
