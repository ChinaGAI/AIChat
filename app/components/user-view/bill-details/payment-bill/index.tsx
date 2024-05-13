import { getBillOrder, getBillToken } from "@/servers/api/bill";
import { Table } from "@douyinfe/semi-ui";
import { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";
import { usePagination, useRequest } from "ahooks";
import numeral from "numeral";
import { PaymentType } from "../../user-bill/plans-modal";

type BillOrder = Unpack<ReturnType<typeof getBillOrder>>["list"][0];

const PaymentBill = () => {
  const { data, loading, pagination } = usePagination((params) =>
    getBillOrder({
      page: params.current,
      page_size: params.pageSize,
    })
  );
  const { current, pageSize, onChange } = pagination;

  const columns: ColumnProps<BillOrder>[] = [
    {
      title: "订单号",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "时间",
      dataIndex: "created_at",
      key: "time",
    },
    {
      title: "算力",
      dataIndex: "token",
      key: "token",
      render: (text) => numeral(text).format("0,0ac"),
    },
    {
      title: "金额",
      dataIndex: "total_amount",
      key: "total_amount",
    },
    {
      title: "支付方式",
      dataIndex: "pay_type",
      key: "pay_type",
      render: (pay_type: PaymentType) =>
        ({
          Alipay: "支付宝",
          Wechat: "微信",
        }[pay_type]),
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: string) =>
        ({
          Pending: "未完成",
          Success: "已完成",
        }[status]),
    },
  ];

  return (
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
  );
};

export default PaymentBill;
